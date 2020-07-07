import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { cx, isValidDate } from './utils.js';
import LOCALE from './locale.js';
import Calendar from './Calendar.js';
import RangeDate from './RangeDate.js';
import RangeTime from './RangeTime.js';
const DEFAULT_LACALE = 'en-us';
try {
  STYLES = require('./react-minimal-datetime-range.css');
} catch (ex) {}
export const CalendarPicker = memo(
  ({
    show = false,
    locale = DEFAULT_LACALE,
    allowPageClickToClose = true,
    onClose = () => {},
    defaultDate = '',
    onYearPicked = () => {},
    onMonthPicked = () => {},
    onDatePicked = () => {},
    onResetDate = () => {},
    onResetDefaultDate = () => {},
    style = {},
  }) => {
    const [internalShow, setInternalShow] = useState(show);
    const handleOnClose = useCallback(() => {
      setInternalShow(false);
      onClose && onClose();
    }, []);
    const handleOnYearPicked = useCallback(yearObj => {
      onYearPicked && onYearPicked(yearObj);
    }, []);
    const handleOnMonthPicked = useCallback(monthObj => {
      onMonthPicked && onMonthPicked(monthObj);
    }, []);
    const handleOnDatePicked = useCallback(dateObj => {
      onDatePicked && onDatePicked(dateObj);
    }, []);
    const handleOnResetDate = useCallback(dateObj => {
      onResetDate && onResetDate(dateObj);
    }, []);
    const handleOnResetDefaultDate = useCallback(dateObj => {
      onResetDefaultDate && onResetDefaultDate(dateObj);
    }, []);
    useEffect(() => {
      setInternalShow(show);
    }, [show]);
    const $elWrapper = useRef(null);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('mousedown', pageClick);
        window.addEventListener('touchstart', pageClick);
        return () => {
          window.removeEventListener('mousedown', pageClick);
          window.removeEventListener('touchstart', pageClick);
        };
      }
    }, []);
    const pageClick = useCallback(
      e => {
        if (!allowPageClickToClose) {
          return;
        }
        if ($elWrapper.current.contains(e.target)) {
          return;
        }
        handleOnClose();
      },
      [allowPageClickToClose],
    );
    return (
      <div style={style} ref={$elWrapper}>
        {internalShow && (
          <CalendarPickerComponent
            show={internalShow}
            defaultDate={defaultDate}
            locale={locale}
            onClose={handleOnClose}
            handleOnYearPicked={handleOnYearPicked}
            handleOnMonthPicked={handleOnMonthPicked}
            handleOnDatePicked={handleOnDatePicked}
            handleOnResetDate={handleOnResetDate}
            handleOnResetDefaultDate={handleOnResetDefaultDate}
          />
        )}
      </div>
    );
  },
);

const CalendarPickerComponent = memo(({ show, defaultDate, locale, onClose, handleOnYearPicked, handleOnMonthPicked, handleOnDatePicked, handleOnResetDate, handleOnResetDefaultDate }) => {
  const [internalShow, setInternalShow] = useState(false);
  const handleOnClose = useCallback(() => {
    setInternalShow(false);
    onClose && onClose();
  }, []);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setInternalShow(true);
      }, 0);
    }
  }, [show]);
  const componentClass = useMemo(() => cx('react-minimal-datetime-range', internalShow && 'visible'), [internalShow]);
  return (
    <div className={componentClass}>
      <svg className="react-minimal-datetime-range__close" viewBox="0 0 20 20" width="15" height="15" onClick={handleOnClose}>
        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
      </svg>
      <div className={`react-minimal-datetime-range__calendar`}>
        <Calendar
          defaultDate={defaultDate}
          locale={locale}
          onYearPicked={handleOnYearPicked}
          onMonthPicked={handleOnMonthPicked}
          onDatePicked={handleOnDatePicked}
          onResetDate={handleOnResetDate}
          onResetDefaultDate={handleOnResetDefaultDate}
        />
      </div>
    </div>
  );
});

const TYPES = ['date', 'time'];

export const RangePicker = memo(
  ({
    show = false,
    disabled = false,
    allowPageClickToClose = true,
    locale = DEFAULT_LACALE,
    placeholder = ['', ''],
    defaultDates = ['', ''],
    defaultTimes = ['', ''],
    onConfirm = () => {},
    onClear = () => {},
    onClose = () => {},
    style = {},
  }) => {
    // ['YYYY-MM-DD', 'YYYY-MM-DD'] // ['hh:mm', 'hh:mm']
    const isDefaultDatesValid = useMemo(() => {
      let isValid = false;
      if (defaultDates.length === 2) {
        isValid = true;
        defaultDates.forEach(defaultDate => {
          if (!isValidDate(defaultDate)) {
            isValid = false;
          }
        });
      }
      return isValid;
    }, [defaultDates]);
    const [selected, setSelected] = useState(isDefaultDatesValid ? true : false);
    const [start, setStart] = useState(defaultDates[0] ? `${defaultDates[0]} ${defaultTimes[0] ? defaultTimes[0] : ''}` : '');
    const [end, setEnd] = useState(defaultDates[1] ? `${defaultDates[1]} ${defaultTimes[1] ? defaultTimes[1] : ''}` : '');
    const [type, setType] = useState(TYPES[0]);
    const [internalShow, setInternalShow] = useState(show);
    const [startDatePickedArray, setStartDatePickedArray] = useState(defaultDates[0] ? defaultDates[0].split('-') : []);
    const [endDatePickedArray, setEndDatePickedArray] = useState(defaultDates[1] ? defaultDates[1].split('-') : []);
    const [currentDateObjStart, setCurrentDateObjStart] = useState({});
    const [currentDateObjEnd, setCurrentDateObjEnd] = useState({});
    const [startTimePickedArray, setStartTimePickedArray] = useState(['00', '00']);
    const [endTimePickedArray, setEndTimePickedArray] = useState(['00', '00']);
    const [dates, setDates] = useState(defaultDates);
    const [times, setTimes] = useState(defaultTimes);
    const handleChooseStartDate = useCallback(
      ({ name, month, year, value }) => {
        setDates([value, dates[1]]);
        setStartDatePickedArray(value === '' ? [] : [year, month, name]);
      },
      [dates],
    );
    const handleChooseEndDate = useCallback(
      ({ name, month, year, value }) => {
        setDates([dates[0], value]);
        setEndDatePickedArray(value === '' ? [] : [year, month, name]);
      },
      [dates],
    );
    const handleChooseStartTimeHour = useCallback(
      res => {
        setStartTimePickedArray([res, startTimePickedArray[1]]);
      },
      [startTimePickedArray],
    );
    const handleChooseStartTimeMinute = useCallback(
      res => {
        setStartTimePickedArray([startTimePickedArray[0], res]);
      },
      [startTimePickedArray],
    );
    const handleChooseEndTimeHour = useCallback(
      res => {
        setEndTimePickedArray([res, endTimePickedArray[1]]);
      },
      [endTimePickedArray],
    );
    const handleChooseEndTimeMinute = useCallback(
      res => {
        setEndTimePickedArray([endTimePickedArray[0], res]);
      },
      [endTimePickedArray],
    );
    const handleOnChangeType = useCallback(() => {
      if (type === TYPES[0]) {
        setType(TYPES[1]);
      } else {
        setType(TYPES[0]);
      }
    }, [type]);
    const handleOnConfirm = useCallback(() => {
      const a = new Date(startDatePickedArray.join('-'));
      const b = new Date(endDatePickedArray.join('-'));
      const starts = a < b ? startDatePickedArray : endDatePickedArray;
      const ends = a > b ? startDatePickedArray : endDatePickedArray;
      const startStr = `${starts.join('-')} ${startTimePickedArray.join(':')}`;
      const endStr = `${ends.join('-')} ${endTimePickedArray.join(':')}`;
      setStart(startStr);
      setEnd(endStr);
      setStartDatePickedArray(starts);
      setEndDatePickedArray(ends);
      setDates([starts.join('-'), ends.join('-')]);
      setInternalShow(false);
      onConfirm && onConfirm([startStr, endStr]);
    }, [startDatePickedArray, endDatePickedArray, startTimePickedArray, endTimePickedArray]);
    const handleOnClear = useCallback(
      e => {
        if (disabled) {
          return;
        }
        e.stopPropagation();
        setSelected(false);
        setInternalShow(false);
        setStart('');
        setEnd('');
        setStartDatePickedArray([]);
        setEndDatePickedArray([]);
        setDates(['', '']);
        setTimes(['', '']);
        setStartTimePickedArray(['00', '00']);
        setEndTimePickedArray(['00', '00']);
        onClear && onClear();
      },
      [disabled],
    );
    useEffect(() => {
      setType(TYPES[0]);
    }, [internalShow]);
    useEffect(() => {
      if (!internalShow) {
        onClose && onClose();
      }
    }, [internalShow]);
    useEffect(() => {
      setStart(defaultDates[0] ? `${defaultDates[0]} ${defaultTimes[0] ? defaultTimes[0] : ''}` : '');
      setEnd(defaultDates[1] ? `${defaultDates[1]} ${defaultTimes[1] ? defaultTimes[1] : ''}` : '');
    }, [defaultDates]);
    const $elWrapper = useRef(null);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('mousedown', pageClick);
        window.addEventListener('touchstart', pageClick);
        return () => {
          window.removeEventListener('mousedown', pageClick);
          window.removeEventListener('touchstart', pageClick);
        };
      }
    }, []);
    const pageClick = useCallback(
      e => {
        if (!allowPageClickToClose) {
          return;
        }
        if ($elWrapper.current.contains(e.target)) {
          return;
        }
        setInternalShow(false);
      },
      [allowPageClickToClose],
    );
    const isDefault = useMemo(() => start === `${defaultDates[0]} ${defaultTimes[0]}` && end === `${defaultDates[1]} ${defaultTimes[1]}`, [start, end]);
    const isEmpty = useMemo(() => !start && !end, [start, end]);
    return (
      <div className="react-minimal-datetime-range__range" style={style}>
        <span className={`react-minimal-datetime-range__range-input-wrapper ${disabled && 'disabled'}`} onClick={() => !disabled && setInternalShow(!internalShow)}>
          <input readOnly={true} placeholder={placeholder[0]} className={`react-minimal-datetime-range__range-input ${disabled && 'disabled'}`} value={start} />
          <span className="react-minimal-datetime-range__range-input-separator"> ~ </span>
          <input readOnly={true} placeholder={placeholder[1]} className={`react-minimal-datetime-range__range-input ${disabled && 'disabled'}`} value={end} />
          {!isDefault && !isEmpty ? (
            <svg className={`react-minimal-datetime-range__clear ${disabled && 'disabled'}`} width="15" height="15" viewBox="0 0 24 24" onClick={handleOnClear}>
              <path
                className="react-minimal-datetime-range__icon-fill"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          ) : (
            <svg className="react-minimal-datetime-range__clear" width="15" height="15" viewBox="0 0 24 24">
              <path
                className="react-minimal-datetime-range__icon-fill"
                d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
              />
              <path fill="none" d="M0 0h24v24H0z" />
            </svg>
          )}
        </span>
        <div ref={$elWrapper}>
          {internalShow && (
            <RangePickerComponent
              show={internalShow}
              selected={selected}
              setSelected={setSelected}
              handleChooseStartDate={handleChooseStartDate}
              handleChooseEndDate={handleChooseEndDate}
              dates={dates}
              times={times}
              locale={locale}
              startDatePickedArray={startDatePickedArray}
              endDatePickedArray={endDatePickedArray}
              type={type}
              handleOnChangeType={handleOnChangeType}
              handleOnConfirm={handleOnConfirm}
              startTimePickedArray={startTimePickedArray}
              endTimePickedArray={endTimePickedArray}
              handleChooseStartTimeHour={handleChooseStartTimeHour}
              handleChooseStartTimeMinute={handleChooseStartTimeMinute}
              handleChooseEndTimeHour={handleChooseEndTimeHour}
              handleChooseEndTimeMinute={handleChooseEndTimeMinute}
              currentDateObjStart={currentDateObjStart}
              setCurrentDateObjStart={setCurrentDateObjStart}
              currentDateObjEnd={currentDateObjEnd}
              setCurrentDateObjEnd={setCurrentDateObjEnd}
            />
          )}
        </div>
      </div>
    );
  },
);

const RangePickerComponent = memo(
  ({
    show,
    selected,
    setSelected,
    handleChooseStartDate,
    handleChooseEndDate,
    dates,
    times,
    locale,
    startDatePickedArray,
    endDatePickedArray,
    type,
    handleOnChangeType,
    handleOnConfirm,
    handleChooseStartTimeHour,
    handleChooseStartTimeMinute,
    handleChooseEndTimeHour,
    handleChooseEndTimeMinute,
    startTimePickedArray,
    endTimePickedArray,
    currentDateObjList,
    currentDateObjStart,
    setCurrentDateObjStart,
    currentDateObjEnd,
    setCurrentDateObjEnd,
  }) => {
    const [internalShow, setInternalShow] = useState(false);
    useEffect(() => {
      if (show) {
        setTimeout(() => {
          setInternalShow(true);
        }, 0);
      }
    }, [show]);
    const componentClass = useMemo(() => cx('react-minimal-datetime-range', internalShow && 'visible'), [internalShow]);
    return (
      <div className={componentClass}>
        <div className="react-minimal-datetime-date-piker">
          <RangeDate
            selected={selected}
            setSelected={setSelected}
            handleChooseStartDate={handleChooseStartDate}
            handleChooseEndDate={handleChooseEndDate}
            rangeDirection="start"
            defaultDateStart={dates[0]}
            defaultDateEnd={dates[1]}
            locale={locale}
            startDatePickedArray={startDatePickedArray}
            endDatePickedArray={endDatePickedArray}
            currentDateObjStart={currentDateObjStart}
            setCurrentDateObjStart={setCurrentDateObjStart}
            currentDateObjEnd={currentDateObjEnd}
            setCurrentDateObjEnd={setCurrentDateObjEnd}
          />
          <div className="react-minimal-datetime-date-piker__divider" />
          <RangeDate
            selected={selected}
            setSelected={setSelected}
            handleChooseStartDate={handleChooseStartDate}
            handleChooseEndDate={handleChooseEndDate}
            rangeDirection="end"
            defaultDateStart={dates[0]}
            defaultDateEnd={dates[1]}
            locale={locale}
            startDatePickedArray={startDatePickedArray}
            endDatePickedArray={endDatePickedArray}
            currentDateObjStart={currentDateObjStart}
            setCurrentDateObjStart={setCurrentDateObjStart}
            currentDateObjEnd={currentDateObjEnd}
            setCurrentDateObjEnd={setCurrentDateObjEnd}
          />
          {type === TYPES[1] && (
            <div className="react-minimal-datetime-range__time-piker">
              <RangeTime
                defaultTimeStart={times[0]}
                defaultTimeEnd={times[1]}
                startDatePickedArray={startDatePickedArray}
                endDatePickedArray={endDatePickedArray}
                handleChooseStartTimeHour={handleChooseStartTimeHour}
                handleChooseStartTimeMinute={handleChooseStartTimeMinute}
                handleChooseEndTimeHour={handleChooseEndTimeHour}
                handleChooseEndTimeMinute={handleChooseEndTimeMinute}
                startTimePickedArray={startTimePickedArray}
                endTimePickedArray={endTimePickedArray}
              />
            </div>
          )}
        </div>
        <div className="react-minimal-datetime-range__button-wrapper">
          <div className={cx('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--type', !selected && 'disabled')} onClick={selected ? handleOnChangeType : () => {}}>
            {type === TYPES[0] ? LOCALE[locale][TYPES[1]] : LOCALE[locale][TYPES[0]]}
          </div>
          <div className={cx('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--confirm', !selected && 'disabled')} onClick={selected ? handleOnConfirm : () => {}}>
            {LOCALE[locale]['confirm']}
          </div>
        </div>
      </div>
    );
  },
);
