import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { cx } from './utils.js';
import Calendar from './Calendar.js';
const Index = memo(
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
    const componentClass = useMemo(() => cx('picky-date-time', show && 'visible'), [show]);
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
        <svg className="picky-date-time__close" viewBox="0 0 20 20" width="15" height="15" onClick={handleOnClose}>
          <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
        </svg>
        <div className={`picky-date-time__calendar`}>
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

export default Index;
