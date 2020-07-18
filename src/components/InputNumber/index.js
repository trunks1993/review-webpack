/*
 * @Date: 2020-07-17 19:17:43
 * @LastEditTime: 2020-07-17 21:02:43
 */

import React, { useState } from "react";
import { Icon } from "antd";
const InputNumber = (props) => {
  const { min, max, defaultValue, onChange } = props;
  const ref = React.createRef();
  const [currentValue, setCurrentValue] = useState(defaultValue || "");

  const handleBlur = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      if (defaultValue && defaultValue % 1 === 0) {
        value = defaultValue;
      } else if (min && min % 1 === 0) {
        value = min;
      } else if (max && max % 1 === 0) {
        value = max;
      } else {
        value = "";
      }
    } else {
      if (min && value < min) {
        value = min;
      } else if (max && value > max) {
        value = max;
      }
    }
    ref.current.value = value;
    setCurrentValue(value);
    onChange && onChange(value);
  };

  const handleChange = (num) => {
    let value = parseInt(ref.current.value) + num;
    if (min && value < min) {
      value = min;
    } else if (max && value > max) {
      value = max;
    }
    ref.current.value = value;
    setCurrentValue(value);
    onChange && onChange(value);
  };

  return (
    <div className="input-number">
      <span
        className={`input-number-minus ${
          currentValue === min ? "disabled" : ""
        }`}
        onClick={currentValue === min ? () => {} : () => handleChange(-1)}
      >
        <Icon type="minus" />
      </span>
      <input
        className="input-number-input"
        defaultValue={defaultValue}
        onBlur={handleBlur}
        ref={ref}
      />
      <span
        className={`input-number-plus ${
          currentValue === max ? "disabled" : ""
        }`}
        onClick={currentValue === max ? () => {} : () => handleChange(1)}
      >
        <Icon type="plus" />
      </span>
    </div>
  );
};

export default InputNumber;
