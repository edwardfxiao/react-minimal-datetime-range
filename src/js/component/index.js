import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from './const';
import { cx, isValidDate } from './utils.js';
import Calendar from './Calendar.js';
import Range from './Range.js';
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

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();

export const RangePicker = memo(
  ({
    locale = DEFAULT_LACALE,
    placeholder = ['', ''],
    defaultDates = ['', ''],
    show = false,
    onClose = () => {},
    onYearPicked = () => {},
    onMonthPicked = () => {},
    onDatePicked = () => {},
    onResetDate = () => {},
    onResetDefaultDate = () => {},
  }) => {
    const [selected, setSelected] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [internalShow, setInternalShow] = useState(show);
    const [startDatePickedArray, setStartDatePickedArray] = useState([]);
    const [endDatePickedArray, setEndDatePickedArray] = useState([]);
    const [dates, setDates] = useState(defaultDates);
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
    const handleIsStartClicked = useCallback(bool => {
      setIsStartClicked(bool);
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
    const handleOnConfirm = useCallback(
      () => {
        setStart(startDatePickedArray.join('-'));
        setEnd(endDatePickedArray.join('-'));
      },
      [startDatePickedArray, endDatePickedArray],
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
            locale={locale}
            startDatePickedArray={startDatePickedArray}
            endDatePickedArray={endDatePickedArray}
            handleOnConfirm={handleOnConfirm}
          />
        )}
      </div>
    );
  },
);

const RangeWrapper = memo(({ show, selected, setSelected, handleChooseStartDate, handleChooseEndDate, dates, locale, startDatePickedArray, endDatePickedArray, handleOnConfirm }) => {
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
      <Range
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
      <Range
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
      <div>
        <div onClick={handleOnConfirm}>confirm</div>
      </div>
    </div>
  );
});
