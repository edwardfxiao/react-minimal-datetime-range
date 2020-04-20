"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _const = require("./const");

var _utils = require("./utils.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var HOURS = _toConsumableArray(Array(24).keys());

var MINUTES = _toConsumableArray(Array(60).keys());

var Index = (0, _react.memo)(function (_ref) {
  var startDatePickedArray = _ref.startDatePickedArray,
      endDatePickedArray = _ref.endDatePickedArray,
      handleChooseStartTimeHour = _ref.handleChooseStartTimeHour,
      handleChooseStartTimeMinute = _ref.handleChooseStartTimeMinute,
      handleChooseEndTimeHour = _ref.handleChooseEndTimeHour,
      handleChooseEndTimeMinute = _ref.handleChooseEndTimeMinute,
      startTimePickedArray = _ref.startTimePickedArray,
      endTimePickedArray = _ref.endTimePickedArray;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-select-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__date"
  }, startDatePickedArray.join('-')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__date"
  }, endDatePickedArray.join('-'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-select-options-wrapper"
  }, HOURS.map(function (i) {
    var item = (0, _const.formatDateString)(i);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: (0, _utils.cx)('react-minimal-datetime-range__time-select-option', item === startTimePickedArray[0] && 'active'),
      onClick: function onClick() {
        return handleChooseStartTimeHour(item);
      }
    }, item);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-select-options-wrapper"
  }, MINUTES.map(function (i) {
    var item = (0, _const.formatDateString)(i);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: (0, _utils.cx)('react-minimal-datetime-range__time-select-option', item === startTimePickedArray[1] && 'active'),
      onClick: function onClick() {
        return handleChooseStartTimeMinute(item);
      }
    }, item);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-select-options-wrapper"
  }, HOURS.map(function (i) {
    var item = (0, _const.formatDateString)(i);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: (0, _utils.cx)('react-minimal-datetime-range__time-select-option', item === endTimePickedArray[0] && 'active'),
      onClick: function onClick() {
        return handleChooseEndTimeHour(item);
      }
    }, item);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-select-options-wrapper"
  }, MINUTES.map(function (i) {
    var item = (0, _const.formatDateString)(i);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: (0, _utils.cx)('react-minimal-datetime-range__time-select-option', item === endTimePickedArray[1] && 'active'),
      onClick: function onClick() {
        return handleChooseEndTimeMinute(item);
      }
    }, item);
  })));
});
var _default = Index;
exports["default"] = _default;