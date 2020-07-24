/*
 * @Author: Dad
 * @Date: 2020-07-24 12:51:01
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-24 15:07:04
 */

import React, { memo } from 'react';
import { Card, DatePicker } from 'antd';
import Bar from '@/components/Bar';
/** 资金趋势 */
const { RangePicker } = DatePicker;

const charts = memo(
  ({
    rangePickerValue,
    salesData,
    handleRangePickerChange,
    isActive,
    selectDate,
  }) => (
    <Card
      bodyStyle={{ padding: 0 }}
      title={<span className="home-content--left">资金趋势</span>}
      bordered={false}
      extra={
        <div>
          <div className="salesExtra">
            <a
              className={isActive('today')}
              onClick={() => selectDate('today')}
            >
              今日
            </a>
            <a className={isActive('week')} onClick={() => selectDate('week')}>
              本周
            </a>
            <a
              className={isActive('month')}
              onClick={() => selectDate('month')}
            >
              本月
            </a>
            <a className={isActive('year')} onClick={() => selectDate('year')}>
              全年
            </a>
          </div>
          <RangePicker
            value={rangePickerValue}
            onChange={handleRangePickerChange}
            style={{ width: 256 }}
            placeholder={['开始日期','结束日期']}
          />
        </div>
      }
      size="large"
    >
      <div className="salesBar">
        <Bar height={248} data={salesData} data1={salesData} />
      </div>
    </Card>
  )
);
export default charts;
