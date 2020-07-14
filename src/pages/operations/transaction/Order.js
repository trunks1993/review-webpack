/*
 * @Author: Dad
 * @Date: 2020-07-13 14:20:06
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-14 09:04:39
 */
import React, { useState, useEffect } from 'react';
import MapForm from '@/components/MapForm';
import { connect } from 'dva';
import { ORDER_TYPE_ALL, ORDER_STATUS_ALL } from '@/const';
import moment from 'moment';
import _ from 'lodash';
import { Select, Form, Button, Table, Pagination } from 'antd';

const { CstInput, CstSelect, CstRangePicker } = MapForm;

const Order = ({ dispatch, list, total, loading }) => {
  const [form, setForm] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    initList();
  }, [form]);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    initList();
  }, [currPage]);

  const dispatchInit = () => {
    currPage === 1 ? initList() : setCurrPage(1);
  };

  const initList = () => {
    const data = form?.getFieldsValue();
    dispatch({
      type: 'transaction/fetchList',
      queryParams: {
        currPage,
        pageSize,
        beginCreateTime: moment(data.CreateTime?.[0]).format('YYYY-MM-DD HH:MM:SS'),
        endCreateTime: moment(data.CreateTime?.[1]).format('YYYY-MM-DD HH:MM:SS'),
        ...data,
      },
    });
  };

  /** 表头 */
  const columns = [
    {
      title: '交易时间',
      align: 'left',
      className: 'jiaoyiTime',
      dataIndex: 'createTime',
      width: 180,
      render: createTime => <div>{moment(createTime).format('YYYY-MM-DD hh:mm:ss')}</div>,
    },
    {
      title: '交易订单号',
      align: 'center',
      width: 140,
      dataIndex: 'orderId',
    },
    {
      title: '外部订单号',
      align: 'center',
      width: 240,
      dataIndex: 'customerOrderNo',
    },
    {
      title: '交易金额(元)',
      align: 'center',
      width: 120,
      dataIndex: 'totalPay',
      render: totalPay => totalPay / 10000,
    },
    {
      title: '交易类型',
      align: 'center',
      dataIndex: 'bizType',
      width: 100,
      render: bizTypes => ORDER_TYPE_ALL[bizTypes]
    },
    {
      title: '商品',
      align: 'center',
      width: 200,
      dataIndex: 'goodsName',
    },
    {
      title: '充值账号',
      align: 'center',
      width: 140,
      dataIndex: 'rechargeAccount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        if (status === 5) return <div style={{ color: 'red' }}>失败</div>;
        return ORDER_STATUS_ALL[status];
      },
    },
  ];

  return (
    <div className="order">
      <div className="orderInfo">
        <MapForm
          layout="inline"
          className="filter-form"
          onCreate={(form) => setForm(form)}
        >
          <CstInput
            label="交易订单号"
            name="tradeOrderId"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            customProps={{
              placeholder: '请输入交易订单号',
              size: 'large',
            }}
          />
          <CstSelect
            label="交易类型"
            name="bizType"
            style={{ width: 260 }}
            customProps={{
              placeholder: '请输入交易类型',
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {_.map(ORDER_TYPE_ALL, (item, key) => (
              <Select.Option key={key} value={parseInt(key)}>
                {item}
              </Select.Option>
            ))}
          </CstSelect>
          <CstInput
            label="商品"
            name="goodsName"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            customProps={{
              placeholder: '请输入商品',
              size: 'large',
            }}
          />
          <CstInput
            label="外部订单号"
            name="customerOrderNo"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            customProps={{
              placeholder: '请输入交易订单号',
              size: 'large',
            }}
          />
          <CstRangePicker
            label="交易时间"
            name="CreateTime"
            style={{ width: 360 }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            customProps={{
              placeholder: ['开始时间','结束时间'],
              size: 'large',
            }}
          />
          <Form.Item>
            <Button icon="search" className="filter_button--blue" onClick={() => initList()}>
                  查询
            </Button>
            <Button
              icon="undo"
              className="filter_button--white"
              onClick={() => form?.resetFields()}
            >
                  重置
            </Button>
          </Form.Item>
        </MapForm>
      </div>
      <Table dataSource={list} columns={columns} pagination={false} scroll={{ x: 1400 }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Pagination
          disabled={loading}
          current={currPage}
          defaultPageSize={pageSize}
          total={total}
        />
        <span style={{ color: '#CCCCCC', marginLeft: '10px' }}>
          共{total}条
        </span>
      </div>
    </div>
  );
};

export default connect(({ transaction: { list, total } = {}, loading }) => ({
  list,
  total,
  loading: loading.effects['transaction/fetchList']
}))(Order);
