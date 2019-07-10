export const cx = (...params) => {
  const classes = [];
  for (let i = 0; i < params.length; i += 1) {
    const arg = params[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = cx.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
};

export const isValidDate = function(value, userFormat) {
  userFormat = userFormat || 'mm/dd/yyyy';
  const delimiter = /[^mdy]/.exec(userFormat)[0];
  const theFormat = userFormat.split(delimiter);
  const theDate = value.split(delimiter);
  function isDate(date, format) {
    let m,
      d,
      y,
      i = 0,
      len = format.length,
      f;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return (
      m > 0 &&
      m < 13 &&
      y &&
      y.length === 4 &&
      d > 0 &&
      // Is it a valid day of the month?
      d <= new Date(y, m, 0).getDate()
    );
  }
  return isDate(theDate, theFormat);
};