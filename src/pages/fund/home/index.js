/*
 * @Date: 2020-07-22 20:19:58
 * @LastEditTime: 2020-07-24 19:05:54
 */

import React, { useState, useEffect } from 'react';
import JINBI from '@/assets/images/fund/jinbi.png';
import { Row, Col, Tag, Button, Tabs, Table } from 'antd';
import Charts from './charts';
import { getTimeDistance, getFloat } from '@/utils';
import { searchAccountTrace, getUnpaidOrderNum } from '@/services/home';
import { createHashHistory } from 'history';
import { connect } from 'dva';
const history = createHashHistory();
import {
  TRANSTEMP,
  PRECISION,
  financialFlowBillTypes,
  financialFlowBizTypes,
} from '@/const';

const salesData = [
  { x: '1月', y: 5 },
  { x: '2月', y: 10 },
  { x: '3月', y: 15 },
  { x: '4月', y: 20 },
  { x: '5月', y: 25 },
  { x: '6月', y: 30 },
  { x: '7月', y: 10 },
  { x: '8月', y: 20 },
  { x: '9月', y: 30 },
  { x: '10月', y: 25 },
  { x: '11月', y: 25 },
  { x: '12月', y: 30 },
];
const home = ({ list: { amount, frozeAmount } }) => {
  const [rangePickerValue, setRangePickerValue] = useState('');
  const [tabKey, setTabKey] = useState('2');
  const [payOrder, setPayOrder] = useState('');
  const [financeList, setFinanceList] = useState();

  useEffect(() => {
    getAccountTrace();
  }, [tabKey]);

  useEffect(() => {
    getPayOrder();
  }, []);

  /** 更新时间 */
  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type));
  };

  /** 点击事件 */
  const isActive = (type) => {
    const value = getTimeDistance(type);
    if (!rangePickerValue?.[0] || !rangePickerValue?.[1]) {
      return '';
    }
    if (
      rangePickerValue?.[0].isSame(value[0], 'day') &&
      rangePickerValue?.[1].isSame(value[1], 'day')
    ) {
      return 'currentDate';
    }
    return '';
  };

  /** 手动更新时间 */
  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  /** 获取收支记录 */
  const getAccountTrace = async() => {
    const obj = { currPage: 1, pageSize: 50, type: tabKey };
    try {
      const [err, data, msg] = await searchAccountTrace(obj);
      if (!err) setFinanceList(data.list);
    } catch (error) {}
  };

  /** 获取待支付订单 */
  const getPayOrder = async () => {
    try {
      const [err, data, msg] = await getUnpaidOrderNum();
      if (!err) setPayOrder(data);
    } catch (error) {}
  };

  /** 表头 */
  const columns = [
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      width: '18%',
      render: (createTime) => {
        return <div>{getDate(createTime)}</div>;
      },
    },
    {
      title: '交易订单号',
      align: 'center',
      dataIndex: 'orderNo',
    },
    {
      title: '交易类型',
      align: 'center',
      width: '10%',
      dataIndex: 'bizType',
      render: (bizType) => {
        return <div>{financialFlowBizTypes[bizType]}</div>;
      },
    },
    {
      title: '收支类型',
      align: 'center',
      width: '10%',
      dataIndex: 'type',
      render: (val) => {
        if (val === 1) {
          return (
            <div style={{ color: '#D70000' }}>
              {financialFlowBillTypes?.[val]}
            </div>
          );
        }
        return (
          <div style={{ color: '#1A61DC' }}>
            {financialFlowBillTypes?.[val]}
          </div>
        );
      },
    },
    {
      title: '金额(元)',
      align: 'center',
      dataIndex: 'changeAmount',
      render: (changeAmount) => {
        return (
          <div className="money">
            {getFloat(changeAmount?.price / TRANSTEMP, PRECISION)}
          </div>
        );
      },
    },
    {
      title: '余额(元)',
      align: 'center',
      dataIndex: 'amount',
      render: (amount) => {
        return (
          <div className="money">
            {getFloat(amount?.price / TRANSTEMP, PRECISION)}
          </div>
        );
      },
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
    },
  ];

  return (
    <div className="home">
      <Row>
        <Col span={12}>
          <div className="home-left">
            <div className="home-title">账户余额</div>
            <div className="home-left--number">
              <img src={JINBI} alt="" style={{ marginRight: 10 }} />
              <span>账户可用余额(元)</span>
              <Tag className="home-left--tag">
                冻结￥
                {frozeAmount ? getFloat(frozeAmount / TRANSTEMP, PRECISION) : 0.00}
              </Tag>
            </div>
            <div className="home-left--money">
              ￥{amount ? getFloat(amount / TRANSTEMP, PRECISION) : 0.00}
            </div>
            <Button
              className="home-left--btn"
              onClick={() => {
                history.push('/admin/fund/recharge');
              }}
              type="primary"
            >
              充值
            </Button>
            <Button
              className="home-left--btn"
              style={{ border: '1px solid #1a61dc', color: '#1a61dc' }}
              onClick={() => {
                history.push('/admin/fund/cashOut');
              }}
            >
              提现
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <Row align="middle" className="home-right">
            <div className="home-title">财务提醒</div>
            <Col span={8} className="home-right--col">
              <span className="home-right--title">可索取发票</span>
              <div>
                <span>￥</span>
                {'0.00'}
                <span>元</span>
              </div>
            </Col>
            <Col span={8} className="home-right--col">
              <span className="home-right--title">待支付订单</span>
              <div>
                {payOrder}
                <span>个</span>
              </div>
            </Col>
            <Col span={8} className="home-right--col">
              <span className="home-right--title">待对账</span>
              <div>
                {'0'}
                <span>笔</span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="home-content">
        <Charts
          selectDate={selectDate}
          isActive={isActive}
          salesData={salesData}
          rangePickerValue={rangePickerValue}
          handleRangePickerChange={handleRangePickerChange}
        />
      </div>
      <div className="home-footer">
        <Tabs
          style={{ marginTop: -14 }}
          defaultActiveKey={tabKey}
          onChange={(key) => setTabKey(key)}
          tabBarExtraContent={
            <div className="home-footer--title">明细数据</div>
          }
        >
          <Tabs.TabPane tab={<div>支出</div>} key="2">
            <Table
              className="global-table"
              onHeaderRow={() => ({
                className: 'global-table_head-tr',
              })}
              pagination={false}
              dataSource={financeList}
              columns={columns}
              scroll={{ y: 260 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="收入" key="1">
            <Table
              className="global-table"
              dataSource={financeList}
              columns={columns}
              pagination={false}
              className="global-table"
              onHeaderRow={() => ({
                className: 'global-table_head-tr',
              })}
              scroll={{ y: 260 }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default connect(({ account }) => ({
  list: account.amountInfo,
}))(home);
