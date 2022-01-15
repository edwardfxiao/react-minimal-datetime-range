import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LOCALE from './locale.js';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString, isWith1Month } from './const';
import { cx, isValidDate } from './utils.js';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();

const ITEM_HEIGHT = 40;

const Index = memo(
  ({
    selected,
    setSelected,
    locale = 'en-us',
    defaultDateStart = '',
    defaultDateEnd = '',
    rangeDirection = 'start',
    startDatePickedArray = [], // [YY, MM, DD]
    endDatePickedArray = [], // [YY, MM, DD]
    handleChooseStartDate = () => {},
    handleChooseEndDate = () => {},
    currentDateObjStart = () => {},
    currentDateObjEnd = () => {},
    setCurrentDateObjStart = () => {},
    setCurrentDateObjEnd = () => {},
    markedDates = [],
  }) => {
    const markedDatesHash = useMemo(() => {
      const res = {};
      if (markedDates && markedDates.length) {
        let isValid = true;
        for (let i = 0; i < markedDates.length; i += 1) {
          if (!isValidDate(markedDates[i])) {
            isValid = false;
            break;
          }
        }
        if (isValid) {
          markedDates.forEach(d => {
            res[d] = true;
          });
        }
      }
      return res;
    }, [markedDates]);
    const LOCALE_DATA = useMemo(() => (LOCALE[locale] ? LOCALE[locale] : LOCALE['en-us']), [locale]);
    let defaultDateDateStart = DATE;
    let defaultDateMonthStart = MONTH;
    let defaultDateYearStart = YEAR;

    let defaultDateDateEnd = defaultDateDateStart;
    let defaultDateMonthEnd;
    let defaultDateYearEnd = defaultDateYearStart;

    if (defaultDateMonthStart === 12) {
      defaultDateMonthEnd = 1;
      defaultDateYearEnd = defaultDateYearStart + 1;
    } else {
      defaultDateMonthEnd = defaultDateMonthStart + 1;
    }

    const isDefaultDateValidStart = useMemo(() => isValidDate(defaultDateStart), [defaultDateStart]);
    if (isDefaultDateValidStart) {
      const dateStr = defaultDateStart.split('-');
      defaultDateYearStart = Number(dateStr[0]);
      defaultDateMonthStart = Number(dateStr[1]);
      defaultDateDateStart = Number(dateStr[2]);
    }
    const isDefaultDateValidEnd = useMemo(() => isValidDate(defaultDateEnd), [defaultDateEnd]);
    if (isDefaultDateValidEnd) {
      const dateStr = defaultDateEnd.split('-');
      defaultDateYearEnd = Number(dateStr[0]);
      defaultDateMonthEnd = Number(dateStr[1]);
      defaultDateDateEnd = Number(dateStr[2]);
      // special handle
      if (defaultDateMonthStart === 12) {
        defaultDateMonthEnd = 1;
        defaultDateYearEnd = defaultDateYearStart + 1;
      } else {
        defaultDateMonthEnd = defaultDateMonthStart + 1;
      }
    }

    let showPrevYearArrow = true;
    let showPrevMonthArrow = true;
    let showNextYearArrow = true;
    let showNextMonthArrow = true;

    if (currentDateObjStart.string && currentDateObjEnd.string) {
      if (rangeDirection === 'start') {
        if (isWith1Month(currentDateObjStart.year, currentDateObjEnd.year, currentDateObjStart.month, currentDateObjEnd.month, 'add')) {
          showNextYearArrow = false;
          showNextMonthArrow = false;
        }
      } else {
        if (isWith1Month(currentDateObjEnd.year, currentDateObjStart.year, currentDateObjEnd.month, currentDateObjStart.month, 'minus')) {
          showPrevYearArrow = false;
          showPrevMonthArrow = false;
        }
      }
    }

    const defaultDatesStart = getDaysArray(defaultDateYearStart, defaultDateMonthStart);
    const defaultDatesEnd = getDaysArray(defaultDateYearEnd, defaultDateMonthEnd);

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

    useEffect(() => {
      if (rangeDirection === 'start') {
        setCurrentDateObjStart({ year: defaultDateYear, month: defaultDateMonth, string: `${defaultDateYear}-${defaultDateMonth}` });
      } else {
        setCurrentDateObjEnd({ year: defaultDateYear, month: defaultDateMonth, string: `${defaultDateYear}-${defaultDateMonth}` });
      }
    }, [rangeDirection, defaultDateYear, defaultDateMonth]);

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
    useEffect(() => {
      setDates(getDaysArray(Number(pickedYearMonth.year), Number(pickedYearMonth.month)));
    }, [pickedYearMonth]);
    const pickYear = useCallback(
      (year, direction) => {
        year = Number(year);
        if (direction === PREV_TRANSITION) {
          year = year - 1;
        } else {
          year = year + 1;
        }
        const newData = { ...pickedYearMonth, year, string: `${year}-${pickedYearMonth.month}` };
        setPickedYearMonth(newData);
        if (rangeDirection === 'start') {
          setCurrentDateObjStart(newData);
        } else {
          setCurrentDateObjEnd(newData);
        }
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
        const newData = { ...pickedYearMonth, year: yearStr, month: monthStr, string: `${yearStr}-${monthStr}` };
        setPickedYearMonth(newData);
        if (rangeDirection === 'start') {
          setCurrentDateObjStart(newData);
        } else {
          setCurrentDateObjEnd(newData);
        }
        setDirection(direction);
      },
      [pickedYearMonth],
    );
    const pickDate = useCallback(pickedDate => {}, []);
    const changeSelectorPanelYearSet = useCallback((yearSelectorPanel, direction) => {
      setDirection(direction);
      setYearSelectorPanel(yearSelectorPanel);
      setYearSelectorPanelList(getYearSet(yearSelectorPanel));
    }, []);
    const handleShowSelectorPanel = useCallback(() => {
      setShowSelectorPanel(!showSelectorPanel);
      setShowMask(!showMask);
    }, [showSelectorPanel, showMask]);
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
          markedDatesHash={markedDatesHash}
        />
      );
      transitionContainerStyle = {
        height: `${row * ITEM_HEIGHT}px`,
      };
    }
    const captionHtml = LOCALE_DATA.weeks.map((item, key) => {
      return (
        <div className={`react-minimal-datetime-range-calendar__table-caption react-minimal-datetime-range-calendar__table-cel no-border`} key={key}>
          {item}
        </div>
      );
    });
    let selectorPanelClass = cx('react-minimal-datetime-range-dropdown', 'react-minimal-datetime-range-calendar__selector-panel', showSelectorPanel && 'visible');
    let selectorPanelMonthHtml = LOCALE_DATA.months.map((item, key) => {
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
    const classNames = direction == NEXT_TRANSITION ? 'forward' : 'backward';
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
                <TransitionGroup className="react-minimal-datetime-range-calendar__selector-panel-year-set-container" childFactory={child => React.cloneElement(child, { classNames })}>
                  <CSSTransition key={yearSelectorPanelList} timeout={{ enter: 300, exit: 300 }} className={`react-minimal-datetime-range-dropdown-calendar__year`} classNames={classNames}>
                    <div>{selectorPanelYearHtml}</div>
                  </CSSTransition>
                </TransitionGroup>
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
            {showPrevYearArrow && (
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__previous`} onClick={() => pickYear(pickedYearMonth.year, PREV_TRANSITION)}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
                  <path fill="none" d="M24 24H0V0h24v24z" />
                </svg>
              </div>
            )}
            {showPrevMonthArrow && (
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-previous`} onClick={() => pickMonth(pickedYearMonth.month, PREV_TRANSITION)}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            )}
          </div>
          <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-6`}>
            <TransitionGroup className="react-minimal-datetime-range-calendar__title-container" childFactory={child => React.cloneElement(child, { classNames })}>
              <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} className={`react-minimal-datetime-range-calendar__title`} style={{ left: '0' }} classNames={classNames}>
                <span className={`react-minimal-datetime-range-calendar__clicker`} onClick={handleShowSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                  <span className={`react-minimal-datetime-range-calendar__clicker`}>
                    <span>{`${LOCALE_DATA.months[pickedYearMonth.month - 1]}`}</span>
                  </span>
                  <span>&nbsp;</span>
                  <span className={`react-minimal-datetime-range-calendar__clicker`}>
                    <span>{`${pickedYearMonth.year}`}</span>
                  </span>
                </span>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className={`react-minimal-datetime-range__col react-minimal-datetime-range__col-3`}>
            {showNextMonthArrow && (
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__next`} onClick={() => pickMonth(pickedYearMonth.month, NEXT_TRANSITION)}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            )}
            {showNextYearArrow && (
              <div className={`react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-next`} onClick={() => pickYear(pickedYearMonth.year, NEXT_TRANSITION)}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
                  <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className={`react-minimal-datetime-range-calendar__content`}>
          <div className={`react-minimal-datetime-range-calendar__table`}>
            <div className={`react-minimal-datetime-range-calendar__table-row`}>{captionHtml}</div>
          </div>
          <TransitionGroup className={`react-minimal-datetime-range-calendar__body-container`} style={transitionContainerStyle} childFactory={child => React.cloneElement(child, { classNames })}>
            <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} classNames={classNames}>
              {content}
            </CSSTransition>
          </TransitionGroup>
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
    markedDatesHash = {},
  }) => {
    const content = Object.keys(data).map(key => {
      let colHtml;
      if (data[key].length) {
        colHtml = data[key].map((item, key) => {
          const itemDate = new Date(`${item.year}-${item.month}-${item.name}`);
          let isDisabled = pickedYearMonth.month !== item.month;
          let isPickedStart = false;
          let isPickedEnd = false;
          let isHighlight = false;
          if (isDisabled === false) {
            let starts = startDatePickedArray;
            let ends = endDatePickedArray;
            if (startDatePickedArray.length && endDatePickedArray.length) {
              const a = new Date(startDatePickedArray.join('-'));
              const b = new Date(endDatePickedArray.join('-'));
              starts = a < b ? startDatePickedArray : endDatePickedArray;
              ends = a > b ? startDatePickedArray : endDatePickedArray;
            }
            if (starts.length) {
              isPickedStart = starts[0] === item.year && starts[1] === item.month && starts[2] === item.name;
              const targetDate = new Date(starts.join('-'));
              if (!ends.length) {
                if (itemDate > targetDate) {
                  isHighlight = true;
                }
              } else {
                if (itemDate > targetDate && itemDate < new Date(ends.join('-'))) {
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
            'range',
            isDisabled && 'disabled',
            isPickedStart && 'active',
            isPickedEnd && 'active',
            isHighlight && 'highlight',
            DATE == item.name && MONTH == item.month && YEAR == item.year && 'today',
            markedDatesHash[`${item.year}-${item.month}-${item.name}`] && 'marked',
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
  ({ selected, setSelected, startDatePickedArray, endDatePickedArray, handleChooseStartDate, handleChooseEndDate, item = {}, datePickerItemClass = '', onClick = () => {} }) => {
    const handleOnClick = useCallback(() => {
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
    }, [item, selected, startDatePickedArray, endDatePickedArray]);
    const handleOnMouseOver = useCallback(() => {
      if (!selected) {
        if (startDatePickedArray.length) {
          handleChooseEndDate(item);
        }
      }
    }, [item, selected, startDatePickedArray, endDatePickedArray]);
    return (
      <div className={`${datePickerItemClass}`} onMouseOver={handleOnMouseOver} onClick={handleOnClick}>
        {item.name}
      </div>
    );
  },
);

export default Index;
