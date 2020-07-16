/*
 * @Date: 2020-06-19 20:47:15
 * @LastEditTime: 2020-07-14 20:40:41
 */

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
