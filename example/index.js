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
import '../src/css/example.css';
// import { CalendarPicker, RangePicker } from '../src/js/component/index.js';
import { CalendarPicker, RangePicker } from '../lib/components/index.js';
import '../src/js/component/react-minimal-datetime-range.css';
// import '../lib/react-minimal-datetime-range.min.css';
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
  const [showCalendarPicker, setShowCalendarPicker] = useState(true);
  const [hour, setHour] = useState('03');
  const [minute, setMinute] = useState('10');
  const [month, setMonth] = useState('01');
  const [date, setDate] = useState('30');
  const [year, setYear] = useState('2000');
  return (
    <div className={'wrapper'}>
      <div>
        <h3>CalendarPicker</h3>
      </div>
      <div className={'example-section'}>
        <div style={prefixAll({ flex: '0 0 60%' })}>
          <div style={{ marginBottom: '10px' }}>
            <div
              onClick={() => {
                setShowCalendarPicker(!showCalendarPicker);
              }}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              {!showCalendarPicker ? <span>Show CalendarPicker</span> : <span>Close CalendarPicker</span>}
            </div>
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
          </div>
        </div>
        <div style={prefixAll({ flex: '0 0 40%' })}>
          <Markdown
            source={`\`\`\`javascript
import { CalendarPicker } from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
  <CalendarPicker
    locale="en-us" // default is en-us
    show={showCalendarPicker} //default is false
    onClose={() => setShowCalendarPicker(false)}
    defaultDate={year + '-' + month + '-' + date} // OPTIONAL. format: "YYYY-MM-DD"
    onYearPicked={res => console.log(res)}
    onMonthPicked={res => console.log(res)}
    onDatePicked={res => console.log(res)}
    onResetDate={res => console.log(res)}
    onResetDefaultDate={res => console.log(res)}
    style={{ width: '300px', margin: '10px auto 0' }}
  />
 \`\`\``}
            renderers={{ CodeBlock }}
          />
        </div>
      </div>
      <div>
        <h3>RangePicker</h3>
      </div>
      <div className={'example-section'}>
        <div style={prefixAll({ flex: '0 0 60%' })}>
          <div style={{ marginBottom: '10px' }}>
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
          </div>
        </div>
        <div style={prefixAll({ flex: '0 0 40%' })}>
          <Markdown
            source={`\`\`\`javascript
import { RangePicker } from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
  <RangePicker
    locale="en-us" // default is en-us
    show={false} // default is false
    placeholder={['Start Time', 'End Time']}
    defaultDates={[year + '-' + month + '-' + date, year + '-' + month + '-' + date]}
    // ['YYYY-MM-DD', 'YYYY-MM-DD']
    defaultTimes={[hour + ':' + minute, hour + ':' + minute]}
    // ['hh:mm', 'hh:mm']
    onConfirm={res => console.log(res)}
    onClose={() => console.log('closed')}
    style={{ width: '300px', margin: '0 auto' }}
  />
 \`\`\``}
            renderers={{ CodeBlock }}
          />
        </div>
      </div>
    </div>
  );
};

// <Markdown source={markdownTextboxEmptyExample} renderers={{ CodeBlock }} />

ReactDOM.render(<Component />, document.getElementById('root'));
