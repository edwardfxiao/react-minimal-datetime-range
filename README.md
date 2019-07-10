# react-minimal-datetime-range
[![npm version](https://badge.fury.io/js/react-minimal-datetime-range.svg)](https://badge.fury.io/js/react-minimal-datetime-range) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-minimal-datetime-range.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edwardfhsiao/react-minimal-datetime-range/master/LICENSE)[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

React verify or password code entering component. Online demo examples.
# <img src="https://raw.githubusercontent.com/edwardfhsiao/react-minimal-datetime-range/master/react-minimal-datetime-range.gif" />
# Online Demo
<a href="https://edwardfhsiao.github.io/react-minimal-datetime-range/">Online demo example</a>

<a href="https://github.com/edwardfhsiao/react-minimal-datetime-range/blob/gh-pages/example/index.js">Demo source code</a>

# Codesandbox Examples
* <a href="https://codesandbox.io/s/index-6hnbf">Examples</a>

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

|Props                        |       |Type         |Description                                    |Default          |
|---                          |---    |---          |---                                            |  ---            |
|initialFocus                 |  Opt  |  Bool       |Options are ['false', 'true']                  |  false          |
|wrapperRef                   |  Req  |  React Ref  |                                               |  none           |
|codeLength                   |  Req  |  Number     |                                               |  6              |
|id                           |  Req  |  Str        |                                               |  random ID      |
|onChange                     |  Req  |  Func       |                                               |  none           |
|type                         |  Opt  |  Default    |Options are ['alphanumeric', 'alpha', 'number']|  "alphanumeric" |
|letterCase                   |  Opt  |  Str        |Options are ['upper', 'lower']                 |  "upper"        |
|value                        |  Req  |  Str        |                                               |  ""             |
|hide                         |  Opt  |  Bool       |Options are ['false', 'true']                  |  false          |
|focusColor                   |  Opt  |  Str        |                                               |  "007bff"       |
|classNameComponent           |  Opt  |  Str        |                                               |  ""             |
|classNameWrapper             |  Opt  |  Str        |                                               |  ""             |
|classNameCodeWrapper         |  Opt  |  Str        |                                               |  ""             |
|classNameEnteredValue        |  Opt  |  Str        |                                               |  ""             |
|classNameCode                |  Opt  |  Str        |                                               |  ""             |
|classNameCodeWrapperFocus    |  Opt  |  Str        |                                               |  {}             |
|customStyleComponent         |  Opt  |  Obj        |                                               |  {}             |
|customStyleWrapper           |  Opt  |  Obj        |                                               |  {}             |
|customStyleCodeWrapper       |  Opt  |  Obj        |                                               |  {}             |
|customStyleEnteredValue      |  Opt  |  Obj        |                                               |  {}             |
|customStyleCode              |  Opt  |  Obj        |                                               |  {}             |
|customStyleCodeWrapperFocus  |  Opt  |  Obj        |                                               |  {}             |



```js
import ReactCodesInput from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';


<ReactCodesInput
  initialFocus="" // Opt. Bool. Default false. Options are ['false', 'true'].
  wrapperRef="" // Req. React Ref. Default none.
  codeLength="" // Req. Number. Default 6.
  id="" // Req. Str. Default random ID.
  onChange="" // Req. Func. Default none.
  type="" // Opt. Str. Default "alphanumeric". Options are ['alphanumeric', 'alpha', 'number'].
  letterCase="upper" // Opt. Str. Default "upper". Options are ['upper', 'lower'].
  value="" // Req. Str. Default "".
  hide={false} // Opt. Bool. Default false. Options are ['false', 'true'].
  focusColor="" // Opt. Str. Default "007bff".
  classNameComponent="" // Opt. Str. Default "".
  classNameWrapper="" // Opt. Str. Default "".
  classNameCodeWrapper="" // Opt. Str. Default "".
  classNameEnteredValue="" // Opt. Str. Default "".
  classNameCode="" // Opt. Str. Default "".
  classNameCodeWrapperFocus="" // Opt. Str. Default {}.
  customStyleComponent={} // Opt. Obj. Default {}.
  customStyleWrapper={} // Opt. Obj. Default {}.
  customStyleCodeWrapper={} // Opt. Obj. Default {}.
  customStyleEnteredValue={} // Opt. Obj. Default {}.
  customStyleCode={} // Opt. Obj. Default {}.
  customStyleCodeWrapperFocus={} // Opt. Obj. Default {}.
/>
```

