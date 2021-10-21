import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { cx, isValidDate, isValidDates } from './utils.js';
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
    defaultTimes = ['', ''],
    handleChooseHourPick = () => {},
    handleChooseMinutePick = () => {},
    enableTimeSelection = false,
    markedDates = [],
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
            enableTimeSelection={enableTimeSelection}
            defaultTimes={defaultTimes}
            handleChooseHourPick={handleChooseHourPick}
            handleChooseMinutePick={handleChooseMinutePick}
            markedDates={markedDates}
          />
        )}
      </div>
    );
  },
);

const CalendarPickerComponent = memo(
  ({
    show,
    defaultDate,
    locale,
    onClose,
    handleOnYearPicked,
    handleOnMonthPicked,
    handleOnDatePicked,
    handleOnResetDate,
    handleOnResetDefaultDate,
    defaultTimes,
    markedDates,
    enableTimeSelection,
    handleChooseHourPick,
    handleChooseMinutePick,
  }) => {
    const isDefaultDatesValid = isValidDate(defaultDate);
    const [internalShow, setInternalShow] = useState(false);
    const [times, setTimes] = useState(defaultTimes);
    const [type, setType] = useState(TYPES[0]);
    const [startDatePickedArray, setStartDatePickedArray] = useState(defaultDate ? defaultDate.split('-') : []);
    const [startTimePickedArray, setStartTimePickedArray] = useState([defaultTimes[0].split(':')[0], defaultTimes[0].split(':')[1]]);
    const [selected, setSelected] = useState(isDefaultDatesValid ? true : false);
    const handleChooseStartTimeHour = useCallback(
      res => {
        setStartTimePickedArray([res, startTimePickedArray[1]]);
        handleChooseHourPick(res);
      },
      [startTimePickedArray],
    );
    const handleChooseStartTimeMinute = useCallback(
      res => {
        setStartTimePickedArray([startTimePickedArray[0], res]);
        handleChooseMinutePick(res);
      },
      [startTimePickedArray],
    );
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
    const handleOnChangeType = useCallback(() => {
      if (type === TYPES[0]) {
        setType(TYPES[1]);
      } else {
        setType(TYPES[0]);
      }
    }, [type]);
    const componentClass = useMemo(() => cx('react-minimal-datetime-range', internalShow && 'visible'), [internalShow]);
    const LOCALE_DATA = useMemo(() => (LOCALE[locale] ? LOCALE[locale] : LOCALE['en-us']), [locale]);
    return (
      <div className={componentClass}>
        <svg className="react-minimal-datetime-range__close" viewBox="0 0 20 20" width="15" height="15" onClick={handleOnClose}>
          <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
        </svg>
        <div className={`react-minimal-datetime-date-piker`}>
          <div className={`react-minimal-datetime-range__calendar`}>
            <Calendar
              defaultDate={defaultDate}
              locale={locale}
              onYearPicked={handleOnYearPicked}
              onMonthPicked={handleOnMonthPicked}
              onDatePicked={handleOnDatePicked}
              onResetDate={handleOnResetDate}
              onResetDefaultDate={handleOnResetDefaultDate}
              markedDates={markedDates}
            />
          </div>
          {type === TYPES[1] && (
            <div className="react-minimal-datetime-range__time-piker" style={{ marginTop: '10px' }}>
              <RangeTime
                defaultTimeStart={times[0]}
                startDatePickedArray={startDatePickedArray}
                handleChooseStartTimeHour={handleChooseStartTimeHour}
                handleChooseStartTimeMinute={handleChooseStartTimeMinute}
                startTimePickedArray={startTimePickedArray}
                showOnlyTime={true}
                LOCALE_DATA={LOCALE_DATA}
                singleMode={true}
              />
            </div>
          )}
        </div>
        {enableTimeSelection && (
          <div
            className={cx('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--type', !selected && 'disabled')}
            onClick={selected ? handleOnChangeType : () => {}}
            style={{ padding: '0', marginTop: '10px' }}
          >
            {type === TYPES[0] ? LOCALE_DATA[TYPES[1]] : LOCALE_DATA[TYPES[0]]}
          </div>
        )}
      </div>
    );
  },
);

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
    initialDates = ['', ''],
    initialTimes = ['', ''],
    onConfirm = () => {},
    onClear = () => {},
    onClose = () => {},
    style = {},
    showOnlyTime = false,
    markedDates = [],
  }) => {
    // ['YYYY-MM-DD', 'YYYY-MM-DD'] // ['hh:mm', 'hh:mm']
    const isDefaultDatesValid = isValidDates(defaultDates);
    const isInitialDatesValid = isValidDates(initialDates);
    const [selected, setSelected] = useState(isDefaultDatesValid ? true : false);
    const [start, setStart] = useState(defaultDates[0] ? `${defaultDates[0]} ${defaultTimes[0] ? defaultTimes[0] : ''}` : '');
    const [end, setEnd] = useState(defaultDates[1] ? `${defaultDates[1]} ${defaultTimes[1] ? defaultTimes[1] : ''}` : '');
    const [type, setType] = useState(TYPES[0]);
    const [internalShow, setInternalShow] = useState(show);
    const [startDatePickedArray, setStartDatePickedArray] = useState(defaultDates[0] ? defaultDates[0].split('-') : []);
    const [endDatePickedArray, setEndDatePickedArray] = useState(defaultDates[1] ? defaultDates[1].split('-') : []);
    const [currentDateObjStart, setCurrentDateObjStart] = useState({});
    const [currentDateObjEnd, setCurrentDateObjEnd] = useState({});
    const [startTimePickedArray, setStartTimePickedArray] = useState([defaultTimes[0].split(':')[0], defaultTimes[0].split(':')[1]]);
    const [endTimePickedArray, setEndTimePickedArray] = useState([defaultTimes[1].split(':')[0], defaultTimes[1].split(':')[1]]);
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
    const handleOnConfirm = useCallback(
      (e, sd, ed, st, et) => {
        if (!sd) {
          sd = startDatePickedArray;
        }
        if (!ed) {
          ed = endDatePickedArray;
        }
        if (!st) {
          st = startTimePickedArray;
        }
        if (!et) {
          et = endTimePickedArray;
        }
        const a = new Date(sd.join('-'));
        const b = new Date(ed.join('-'));
        const starts = a < b ? sd : ed;
        const ends = a > b ? sd : ed;
        const startStr = `${starts.join('-')} ${st.join(':')}`;
        const endStr = `${ends.join('-')} ${et.join(':')}`;
        setStart(startStr);
        setEnd(endStr);
        setStartDatePickedArray(starts);
        setEndDatePickedArray(ends);
        setStartTimePickedArray(st);
        setEndTimePickedArray(et);
        setDates([starts.join('-'), ends.join('-')]);
        setInternalShow(false);
        onConfirm && onConfirm([startStr, endStr]);
      },
      [startDatePickedArray, endDatePickedArray, startTimePickedArray, endTimePickedArray],
    );
    const handleOnClear = useCallback(
      e => {
        if (disabled) {
          return;
        }
        e.stopPropagation();
        if (isInitialDatesValid) {
          handleOnConfirm({}, initialDates[0].split('-'), initialDates[1].split('-'), initialTimes[0].split(':'), initialTimes[1].split(':'));
          return;
        }
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
      [disabled, initialDates, initialTimes],
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
    const isInitial = useMemo(() => start === `${initialDates[0]} ${initialTimes[0]}` && end === `${initialDates[1]} ${initialTimes[1]}`, [initialDates, initialTimes, start, end]);
    const isEmpty = useMemo(() => !start && !end, [start, end]);
    const valueStart = useMemo(() => (showOnlyTime ? start.split(' ')[1] : start), [showOnlyTime, start]);
    const valueEnd = useMemo(() => (showOnlyTime ? end.split(' ')[1] : end), [showOnlyTime, end]);
    return (
      <div className="react-minimal-datetime-range__range" style={style}>
        <span className={`react-minimal-datetime-range__range-input-wrapper ${disabled && 'disabled'}`} onClick={() => !disabled && setInternalShow(!internalShow)}>
          <input readOnly={true} placeholder={placeholder[0]} className={`react-minimal-datetime-range__range-input ${disabled && 'disabled'}`} value={valueStart} />
          <span className="react-minimal-datetime-range__range-input-separator"> ~ </span>
          <input readOnly={true} placeholder={placeholder[1]} className={`react-minimal-datetime-range__range-input ${disabled && 'disabled'}`} value={valueEnd} />
          {!isInitial && !isEmpty ? (
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
              showOnlyTime={showOnlyTime}
              markedDates={markedDates}
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
    showOnlyTime,
    markedDates,
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
    const LOCALE_DATA = useMemo(() => (LOCALE[locale] ? LOCALE[locale] : LOCALE['en-us']), [locale]);
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
            markedDates={markedDates}
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
            markedDates={markedDates}
          />
          {(showOnlyTime || type === TYPES[1]) && (
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
                showOnlyTime={showOnlyTime}
                LOCALE_DATA={LOCALE_DATA}
              />
            </div>
          )}
        </div>
        <div className="react-minimal-datetime-range__button-wrapper">
          {!showOnlyTime && (
            <div className={cx('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--type', !selected && 'disabled')} onClick={selected ? handleOnChangeType : () => {}}>
              {type === TYPES[0] ? LOCALE_DATA[TYPES[1]] : LOCALE_DATA[TYPES[0]]}
            </div>
          )}
          <div className={cx('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--confirm', !selected && 'disabled')} onClick={selected ? handleOnConfirm : () => {}}>
            {LOCALE_DATA['confirm']}
          </div>
        </div>
      </div>
    );
  },
);
