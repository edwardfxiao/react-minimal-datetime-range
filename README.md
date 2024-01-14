# react-minimal-datetime-range
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![npm version](https://badge.fury.io/js/react-minimal-datetime-range.svg)](https://badge.fury.io/js/react-minimal-datetime-range) ![Cdnjs](https://img.shields.io/cdnjs/v/react-minimal-datetime-range) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-minimal-datetime-range.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edwardfxiao/react-minimal-datetime-range/master/LICENSE) [![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE) [![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

A react component for date time range picker. Online demo examples.
# <img src="https://raw.githubusercontent.com/edwardfxiao/react-minimal-datetime-range/master/react-minimal-datetime-range.gif" />

# Online Demo
<a href="https://edwardfxiao.github.io/react-minimal-datetime-range/">Online demo example</a>

<a href="https://github.com/edwardfxiao/react-minimal-datetime-range/blob/gh-pages/example/index.js">Demo source code</a>

# Codesandbox Examples
* <a href="https://codesandbox.io/s/index-z90y9">Live playground</a> (Make sure window width is greater than 900 for better experience)
* <a href="https://codesandbox.io/s/custom-locale-ylvtr">Example of custom locales</a> (when providing ```window.REACT_MINIMAL_DATETIME_RANGE['customLocale']```)

# Docs Link
[Custom Locale Guide(can be multiple locales)](#custom-locale)

### Version of ```16.8.6``` or higher of react and react-dom is required.
```js
  "peerDependencies": {
    "react": ">= 16.8.6",
    "react-dom": ">= 16.8.6"
  }
```

# Installation
```sh
npm install react-minimal-datetime-range --save
```
#### By CDN (starting from v2.0.0)
```html
<head>
 ...
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-minimal-datetime-range/2.0.6/react-minimal-datetime-range.min.css" />
</head>
<body>
 <div id="root"></div>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react-minimal-datetime-range/2.0.6/react-minimal-datetime-range.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script>
 <script type="text/babel">
    const App = React.memo(() => {
      return (<RangePicker .../>)
    });
    ReactDOM.render(<App />, document.getElementById('root'));
 </script>
</body>


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
  locale={`en-us`} // ['en-us', 'zh-cn','ko-kr']; default is en-us
  show={showCalendarPicker} //default is false
  allowPageClickToClose={true} // default is true
  onClose={() => setShowCalendarPicker(false)}
  defaultDate={year + '-' + month + '-' + date} // OPTIONAL. format: "YYYY-MM-DD"
  onYearPicked={res => console.log(res)}
  onMonthPicked={res => console.log(res)}
  onDatePicked={res => console.log(res)}
  onResetDate={res => console.log(res)}
  onResetDefaultDate={res => console.log(res)}
  style={{ width: '300px', margin: '10px auto 0' }}
  // markedDates={[`${todayY}-${todayM}-${todayD - 1}`, `${todayY}-${todayM}-${todayD}`]} // OPTIONAL. ['YYYY-MM-DD']
  // supportDateRange={[`2022-02-16`, `2022-12-10`]} // "YYYY-MM-DD"
  // defaultTimes={['10:12']} // OPTIONAL
  // enableTimeSelection={true} // OPTIONAL
  // handleChooseHourPick={res => console.log(res)} // OPTIONAL
  // handleChooseMinutePick={res => console.log(res)} // OPTIONAL
/>

<RangePicker
  locale="en-us"// ['en-us', 'zh-cn','ko-kr']; default is en-us
  show={false} // default is false
  disabled={false} // default is false
  allowPageClickToClose={true} // default is true
  onConfirm={res => console.log(res)}
  onClose={() => console.log('onClose')}
  onClear={() => console.log('onClear')}
  style={{ width: '300px', margin: '0 auto' }}
  placeholder={['Start Time', 'End Time']}
  // markedDates={[`${todayY}-${todayM}-${todayD - 1}`, `${todayY}-${todayM}-${todayD}`]} // OPTIONAL. ['YYYY-MM-DD']
  showOnlyTime={false} // default is false, only select time
  // duration={2} // day count. default is 0. End date will be automatically added 2 days when the start date is picked.
  // onChooseDate={res => {}} // on date clicked
  ////////////////////
  // IMPORTANT DESC //
  ////////////////////
  defaultDates={[year+'-'+month+'-'+date,year+'-'+month+'-'+date]}
  // ['YYYY-MM-DD', 'YYYY-MM-DD']
  // This is the value you choosed every time.
  defaultTimes={[hour+':'+minute,hour+':'+minute]}
  // ['hh:mm', 'hh:mm']
  // This is the value you choosed every time.
  initialDates={[year+'-'+month+'-'+date,year+'-'+month+'-'+date]}
  // ['YYYY-MM-DD', 'YYYY-MM-DD']
  // This is the initial dates.
  // If provied, input will be reset to this value when the clear icon hits,
  // otherwise input will be display placeholder
  initialTimes={[hour+':'+minute,hour+':'+minute]}
  // ['hh:mm', 'hh:mm']
  // This is the initial times.
  // If provied, input will be reset to this value when the clear icon hits,
  // otherwise input will be display placeholder
/>
```


### <a name="custom-locale"></a>Custom Locale (can be multiple locales)
By providing ```window.REACT_MINIMAL_DATETIME_RANGE['customLocale']```, you can overwrite the current locale if you like or add a new locale.

<a href="https://codesandbox.io/s/custom-locale-ylvtr">codesandbox example</a>(located in index.html)

```html
        <script type="text/javascript">
        window.REACT_MINIMAL_DATETIME_RANGE = {
            customLocale: {
                "my-own-locale": {...},//structure must follow below
                'es': {
                    weeks: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    date: 'Select date',
                    time: 'Select time',
                    confirm: 'Confirm',
                    start: 'Start',
                    end: 'End',
                    date_format: (month, year) => {
                      return `${month} ${year}`;
                    },
                }
            }
        }
        </script>
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
   <td align="center"><a href="https://github.com/edwardfxiao"><img src="https://avatars.githubusercontent.com/u/11728228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Edward Xiao</b></sub></a><br /><a href="https://github.com/edwardfxiao/react-minimal-datetime-range/commits?author=edwardfxiao" title="Code">💻</a> <a href="https://github.com/edwardfxiao/react-minimal-datetime-range/commits?author=edwardfxiao" title="Documentation">📖</a> <a href="#infra-edwardfxiao" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/edwardfxiao/react-minimal-datetime-range/commits?author=edwardfxiao" title="Tests">⚠️</a> <a href="https://github.com/edwardfxiao/react-minimal-datetime-range/pulls?q=is%3Apr+reviewed-by%3Aedwardfxiao" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/ryush00"><img src="https://avatars.githubusercontent.com/u/4997174?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ryush00</b></sub></a><br /><a href="https://github.com/edwardfxiao/react-minimal-datetime-range/commits?author=ryush00" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
