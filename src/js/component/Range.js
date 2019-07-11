import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LOCALE from './locale.js';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from './const';
import { cx, isValidDate } from './utils.js';
import CSS from './react-minimal-datetime-range.css';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();

const ITEM_HEIGHT = 40;

let isStart = true;

const Index = memo(
  ({
    selected,
    setSelected,
    locale = 'en-us',
    defaultDateStart = '',
    defaultDateEnd = '',
    rangeDirection = 'start',
    startDatePickedArray = [], // [YY, MM. DD]
    endDatePickedArray = [], // [YY, MM. DD]
    handleChooseStartDate = () => {},
    handleChooseEndDate = () => {},
  }) => {
    let defaultDateDateStart = DATE;
    let defaultDateMonthStart = MONTH;
    let defaultDateYearStart = YEAR;
    let defaultDatesStart = getDaysArray(defaultDateYearStart, defaultDateMonthStart);

    let defaultDateDateEnd = defaultDateDateStart;
    let defaultDateMonthEnd;
    let defaultDateYearEnd = defaultDateYearStart;

    if (defaultDateMonthStart === 12) {
      defaultDateMonthEnd = 1;
      defaultDateYearEnd = defaultDateYearStart + 1;
    } else {
      defaultDateMonthEnd = defaultDateMonthStart + 1;
    }
    let defaultDatesEnd = getDaysArray(defaultDateYearEnd, defaultDateMonthEnd);

    const isDefaultDateValidStart = useMemo(() => isValidDate(defaultDateStart), [defaultDateStart]);
    if (isDefaultDateValidStart) {
      const dateStr = defaultDateStart.split('/');
      defaultDateMonthStart = Number(dateStr[0]);
      defaultDateDateStart = Number(dateStr[1]);
      defaultDateYearStart = Number(dateStr[2]);
      defaultDatesStart = getDaysArray(defaultDateYearStart, defaultDateMonthStart);
    }
    const isDefaultDateValidEnd = useMemo(() => isValidDate(defaultDateEnd), [defaultDateEnd]);
    if (isDefaultDateValidEnd) {
      const dateStr = defaultDateEnd.split('/');
      defaultDateMonthEnd = Number(dateStr[0]);
      defaultDateDateEnd = Number(dateStr[1]);
      defaultDateYearEnd = Number(dateStr[2]);
      defaultDatesEnd = getDaysArray(defaultDateYearEnd, defaultDateMonthEnd);
    }

    let defaultDateMonth;
    let defaultDateDate;
    let defaultDateYear;
    let defaultDates;
    let defaultYearStr;
    let defaultMonthStr;
    let defaultDateStr;

    if (rangeDirection === 'start') {
      defaultDateMonth = defaultDateMonthStart;
      defaultDateDate = defaultDateDateStart;
      defaultDateYear = defaultDateYearStart;
      defaultDates = defaultDatesStart;
      defaultYearStr = formatDateString(defaultDateYearStart);
      defaultMonthStr = formatDateString(defaultDateMonthStart);
      defaultDateStr = formatDateString(defaultDateDateStart);
    } else {
      defaultDateMonth = defaultDateMonthEnd;
      defaultDateDate = defaultDateDateEnd;
      defaultDateYear = defaultDateYearEnd;
      defaultDates = defaultDatesEnd;
      defaultYearStr = formatDateString(defaultDateYearEnd);
      defaultMonthStr = formatDateString(defaultDateMonthEnd);
      defaultDateStr = formatDateString(defaultDateDateEnd);
    }

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
      content = (
        <CalendarBody
          selected={selected}
          setSelected={setSelected}
          startDatePickedArray={startDatePickedArray}
          endDatePickedArray={endDatePickedArray}
          handleChooseStartDate={handleChooseStartDate}
          handleChooseEndDate={handleChooseEndDate}
          rangeDirection={rangeDirection}
          data={rowObj}
          pickedYearMonth={pickedYearMonth}
          pickedDateInfo={pickedDateInfo}
          onClick={pickDate}
          key={pickedYearMonth.string}
        />
      );
      transitionContainerStyle = {
        height: `${row * ITEM_HEIGHT}px`,
      };
    }
    const captionHtml = LOCALE[locale].weeks.map((item, key) => {
      return (
        <div className={`react-minimal-datetime-range-calendar__table-caption react-minimal-datetime-range-calendar__table-cel no-border`} key={key}>
          {item}
        </div>
      );
    });
    let selectorPanelClass = cx('react-minimal-datetime-range-dropdown', 'react-minimal-datetime-range-calendar__selector-panel', showSelectorPanel && 'visible');
    let selectorPanelMonthHtml = LOCALE[locale].months.map((item, key) => {
      let itemMonth = key + 1;
      let monthItemClass = cx('react-minimal-datetime-range-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
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
        let yearItemClass = cx('react-minimal-datetime-range-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
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
      <div className={cx('react-minimal-datetime-range-calendar', 'react-minimal-datetime-range-calendar--range')}>
        <div className={`react-minimal-datetime-range-calendar__header`}>
          <div className={selectorPanelClass} ref={$monthSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onMouseDown} onTouchCancel={onMouseUp}>
            <div className={`react-minimal-datetime-range-dropdown-calendar__menu`}>
              <div className={`react-minimal-datetime-range-dropdown-calendar__month`}>{selectorPanelMonthHtml}</div>
              <div style={{ height: '10px' }} />
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-0-5`}>
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
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-9`}>
                <ReactCSSTransitionGroup
                  className="react-minimal-datetime-range-calendar__selector-panel-year-set-container"
                  transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  <div className={`react-minimal-datetime-range-dropdown-calendar__year`} key={yearSelectorPanelList}>
                    {selectorPanelYearHtml}
                  </div>
                </ReactCSSTransitionGroup>
              </div>
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-0-5`}>
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
          <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-3`}>
            <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__previous`} onClick={() => pickYear(pickedYearMonth.year, PREV_TRANSITION)}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
                <path fill="none" d="M24 24H0V0h24v24z" />
              </svg>
            </div>
            <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-previous`} onClick={() => pickMonth(pickedYearMonth.month, PREV_TRANSITION)}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
          </div>
          <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-6`}>
            <ReactCSSTransitionGroup
              className="react-minimal-datetime-range-calendar__title-container"
              transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <div className={`react-minimal-datetime-range-calendar__title`} key={pickedYearMonth.string}>
                <span className={`react-minimal-datetime-range-calendar__clicker`} onClick={handleShowSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                  <span className={`react-minimal-datetime-range-calendar__clicker`}>
                    <span>{`${LOCALE[locale].months[pickedYearMonth.month - 1]}`}</span>
                  </span>
                  <span>&nbsp;</span>
                  <span className={`react-minimal-datetime-range-calendar__clicker`}>
                    <span>{`${pickedYearMonth.year}`}</span>
                  </span>
                </span>
              </div>
            </ReactCSSTransitionGroup>
          </div>
          <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-3`}>
            <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__next`} onClick={() => pickMonth(pickedYearMonth.month, NEXT_TRANSITION)}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
            <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-next`} onClick={() => pickYear(pickedYearMonth.year, NEXT_TRANSITION)}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`react-minimal-datetime-range-calendar__content`}>
          <div className={`react-minimal-datetime-range-calendar__table`}>
            <div className={`react-minimal-datetime-range-calendar__table-row`}>{captionHtml}</div>
          </div>
          <ReactCSSTransitionGroup
            className={`react-minimal-datetime-range-calendar__body-container`}
            transitionName={direction === NEXT_TRANSITION ? 'forward' : 'backward'}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={transitionContainerStyle}
          >
            {content}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  },
);

const CalendarBody = memo(
  ({
    selected,
    setSelected,
    startDatePickedArray,
    endDatePickedArray,
    handleChooseStartDate,
    handleChooseEndDate,
    rangeDirection,
    data = {},
    pickedDateInfo = {},
    pickedYearMonth = {},
    onClick = () => {},
  }) => {
    const content = Object.keys(data).map(key => {
      let colHtml;
      if (data[key].length) {
        colHtml = data[key].map((item, key) => {
          const itemDate = new Date(`${item.year}/${item.month}/${item.name}`);
          let isDisabled = pickedYearMonth.month !== item.month;
          let isPickedStart = false;
          let isPickedEnd = false;
          let isHighlight = false;
          if (isDisabled === false) {
            let starts = startDatePickedArray;
            let ends = endDatePickedArray;
            if (startDatePickedArray.length && endDatePickedArray.length) {
              const a = new Date(startDatePickedArray.join('/'));
              const b = new Date(endDatePickedArray.join('/'));
              starts = a < b ? startDatePickedArray : endDatePickedArray;
              ends = a > b ? startDatePickedArray : endDatePickedArray;
            }
            if (starts.length) {
              isPickedStart = starts[0] === item.year && starts[1] === item.month && starts[2] === item.name;
              const targetDate = new Date(starts.join('/'));
              if (!ends.length) {
                if (itemDate > targetDate) {
                  isHighlight = true;
                }
              } else {
                if (itemDate > targetDate && itemDate < new Date(ends.join('/'))) {
                  isHighlight = true;
                }
              }
            }

            if (ends.length) {
              isPickedEnd = ends[0] === item.year && ends[1] === item.month && ends[2] === item.name;
            }
          }

          const datePickerItemClass = cx(
            'react-minimal-datetime-range-calendar__table-cel',
            'react-minimal-datetime-range-calendar__date-item',
            isDisabled && 'disabled',
            isPickedStart && 'active',
            isPickedEnd && 'active',
            isHighlight && 'highlight',
          );
          return (
            <CalendarItem
              key={key}
              selected={selected}
              setSelected={setSelected}
              startDatePickedArray={startDatePickedArray}
              endDatePickedArray={endDatePickedArray}
              handleChooseStartDate={handleChooseStartDate}
              handleChooseEndDate={handleChooseEndDate}
              item={item}
              onClick={onClick}
              datePickerItemClass={datePickerItemClass}
            />
          );
        });
      }
      return (
        <div className={`react-minimal-datetime-range-calendar__table-row`} key={key}>
          {colHtml}
        </div>
      );
    });
    return <div className={`react-minimal-datetime-range-calendar__table slide`}>{content}</div>;
  },
);

const CalendarItem = memo(
  ({ selected, setSelected, startDatePickedArray, endDatePickedArray, handleChooseStartDate, handleChooseEndDate, item = {},  datePickerItemClass = '', onClick = () => {} }) => {
    const handleOnClick = useCallback(
      () => {
        if (startDatePickedArray.length) {
          setSelected(true);
          handleChooseEndDate(item);
        } else {
          handleChooseStartDate(item);
        }
        if (selected) {
          handleChooseEndDate({ year: '', month: '', name: '', value: '' });
          handleChooseStartDate(item);
          setSelected(false);
        }
      },
      [item, selected, startDatePickedArray],
    );
    const handleOnMouseOver = useCallback(
      () => {
        if (!selected) {
          handleChooseEndDate(item);
        }
      },
      [item, selected],
    );
    return (
      <div className={`${datePickerItemClass}`} onMouseOver={handleOnMouseOver} onClick={handleOnClick}>
        {item.name}
      </div>
    );
  },
);

export default Index;
