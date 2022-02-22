import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LOCALE from './locale';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from './const';
import { cx, isValidDate } from './utils';
interface IObjectKeysAny {
  [key: string]: any;
}
interface IObjectKeysBool {
  [key: string]: boolean;
}
interface IObjectKeysArray {
  [key: string]: Array<object>;
}
const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();

const ITEM_HEIGHT = 40;

interface IndexProps {
  locale?: string;
  defaultDate?: string;
  markedDates?: Array<string>;
  supportDateRange?: Array<string>;
  onYearPicked?: (res: object) => void;
  onMonthPicked?: (res: object) => void;
  onDatePicked?: (res: object) => void;
  onResetDate?: (res: object) => void;
  onResetDefaultDate?: (res: object) => void;
}
const Index: React.FC<IndexProps> = memo(
  ({
    locale = 'en-us',
    defaultDate = '',
    markedDates = [],
    supportDateRange = [],
    onYearPicked = () => {},
    onMonthPicked = () => {},
    onDatePicked = () => {},
    onResetDate = () => {},
    onResetDefaultDate = () => {},
  }) => {
    const markedDatesHash: IObjectKeysBool = useMemo(() => {
      const res: IObjectKeysBool = {};
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
    const LOCALE_DATA: IObjectKeysAny = useMemo(() => (LOCALE[locale] ? LOCALE[locale] : LOCALE['en-us']), [locale]);
    let defaultDateDate = DATE;
    let defaultDateMonth = MONTH;
    let defaultDateYear = YEAR;
    let defaultDates = getDaysArray(YEAR, MONTH);
    const isDefaultDateValid = useMemo(() => isValidDate(defaultDate), [defaultDate]);
    if (isDefaultDateValid) {
      const dateStr = defaultDate.split('-');
      defaultDateYear = Number(dateStr[0]);
      defaultDateMonth = Number(dateStr[1]);
      defaultDateDate = Number(dateStr[2]);
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
    useEffect(() => {
      setDates(getDaysArray(Number(pickedYearMonth.year), Number(pickedYearMonth.month)));
    }, [pickedYearMonth]);
    const minSupportDate = supportDateRange.length > 0 && isValidDate(supportDateRange[0]) ? supportDateRange[0] : '';
    const maxSupportDate = supportDateRange.length > 1 && isValidDate(supportDateRange[1]) ? supportDateRange[1] : '';
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
        const newPickedDateInfo = {
          ...pickedDateInfo,
          year: pickedYearMonth.year,
          month: pickedYearMonth.month,
          date: formatDateString(Number(pickedDate)),
        };
        setPickedDateInfo(newPickedDateInfo);
        onDatePicked(newPickedDateInfo);
      },
      [pickedYearMonth, pickedDateInfo],
    );
    const reset = useCallback(
      (today = false) => {
        let year = YEAR;
        let month = MONTH;
        let date = DATE;
        if (!today) {
          const dateStr = defaultDate.split('-');
          year = Number(dateStr[0]);
          month = Number(dateStr[1]);
          date = Number(dateStr[2]);
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
      let rowObj: IObjectKeysArray = {};
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
          data={rowObj}
          pickedYearMonth={pickedYearMonth}
          pickedDateInfo={pickedDateInfo}
          onClick={pickDate}
          key={pickedYearMonth.string}
          markedDatesHash={markedDatesHash}
          minSupportDate={minSupportDate}
          maxSupportDate={maxSupportDate}
        />
      );
      transitionContainerStyle = {
        height: `${row * ITEM_HEIGHT}px`,
      };
    }
    const captionHtml = LOCALE_DATA.weeks.map((item: string, key: string) => {
      return (
        <div className={`react-minimal-datetime-range-calendar__table-caption react-minimal-datetime-range-calendar__table-cel no-border`} key={key}>
          {item}
        </div>
      );
    });
    let selectorPanelClass = cx('react-minimal-datetime-range-dropdown', 'react-minimal-datetime-range-calendar__selector-panel', showSelectorPanel && 'visible');
    let selectorPanelMonthHtml = LOCALE_DATA.months.map((item: string, key: string) => {
      let itemMonth: number = Number(key) + 1;
      const numberMonth = Number(pickedYearMonth.month);
      let monthItemClass = cx('react-minimal-datetime-range-dropdown-calendar__month-item', itemMonth === numberMonth && 'active');
      let month = itemMonth - 1;
      let direction = NEXT_TRANSITION;
      if (itemMonth < numberMonth) {
        direction = PREV_TRANSITION;
        month = itemMonth + 1;
      }
      return (
        <div
          className={monthItemClass}
          onClick={
            itemMonth !== numberMonth
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
        const numberYearMonth = Number(pickedYearMonth.year);
        let yearItemClass = cx('react-minimal-datetime-range-dropdown-calendar__year-item', item === numberYearMonth && 'active');
        let year = item - 1;
        let direction = NEXT_TRANSITION;
        if (item < numberYearMonth) {
          direction = PREV_TRANSITION;
          year = item + 1;
        }
        return (
          <div
            className={yearItemClass}
            onClick={
              item !== numberYearMonth
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
      <div className={`react-minimal-datetime-range-calendar`}>
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
                  <CSSTransition key={yearSelectorPanelList.join('-')} timeout={{ enter: 300, exit: 300 }} className={`react-minimal-datetime-range-dropdown-calendar__year`} classNames={classNames}>
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
            <TransitionGroup className="react-minimal-datetime-range-calendar__title-container" childFactory={child => React.cloneElement(child, { classNames })}>
              <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} className={`react-minimal-datetime-range-calendar__title`} style={{ left: '0' }} classNames={classNames}>
                <span className={`react-minimal-datetime-range-calendar__clicker`} onClick={handleShowSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                  <span className={`react-minimal-datetime-range-calendar__clicker`}>{LOCALE_DATA.date_format(LOCALE_DATA.months[Number(pickedYearMonth.month) - 1], pickedYearMonth.year)}</span>
                </span>
              </CSSTransition>
            </TransitionGroup>
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
          <TransitionGroup className={`react-minimal-datetime-range-calendar__body-container`} style={transitionContainerStyle} childFactory={child => React.cloneElement(child, { classNames })}>
            <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} classNames={classNames}>
              {content}
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className={`react-minimal-datetime-range-calendar__button react-minimal-datetime-range-calendar__today`} onClick={() => reset(true)}>
          <span className={`react-minimal-datetime-range-calendar__inline-span`}>{LOCALE_DATA['today']}</span>
          <span className={`react-minimal-datetime-range-calendar__inline-span react-minimal-datetime-range-calendar__icon react-minimal-datetime-range-refresh`} />
        </div>
        {isDefaultDateValid ? (
          <div className={`react-minimal-datetime-range-calendar__button react-minimal-datetime-range-calendar__default-day`} onClick={() => reset(false)}>
            <span className={`react-minimal-datetime-range-calendar__inline-span`}>{LOCALE_DATA['reset-date']}</span>
            <span className={`react-minimal-datetime-range-calendar__inline-span react-minimal-datetime-range-calendar__icon react-minimal-datetime-range-refresh`} />
          </div>
        ) : (
          ``
        )}
      </div>
    );
  },
);
interface pickedDateInfo {
  date: string;
  month: string;
  year: string;
}
interface pickedYearMonth {
  month: string;
  year: string;
}
interface CalendarBodyProps {
  data?: IObjectKeysArray;
  pickedDateInfo?: pickedDateInfo;
  pickedYearMonth?: pickedYearMonth;
  markedDates?: Array<string>;
  markedDatesHash: IObjectKeysBool;
  minSupportDate: string;
  maxSupportDate: string;
  onClick?: (res: string) => void;
}
const CalendarBody: React.FC<CalendarBodyProps> = memo(({ data = {}, pickedDateInfo = {}, pickedYearMonth = {}, onClick = () => {}, markedDatesHash, minSupportDate, maxSupportDate }) => {
  const content = Object.keys(data).map(key => {
    let colHtml;
    if (data[key].length) {
      colHtml = data[key].map((item: { [k: string]: any }, key: any) => {
        const itemDate = `${item.year}-${Number(item.month)}-${Number(item.name)}`;
        const isPicked = pickedDateInfo.date === item.name && pickedDateInfo.month === item.month && pickedDateInfo.year === item.year;
        let isDisabled = pickedYearMonth.month !== item.month;
        if (minSupportDate) {
          if (new Date(itemDate) < new Date(minSupportDate)) {
            isDisabled = true;
          }
        }
        if (maxSupportDate) {
          if (new Date(itemDate) > new Date(maxSupportDate)) {
            isDisabled = true;
          }
        }
        const datePickerItemClass = cx(
          'react-minimal-datetime-range-calendar__table-cel',
          'react-minimal-datetime-range-calendar__date-item',
          isDisabled && 'disabled',
          DATE == item.name && MONTH == item.month && YEAR == item.year && 'today',
          markedDatesHash[`${item.year}-${item.month}-${item.name}`] && 'marked',
          isPicked && 'active',
        );
        return <CalendarItem key={key} item={item} onClick={onClick} isPicked={isPicked} isDisabled={isDisabled} datePickerItemClass={datePickerItemClass} />;
      });
    }
    return (
      <div className={`react-minimal-datetime-range-calendar__table-row`} key={key}>
        {colHtml}
      </div>
    );
  });
  return <div className={`react-minimal-datetime-range-calendar__table slide`}>{content}</div>;
});
interface CalendarItemProps {
  item?: IObjectKeysAny;
  isPicked?: boolean;
  isDisabled?: boolean;
  datePickerItemClass?: string;
  onClick?: (res: string) => void;
}
const CalendarItem: React.FC<CalendarItemProps> = memo(({ item = {}, isPicked = false, isDisabled = false, datePickerItemClass = '', onClick = () => {} }) => {
  const handleOnClick = useCallback(() => {
    onClick(item.name);
  }, [item.name]);
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
        <svg className="react-minimal-datetime-range-check" width="15" height="15" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path className="react-minimal-datetime-range-check__path" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
    </div>
  );
});

export default Index;
