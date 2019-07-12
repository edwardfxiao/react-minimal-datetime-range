import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LOCALE from './locale.js';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from './const';
import { cx, isValidDate } from './utils.js';
import CSS from './react-minimal-datetime-range.css';

const HOURS = [...Array(24).keys()];
const MINUTES = [...Array(60).keys()];

const Index = memo(
  ({
    defaultTimeStart,
    defaultTimeEnd,
    startDatePickedArray,
    endDatePickedArray,
    handleChooseStartTimeHour,
    handleChooseStartTimeMinute,
    handleChooseEndTimeHour,
    handleChooseEndTimeMinute,
    startTimePickedArray,
    endTimePickedArray,
  }) => {
    return (
      <div className="react-minimal-datetime-range__time-select-wrapper">
        <div>
          <div className="react-minimal-datetime-range__date">{startDatePickedArray.join('-')}</div>
          <div className="react-minimal-datetime-range__date">{endDatePickedArray.join('-')}</div>
        </div>
        <div className="react-minimal-datetime-range__time-select-options-wrapper">
          {HOURS.map(i => {
            const item = formatDateString(i);
            return (
              <div key={i} className={cx('react-minimal-datetime-range__time-select-option', item === startTimePickedArray[0] && 'active')} onClick={() => handleChooseStartTimeHour(item)}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="react-minimal-datetime-range__time-select-options-wrapper">
          {MINUTES.map(i => {
            const item = formatDateString(i);
            return (
              <div key={i} className={cx('react-minimal-datetime-range__time-select-option', item === startTimePickedArray[1] && 'active')} onClick={() => handleChooseStartTimeMinute(item)}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="react-minimal-datetime-range__time-select-options-wrapper">
          {HOURS.map(i => {
            const item = formatDateString(i);
            return (
              <div key={i} className={cx('react-minimal-datetime-range__time-select-option', item === endTimePickedArray[0] && 'active')} onClick={() => handleChooseEndTimeHour(item)}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="react-minimal-datetime-range__time-select-options-wrapper">
          {MINUTES.map(i => {
            const item = formatDateString(i);
            return (
              <div key={i} className={cx('react-minimal-datetime-range__time-select-option', item === endTimePickedArray[1] && 'active')} onClick={() => handleChooseEndTimeMinute(item)}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default Index;
