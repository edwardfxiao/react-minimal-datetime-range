import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import 'babel-polyfill';
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import prefixAll from 'inline-style-prefix-all';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import CSS from '../src/css/example.css';
import ReactMinimalDatetimeRange from '../src/js/component/index.js';

const markdownTextboxEmptyExample = `
\`\`\`javascript
import ReactMinimalDatetimeRange from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';

...
const [password, setPassword] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const $wrapperRef = useRef(null);
const submit = useCallback(
  () => {
    if (password.length === 6) {
      alert('success');
    }
  },
  [password],
);
return
  (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
      style={{ maxWidth: '300px', margin: '0 auto' }}
    >

      <ReactMinimalDatetimeRange
        wrapperRef={$wrapperRef}
        id="password"
        codeLength={6}
        type="number"
        hide={true}
        value={password}
        onChange={res => {
          setPassword(res);
        }}
      />

      <input
        type="submit"
        className="submit-btn"
        onClick={() => {
          let isComplete = true;
          for (let index = 0; index < 6; index += 1) {
            if (typeof password[index] === 'undefined') {
              $wrapperRef.current.children[index].click();
              isComplete = false;
              break;
            }
          }
          if (!isComplete) {
            return;
          }
          submit();
        }}
      />
    </form>
  );
\`\`\`
`;

const CodeBlock = ({ literal, language }) => {
  var html = Prism.highlight(literal, Prism.languages[language]);
  var cls = 'language-' + language;

  return (
    <pre className={cls}>
      <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
    </pre>
  );
};

CodeBlock.propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string,
};

const Component = () => {
  const $passwordWrapperRef = useRef(null);
  const $pinWrapperRef = useRef(null);
  const $activationWrapperRef = useRef(null);
  const [showPickyDateTime, setShowPickyDateTime] = useState(true);
  const [hour, setHour] = useState('03');
  const [minute, setMinute] = useState('10');
  const [second, setSecond] = useState('10');
  const [meridiem, setMeridiem] = useState('PM');
  const [month, setMonth] = useState('01');
  const [date, setDate] = useState('30');
  const [year, setYear] = useState('2000');
  const onYearPicked = useCallback(() => {}, []);
  const onMonthPicked = useCallback(() => {}, []);
  const onDatePicked = useCallback(() => {}, []);
  const onResetDate = useCallback(() => {}, []);
  const onResetDefaultDate = useCallback(() => {}, []);
  const onSecondChange = useCallback(() => {}, []);
  const onMinuteChange = useCallback(() => {}, []);
  const onHourChange = useCallback(() => {}, []);
  const onMeridiemChange = useCallback(() => {}, []);
  const onResetTime = useCallback(() => {}, []);
  const onResetDefaultTime = useCallback(() => {}, []);
  const onClearTime = useCallback(() => {}, []);
  return (
    <div className={CSS['wrapper']}>
      <div className={CSS['nav']}>
        <div>
          <h2>
            <a href="#passwordSection">Example of password (type="alpha")</a>
          </h2>
        </div>
      </div>
      <div id="passwordSection" className={CSS['example-section']}>
        <div style={prefixAll({ flex: '0 0 50%' })}>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (password.length === 6) {
                alert('password success');
              }
            }}
          >
            <div>
              <div style={{ maxWidth: '300px', margin: '10px auto' }}>
                <h2>password (type="alpha")</h2>
              </div>
              <div>
                <ReactMinimalDatetimeRange
                  locale={`zh-cn`} // 'en-us' or 'zh-cn'; default is en-us
                  show={showPickyDateTime} //default is false
                  onClose={() => setShowPickyDateTime(false)}
                  defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
                  defaultDate={`${month}/${date}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
                  onYearPicked={res => onYearPicked(res)}
                  onMonthPicked={res => onMonthPicked(res)}
                  onDatePicked={res => onDatePicked(res)}
                  onResetDate={res => onResetDate(res)}
                  onResetDefaultDate={res => onResetDefaultDate(res)}
                  onSecondChange={res => onSecondChange(res)}
                  onMinuteChange={res => onMinuteChange(res)}
                  onHourChange={res => onHourChange(res)}
                  onMeridiemChange={res => onMeridiemChange(res)}
                  onResetTime={res => onResetTime(res)}
                  onResetDefaultTime={res => onResetDefaultTime(res)}
                  onClearTime={res => onClearTime(res)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// <Markdown source={markdownTextboxEmptyExample} renderers={{ CodeBlock }} />

ReactDOM.render(<Component />, document.getElementById('root'));
