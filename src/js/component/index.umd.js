import { CalendarPicker, RangePicker } from './index.js';

if (typeof window !== 'undefined') {
  window.CalendarPicker = CalendarPicker;
  window.RangePicker = RangePicker;
}

export { CalendarPicker, RangePicker };
