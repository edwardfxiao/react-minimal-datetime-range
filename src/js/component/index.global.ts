import { CalendarPicker, RangePicker } from './ReactMinimalRange';
if (typeof window !== 'undefined') {
  (<any>window).CalendarPicker = CalendarPicker;
  (<any>window).RangePicker = RangePicker;
}

export { CalendarPicker, RangePicker };
