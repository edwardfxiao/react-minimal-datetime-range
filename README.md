# react-minimal-datetime-range
[![npm version](https://badge.fury.io/js/react-minimal-datetime-range.svg)](https://badge.fury.io/js/react-minimal-datetime-range) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-minimal-datetime-range.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edwardfhsiao/react-minimal-datetime-range/master/LICENSE)[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

React verify or password code entering component. Online demo examples.
# <img src="https://raw.githubusercontent.com/edwardfhsiao/react-minimal-datetime-range/master/react-minimal-datetime-range.gif" />

# Online Demo
<a href="https://edwardfhsiao.github.io/react-minimal-datetime-range/">Online demo example</a>

<a href="https://github.com/edwardfhsiao/react-minimal-datetime-range/blob/gh-pages/example/index.js">Demo source code</a>

# Codesandbox Examples
* <a href="https://codesandbox.io/s/index-z90y9">Examples</a>

### Version of ```16.8.6``` or higher of react and react-dom is required.
```js
  "peerDependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
```

# Installation
```sh
npm install react-minimal-datetime-range --save
```
# Donation
<a href="https://www.paypal.me/XIAOMENGXIAO/0.99" target="_blank" alt="PayPal Donate">Thanks for donating me a donut!&nbsp;&nbsp;⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</a>

# Browser support
Tested on IE9+ and Chrome and Safari(10.0.3)

# Docs

```js
import { CalendarPicker, RangePicker } from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';

<CalendarPicker
  locale={`en-us`} // 'en-us' or 'zh-cn'; default is en-us
  show={showCalendarPicker} //default is false
  onClose={() => setShowCalendarPicker(false)}
  defaultDate={year + '-' + month + '-' + date} // OPTIONAL. format: "MM/DD/YYYY"
  onYearPicked={res => console.log(res)}
  onMonthPicked={res => console.log(res)}
  onDatePicked={res => console.log(res)}
  onResetDate={res => console.log(res)}
  onResetDefaultDate={res => console.log(res)}
  style={{ width: '300px', margin: '10px auto 0' }}
/>

<RangePicker
  locale={`en-us`} // default is en-us
  show={false} // default is false
  placeholder={['Start Time', 'End Time']}
  defaultDates={[year + '-' + month + '-' + date, year + '-' + month + '-' + date]} // ['YYYY-MM-DD', 'YYYY-MM-DD']
  defaultTimes={[hour + ':' + minute, hour + ':' + minute]} // ['hh:mm', 'hh:mm']
  onConfirm={res => console.log(res)}
  onClose={() => console.log('closed')}
  style={{ width: '300px', margin: '0 auto' }}
/>
```

