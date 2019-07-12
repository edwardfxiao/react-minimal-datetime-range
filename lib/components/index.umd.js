"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CalendarPicker", {
  enumerable: true,
  get: function get() {
    return _index.CalendarPicker;
  }
});
Object.defineProperty(exports, "RangePicker", {
  enumerable: true,
  get: function get() {
    return _index.RangePicker;
  }
});

var _index = require("./index.js");

if (typeof window !== 'undefined') {
  window.CalendarPicker = _index.CalendarPicker;
  window.RangePicker = _index.RangePicker;
}