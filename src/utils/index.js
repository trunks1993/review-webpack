/*
 * @Date: 2020-06-19 20:47:15
 * @LastEditTime: 2020-07-24 13:41:10
 */
import moment from 'moment';

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function flatTree(tree, flatArr = []) {
  func(tree, flatArr);
  return flatArr;
}

function func(tree, arr) {
  if (!tree.length) return;
  Array.prototype.push.apply(arr, tree);
  tree.map(
    (item) => item.children && item.children.length && func(item.children, arr)
  );
}

export function getQueryVariable(variable) {
  const query = window.location.hash.split('?')[1];
  if (!query) return;
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

export function formateTime(timeStr, formatStr) {
  return timeStr
    ? moment(timeStr).format(formatStr ? formatStr : 'YYYY-MM-DD HH:mm:ss')
    : '';
}

export const getFloat = (number, n) => {
  let num = parseFloat(number);
  n = n ? n : 0;
  if (n <= 0) {
    return Math.round(number);
  }
  num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // 四舍五入
  num = parseFloat(num).toFixed(n); // 补足位数
  return num;
};

export const getTimeDistance = (type) => {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  /** 今天 */
  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }
  /** 昨天 */
  if (type === 'yesterday') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [
      moment(now.getTime() - oneDay),
      moment(now.getTime() - oneDay + (oneDay - 1000)),
    ];
  }
  /** 本周 */
  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  /** 本月 */
  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(
        moment(
          `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
        ).valueOf() - 1000
      ),
    ];
  }
  /** 最近7天 */
  if (type === 'seven') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now.getTime() - oneDay * 6), moment(now)];
  }
  /** 最近30天 */
  if (type === 'thirty') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now.getTime() - oneDay * 29), moment(now)];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
};

export const fixedZero = (val) => {
  return val * 1 < 10 ? `0${val}` : val;
};
