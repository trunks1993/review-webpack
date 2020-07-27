/*
 * @Date: 2020-05-29 14:30:17
 * @LastEditTime: 2020-07-27 19:35:22
 */

const path = require("path");

exports.cdnBaseHttp = "https://cdn.bootcss.com";
exports.externalConfig = [
  { name: "react", scope: "React", js: "react.production.min.js" },
];

exports.resolve = function (dir) {
  return path.resolve(__dirname, dir);
};
