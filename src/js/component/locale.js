let locale = {
  'en-us': {
    today: 'Today',
    reset: 'Reset',
    'reset-date': 'Reset Date',
    clear: 'Clear',
    now: 'Now',
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    date: 'Select date',
    time: 'Select time',
    confirm: 'Confirm',
    start: 'Start',
    end: 'End',
  },
  'zh-cn': {
    today: '今天',
    reset: '重置',
    'reset-date': '重置日期',
    clear: '清零',
    now: '现在',
    weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    date: '选择日期',
    time: '选择时间',
    confirm: '确定',
    start: '开始',
    end: '结束',
  },
};

const getCustomLocale = (o, m) => {
  if (!o || typeof o !== 'object' || o.constructor !== Object || !Object.keys(o).length) {
    console.error('wrong structure');
    return false;
  }
  Object.keys(o).map(i => {
    if (!m[i]) {
      m[i] = o[i];
    } else {
      if (Object.keys(o[i]).length) {
        Object.keys(o[i]).map(j => {
          m[i][j] = o[i][j];
        });
      }
    }
  });
  return m;
};

const handleCustomLocale = (locale, w) => {
  let res;
  if (typeof w !== 'undefined') {
    if (w.REACT_MINIMAL_DATETIME_RANGE && w.REACT_MINIMAL_DATETIME_RANGE['customLocale']) {
      res = getCustomLocale(w.REACT_MINIMAL_DATETIME_RANGE['customLocale'], locale);
    }
  }
  if (typeof res === 'undefined' || res === false) {
    return locale;
  }
  return res;
};

if (typeof window !== 'undefined') {
  window.REACT_MINIMAL_DATETIME_RANGE = window.REACT_MINIMAL_DATETIME_RANGE || {};
  locale = handleCustomLocale(locale, window);
}

export default locale;
