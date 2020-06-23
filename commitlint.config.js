/*
 * @Date: 2020-06-23 19:33:33
 * @LastEditTime: 2020-06-23 20:23:42
 */

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
