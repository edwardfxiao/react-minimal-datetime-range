import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LOCALE from './locale.js';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from './const';
import { cx, isValidDate } from './utils.js';
import CSS from './react-minimal-datetime-range.css';
if (!('classList' in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get: function() {
      var self = this;

      function update(fn) {
        return function(value) {
          var classes = self.className.split(/\s+/g);
          var index = classes.indexOf(value);
          fn(classes, index, value);
          self.className = classes.join(' ');
        };
      }
      return {
        add: update(function(classes, index, value) {
          if (!~index) classes.push(value);
        }),
        remove: update(function(classes, index) {
          if (~index) classes.splice(index, 1);
        }),
        toggle: update(function(classes, index, value) {
          if (~index) {
            classes.splice(index, 1);
          } else {
            classes.push(value);
          }
        }),
        contains: function(value) {
          return !!~self.className.split(/\s+/g).indexOf(value);
        },
        item: function(i) {
          return self.className.split(/\s+/g)[i] || null;
        },
      };
    },
  });
}

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();

const Index = memo(({ locale = 'en-us', defaultDate = '', onYearPicked = () => {}, onMonthPicked = () => {}, onDatePicked = () => {}, onResetDate = () => {}, onResetDefaultDate = () => {} }) => {
  let defaultDateDate = DATE;
  let defaultDateMonth = MONTH;
  let defaultDateYear = YEAR;
  let defaultDates = getDaysArray(YEAR, MONTH);
  const isDefaultDateValid = useMemo(() => isValidDate(defaultDate), [defaultDate]);
  if (isDefaultDateValid) {
    const dateStr = defaultDate.split('/');
    defaultDateMonth = Number(dateStr[0]);
    defaultDateDate = Number(dateStr[1]);
    defaultDateYear = Number(dateStr[2]);
    defaultDates = getDaysArray(defaultDateYear, defaultDateMonth);
  }
  const defaultYearStr = String(defaultDateYear);
  const defaultMonthStr = formatDateString(defaultDateMonth);
  const defaultDateStr = formatDateString(defaultDateDate);
  const [dates, setDates] = useState(defaultDates);
  const [pickedYearMonth, setPickedYearMonth] = useState({
    year: defaultYearStr,
    month: defaultMonthStr,
    string: `${defaultYearStr}-${defaultMonthStr}`,
  });
  const [defaultDateObj, setDefaultDateObj] = useState({
    year: defaultYearStr,
    month: defaultMonthStr,
    date: defaultDateStr,
  });
  const [pickedDateInfo, setPickedDateInfo] = useState({
    year: defaultYearStr,
    month: defaultMonthStr,
    date: defaultDateStr,
  });
  const [direction, setDirection] = useState(NEXT_TRANSITION);
  const [yearSelectorPanelList, setYearSelectorPanelList] = useState(getYearSet(defaultDateYear));
  const [yearSelectorPanel, setYearSelectorPanel] = useState(defaultDateYear);
  const [showMask, setShowMask] = useState(false);
  const [showSelectorPanel, setShowSelectorPanel] = useState(false);
  const $monthSelectorPanel = useRef(null);
  const onMouseDown = useCallback(() => {}, []);
  const onMouseUp = useCallback(() => {}, []);
  useEffect(
    () => {
      setDates(getDaysArray(Number(pickedYearMonth.year), Number(pickedYearMonth.month)));
    },
    [pickedYearMonth],
  );
  // useEffect(
  //   () => {
  //     console.log(pickedDateInfo);
  //   },
  //   [pickedDateInfo],
  // );
  const pickYear = useCallback(
    (year, direction) => {
      year = Number(year);
      if (direction === PREV_TRANSITION) {
        year = year - 1;
      } else {
        year = year + 1;
      }
      setPickedYearMonth({ ...pickedYearMonth, year, string: `${year}-${pickedYearMonth.month}` });
      setDirection(direction);
      onYearPicked({ year });
    },
    [pickedYearMonth],
  );
  const pickMonth = useCallback(
    (month, direction) => {
      month = Number(month);
      let year = Number(pickedYearMonth.year);
      if (direction === PREV_TRANSITION) {
        if (month === 1) {
          month = 12;
          year = year - 1;
        } else {
          month = month - 1;
        }
      } else {
        if (month === 12) {
          month = 1;
          year = year + 1;
        } else {
          month = month + 1;
        }
      }
      const yearStr = String(year);
      const monthStr = formatDateString(month);
      setPickedYearMonth({ ...pickedYearMonth, year: yearStr, month: monthStr, string: `${yearStr}-${monthStr}` });
      setDirection(direction);
      onMonthPicked({ year: yearStr, month: monthStr });
    },
    [pickedYearMonth],
  );
  const pickDate = useCallback(
    pickedDate => {
      setPickedDateInfo({
        ...pickedDateInfo,
        year: pickedYearMonth.year,
        month: pickedYearMonth.month,
        date: formatDateString(pickedDate),
      });
      onDatePicked(pickedDateInfo);
    },
    [pickedYearMonth, pickedDateInfo],
  );
  const reset = useCallback(
    (today = false) => {
      let year = YEAR;
      let month = MONTH;
      let date = DATE;
      if (!today) {
        const dateStr = defaultDate.split('/');
        month = Number(dateStr[0]);
        date = Number(dateStr[1]);
        year = Number(dateStr[2]);
      }
      let direction = NEXT_TRANSITION;
      if (year < Number(pickedYearMonth.year)) {
        direction = PREV_TRANSITION;
      } else if (year === Number(pickedYearMonth.year)) {
        if (month < Number(pickedYearMonth.month)) {
          direction = PREV_TRANSITION;
        }
      }
      const yearStr = formatDateString(year);
      const monthStr = formatDateString(month);
      const dateStr = formatDateString(date);
      setPickedDateInfo({
        ...pickedDateInfo,
        year: yearStr,
        month: monthStr,
        date: dateStr,
      });
      setPickedYearMonth({
        ...pickedYearMonth,
        year: yearStr,
        month: monthStr,
        string: `${yearStr}-${monthStr}`,
      });
      changeSelectorPanelYearSet(year, direction);
      if (!today) {
        onResetDefaultDate(pickedDateInfo);
      } else {
        onResetDate(pickedDateInfo);
      }
    },
    [pickedYearMonth],
  );
  const changeSelectorPanelYearSet = useCallback((yearSelectorPanel, direction) => {
    console.log(direction);
    setDirection(direction);
    setYearSelectorPanel(yearSelectorPanel);
    setYearSelectorPanelList(getYearSet(yearSelectorPanel));
  }, []);
  const handleShowSelectorPanel = useCallback(
    () => {
      setShowSelectorPanel(!showSelectorPanel);
      setShowMask(!showMask);
    },
    [showSelectorPanel, showMask],
  );
  let transitionContainerStyle;
  let content;
  if (dates.length) {
    let row = dates.length / WEEK_NUMBER;
    let rowIndex = 1;
    let rowObj = {};
    dates.map((item, key) => {
      if (key < rowIndex * WEEK_NUMBER) {
        if (!rowObj[rowIndex]) {
          rowObj[rowIndex] = [];
        }
        rowObj[rowIndex].push(item);
      } else {
        rowIndex = rowIndex + 1;
        if (!rowObj[rowIndex]) {
          rowObj[rowIndex] = [];
        }
        rowObj[rowIndex].push(item);
      }
    });
    content = <CalendarBody data={rowObj} pickedYearMonth={pickedYearMonth} pickedDateInfo={pickedDateInfo} onClick={pickDate} key={pickedYearMonth.string} />;
    if (row == 6) {
      const height = 385;
      transitionContainerStyle = {
        // height: `${height}px`,
      };
    }
  }
  const captionHtml = LOCALE[locale].weeks.map((item, key) => {
    return (
      <div className={`picky-date-time-calendar__table-caption picky-date-time-calendar__table-cel no-border`} key={key}>
        {item}
      </div>
    );
  });
  let selectorPanelClass = cx('picky-date-time-dropdown', 'picky-date-time-calendar__selector-panel', showSelectorPanel && 'visible');
  let selectorPanelMonthHtml = LOCALE[locale].months.map((item, key) => {
    let itemMonth = key + 1;
    let monthItemClass = cx('picky-date-time-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
    let month = itemMonth - 1;
    let direction = NEXT_TRANSITION;
    if (itemMonth < pickedYearMonth.month) {
      direction = PREV_TRANSITION;
      month = itemMonth + 1;
    }
    return (
      <div
        className={monthItemClass}
        onClick={
          itemMonth !== pickedYearMonth.month
            ? () => pickMonth(month, direction)
            : () => {
                return;
              }
        }
        key={key}
      >
        <div>{item}</div>
      </div>
    );
  });
  let selectorPanelYearHtml;
  if (yearSelectorPanelList.length) {
    selectorPanelYearHtml = yearSelectorPanelList.map((item, key) => {
      let yearItemClass = cx('picky-date-time-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
      let year = item - 1;
      let direction = NEXT_TRANSITION;
      if (item < pickedYearMonth.year) {
        direction = PREV_TRANSITION;
        year = item + 1;
      }
      return (
        <div
          className={yearItemClass}
          onClick={
            item !== pickedYearMonth.year
              ? () => pickYear(year, direction)
              : () => {
                  return;
                }
          }
          key={key}
        >
          <span style={{ verticalAlign: 'middle' }}>{item}</span>
        </div>
      );
    });
  }
  return (
    <div className={`picky-date-time-calendar`}>
      <div className={`picky-date-time-calendar__header`}>
        <div className={selectorPanelClass} ref={$monthSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onMouseDown} onTouchCancel={onMouseUp}>
          <div className={`picky-date-time-dropdown-calendar__menu`}>
            <div className={`picky-date-time-dropdown-calendar__month`}>{selectorPanelMonthHtml}</div>
            <div style={{ height: '10px' }} />
            <div className={`picky-date-time__col picky-date-time__col-0-5`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                style={{ verticalAlign: 'middle' }}
                onClick={() => changeSelectorPanelYearSet(yearSelectorPanel - SELECTOR_YEAR_SET_NUMBER, PREV_TRANSITION)}
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
            <div className={`picky-date-time__col picky-date-time__col-9`}>
              <ReactCSSTransitionGroup
                className="picky-date-time-calendar__selector-panel-year-set-container"
                transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
                transitionAppearTimeout={500}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <div className={`picky-date-time-dropdown-calendar__year`} key={yearSelectorPanelList}>
                  {selectorPanelYearHtml}
                </div>
              </ReactCSSTransitionGroup>
            </div>
            <div className={`picky-date-time__col picky-date-time__col-0-5`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                style={{ verticalAlign: 'middle' }}
                onClick={() => changeSelectorPanelYearSet(yearSelectorPanel + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`picky-date-time__col picky-date-time__col-3`}>
          <div className={`picky-date-time__col picky-date-time-calendar__previous`} onClick={() => pickYear(pickedYearMonth.year, PREV_TRANSITION)}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
              <path fill="none" d="M24 24H0V0h24v24z" />
            </svg>
          </div>
          <div className={`picky-date-time__col picky-date-time-calendar__sub-previous`} onClick={() => pickMonth(pickedYearMonth.month, PREV_TRANSITION)}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        </div>
        <div className={`picky-date-time__col picky-date-time__col-6`}>
          <ReactCSSTransitionGroup
            className="picky-date-time-calendar__title-container"
            transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <div className={`picky-date-time-calendar__title`} key={pickedYearMonth.string}>
              <span className={`picky-date-time-calendar__clicker`} onClick={handleShowSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <span className={`picky-date-time-calendar__clicker`}>
                  <span>{`${LOCALE[locale].months[pickedYearMonth.month - 1]}`}</span>
                </span>
                <span>&nbsp;</span>
                <span className={`picky-date-time-calendar__clicker`}>
                  <span>{`${pickedYearMonth.year}`}</span>
                </span>
              </span>
            </div>
          </ReactCSSTransitionGroup>
        </div>
        <div className={`picky-date-time__col picky-date-time__col-3`}>
          <div className={`picky-date-time__col picky-date-time-calendar__next`} onClick={() => pickMonth(pickedYearMonth.month, NEXT_TRANSITION)}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
          <div className={`picky-date-time__col picky-date-time-calendar__sub-next`} onClick={() => pickYear(pickedYearMonth.year, NEXT_TRANSITION)}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={`picky-date-time-calendar__content`}>
        <div className={`picky-date-time-calendar__table`}>
          <div className={`picky-date-time-calendar__table-row`}>{captionHtml}</div>
        </div>
        <ReactCSSTransitionGroup
          className={`picky-date-time-calendar__body-container`}
          transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
          transitionAppearTimeout={500}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={transitionContainerStyle}
        >
          {content}
        </ReactCSSTransitionGroup>
      </div>
      <div className={`picky-date-time-calendar__button picky-date-time-calendar__today`} onClick={() => reset(true)}>
        <span className={`picky-date-time-calendar__inline-span`}>{LOCALE[locale]['today']}</span>
        <span className={`picky-date-time-calendar__inline-span picky-date-time-calendar__icon picky-date-time-refresh`} />
      </div>
      {isDefaultDateValid ? (
        <div className={`picky-date-time-calendar__button picky-date-time-calendar__default-day`} onClick={() => reset(false)}>
          <span className={`picky-date-time-calendar__inline-span`}>{LOCALE[locale]['reset-date']}</span>
          <span className={`picky-date-time-calendar__inline-span picky-date-time-calendar__icon picky-date-time-refresh`} />
        </div>
      ) : (
        ``
      )}
    </div>
  );
});

const CalendarBody = memo(({ data = {}, pickedDateInfo = {}, pickedYearMonth = {}, onClick = () => {} }) => {
  const content = Object.keys(data).map(key => {
    let colHtml;
    if (data[key].length) {
      colHtml = data[key].map((item, key) => {
        const isPicked = pickedDateInfo.date === item.name && pickedDateInfo.month === item.month && pickedDateInfo.year === item.year;
        let isDisabled = pickedYearMonth.month !== item.month;
        const datePickerItemClass = cx(
          'picky-date-time-calendar__table-cel',
          'picky-date-time-calendar__date-item',
          isDisabled && 'disabled',
          DATE == item.name && MONTH == item.month && YEAR == item.year && 'today',
          isPicked && 'active',
        );
        return <CalendarItem key={key} item={item} onClick={onClick} isPicked={isPicked} isDisabled={isDisabled} datePickerItemClass={datePickerItemClass} />;
      });
    }
    return (
      <div className={`picky-date-time-calendar__table-row`} key={key}>
        {colHtml}
      </div>
    );
  });
  return <div className={`picky-date-time-calendar__table slide`}>{content}</div>;
});

const CalendarItem = memo(({ item = {}, isPicked = false, isDisabled = false, datePickerItemClass = '', onClick = () => {} }) => {
  const handleOnClick = useCallback(
    () => {
      onClick(item.name);
    },
    [item.name],
  );
  return (
    <div
      className={`${datePickerItemClass}`}
      onClick={
        !isDisabled
          ? handleOnClick
          : () => {
              return;
            }
      }
    >
      {item.name}
      {isPicked && (
        <svg className="picky-date-time-check" width="15" height="15" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path className="picky-date-time-check__path" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
    </div>
  );
});

export default Index;
