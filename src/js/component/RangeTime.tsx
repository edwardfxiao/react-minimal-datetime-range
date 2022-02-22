import React, { memo } from 'react';
import { formatDateString } from './const';
import { cx } from './utils';

const HOURS = [...Array(24).keys()];
const MINUTES = [...Array(60).keys()];
interface IObjectKeysAny {
  [key: string]: any;
}
interface IndexProps {
  showOnlyTime: boolean;
  LOCALE_DATA: IObjectKeysAny;
  singleMode?: boolean;
  startDatePickedArray?: Array<string>;
  endDatePickedArray?: Array<string>;
  startTimePickedArray?: Array<string>;
  endTimePickedArray?: Array<string>;
  handleChooseStartTimeHour: (res: string) => void;
  handleChooseStartTimeMinute: (res: string) => void;
  handleChooseEndTimeHour?: (res: string) => void;
  handleChooseEndTimeMinute?: (res: string) => void;
}
const Index: React.FC<IndexProps> = memo(
  ({
    startDatePickedArray,
    endDatePickedArray,
    handleChooseStartTimeHour,
    handleChooseStartTimeMinute,
    handleChooseEndTimeHour,
    handleChooseEndTimeMinute,
    startTimePickedArray,
    endTimePickedArray,
    showOnlyTime,
    LOCALE_DATA,
    singleMode = false,
  }) => {
    if (singleMode) {
      return (
        <div className="react-minimal-datetime-range__time-select-wrapper react-minimal-datetime-range__time-select-wrapper--single">
          <div>
            <div className="react-minimal-datetime-range__date">{startDatePickedArray.join('-')}</div>
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
        </div>
      );
    }
    return (
      <div className="react-minimal-datetime-range__time-select-wrapper">
        <div>
          <div className="react-minimal-datetime-range__date">{showOnlyTime ? LOCALE_DATA['start'] : startDatePickedArray.join('-')}</div>
          <div className="react-minimal-datetime-range__date">{showOnlyTime ? LOCALE_DATA['end'] : endDatePickedArray.join('-')}</div>
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
