/*
 * @Date: 2020-05-29 14:30:17
 * @LastEditTime: 2020-05-29 14:34:29
 */

const path = require("path");

exports.resolve = function (dir) {
  return path.resolve(__dirname, dir);
};
