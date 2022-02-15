interface IObjectKeys {
  [key: string]: object;
}
let locale: IObjectKeys = {
  'en-us': {
    today: 'Today',
    reset: 'Reset',
    'reset-date': 'Reset Date',
    clear: 'Clear',
    now: 'Now',
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    date_format: (month: Number, year: Number) => {
      return `${month} ${year}`;
    },
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
    date_format: (month: Number, year: Number) => {
      return `${year} ${month}`;
    },
    date: '选择日期',
    time: '选择时间',
    confirm: '确定',
    start: '开始',
    end: '结束',
  },
  'ko-kr': {
    today: '오늘',
    reset: '초기화',
    'reset-date': '날짜 초기화',
    clear: '지우기',
    now: '지금',
    weeks: ['일', '월', '화', '수', '목', '금', '토'],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    date_format: (month: Number, year: Number) => {
      return `${year}년 ${month}`;
    },
    date: '날짜 선택',
    time: '시간 선택',
    confirm: '확인',
    start: '시작',
    end: '끝',
  },
};

const getCustomLocale = (o: any, m: any) => {
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

declare global {
  interface Window {
    REACT_MINIMAL_DATETIME_RANGE: any;
  }
}

const handleCustomLocale = (locale: any, w: Window) => {
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
