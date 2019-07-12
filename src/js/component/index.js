import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { cx, isValidDate } from './utils.js';
import LOCALE from './locale.js';
import Calendar from './Calendar.js';
import RangeDate from './RangeDate.js';
import RangeTime from './RangeTime.js';
const DEFAULT_LACALE = 'en-us';
export const CalendarPicker = memo(
  ({
    locale = DEFAULT_LACALE,
    show = false,
    onClose = () => {},
    defaultDate = '',
    onYearPicked = () => {},
    onMonthPicked = () => {},
    onDatePicked = () => {},
    onResetDate = () => {},
    onResetDefaultDate = () => {},
  }) => {
    const componentClass = useMemo(() => cx('react-minimal-datetime-range', show && 'visible'), [show]);
    const handleOnClose = useCallback(() => {
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
    return (
      <div className={`${componentClass}`}>
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
  },
);

const TYPES = ['date', 'time'];

export const RangePicker = memo(({ locale = DEFAULT_LACALE, placeholder = ['', ''], defaultDates = ['', ''], defaultTimes = ['', ''], show = false, onConfirm = () => {} }) => { // ['MM/DD/YYYY', 'MM/DD/YYYY'] // ['hh:mm:ss', 'hh:mm:ss']
  const [selected, setSelected] = useState(false);
  const [start, setStart] = useState('');
  const [type, setType] = useState(TYPES[0]);
  const [end, setEnd] = useState('');
  const [internalShow, setInternalShow] = useState(show);
  const [startDatePickedArray, setStartDatePickedArray] = useState([]);
  const [endDatePickedArray, setEndDatePickedArray] = useState([]);
  const [startTimePickedArray, setStartTimePickedArray] = useState([]);
  const [endTimePickedArray, setEndTimePickedArray] = useState([]);
  const [dates, setDates] = useState(defaultDates);
  const [times, setTimes] = useState(defaultTimes);
  const handleOnYearPicked = useCallback(yearObj => {
    onYearPicked && onYearPicked(yearObj);
  }, []);
  const handleOnMonthPicked = useCallback(monthObj => {
    onMonthPicked && onMonthPicked(monthObj);
  }, []);
  const handleOnDatePicked = useCallback(dateObj => {
    onDatePicked && onDatePicked(dateObj);
  }, []);
  const handleChooseStartDate = useCallback(
    ({ name, month, year, value }) => {
      setDates([value.replace(/-/g, '/'), dates[1]]);
      setStartDatePickedArray([year, month, name]);
    },
    [dates],
  );
  const handleChooseEndDate = useCallback(
    ({ name, month, year, value }) => {
      setDates([dates[0], value.replace(/-/g, '/')]);
      setEndDatePickedArray([year, month, name]);
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
  const handleOnChangeType = useCallback(
    () => {
      if (type === TYPES[0]) {
        setType(TYPES[1]);
      } else {
        setType(TYPES[0]);
      }
    },
    [type],
  );
  const handleOnConfirm = useCallback(
    () => {
      setStart(`${startDatePickedArray.join('-')} ${startTimePickedArray.join(':')}`);
      setEnd(`${endDatePickedArray.join('-')} ${endTimePickedArray.join(':')}`);
      setInternalShow(false);
      onConfirm && onConfirm();
    },
    [startDatePickedArray, endDatePickedArray, startTimePickedArray, endTimePickedArray],
  );
  useEffect(
    () => {
      setType(TYPES[0]);
    },
    [internalShow],
  );
  return (
    <div className="react-minimal-datetime-range__range">
      <span className="react-minimal-datetime-range__range-input-wrapper" onClick={() => setInternalShow(!internalShow)}>
        <input readOnly={true} placeholder={placeholder[0]} className="react-minimal-datetime-range__range-input" tabIndex="-1" value={start} />
        <span className="react-minimal-datetime-range__range-input-separator"> ~ </span>
        <input readOnly={true} placeholder={placeholder[1]} className="react-minimal-datetime-range__range-input" tabIndex="-1" value={end} />
      </span>
      {internalShow && (
        <RangeWrapper
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
        />
      )}
    </div>
  );
});

const RangeWrapper = memo(
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
  }) => {
    const [internalShow, setInternalShow] = useState(false);
    useEffect(
      () => {
        if (show) {
          setTimeout(() => {
            setInternalShow(true);
          }, 0);
        }
      },
      [show],
    );
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
          />
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
