/*
 * @Author: Dad
 * @Date: 2020-07-13 14:20:06
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-31 17:40:34
 */
import React, { useState, useEffect } from 'react';
import MapForm from '@/components/MapForm';
import { getFloat } from '@/utils';
import { connect } from 'dva';
import {
  TransactionTypes,
  TransaStatus,
  TRANSA_STATUS_5,
  TRANSTEMP,
  PRECISION,
} from '@/const';
import moment from 'moment';
import _ from 'lodash';
import { Select, Form, Button, Table, Pagination, Row, Col } from 'antd';
import noData from '@/assets/images/operations/unData.png';

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
    const time = {
      beginCreateTime: data.CreateTime?.[0]
        ? moment(data.CreateTime?.[0]).format('YYYY-MM-DD 00:00:00')
        : undefined,
      endCreateTime: data.CreateTime?.[0]
        ? moment(data.CreateTime?.[1]).format('YYYY-MM-DD 23:59:59')
        : undefined,
    };
    dispatch({
      type: 'transaction/fetchList',
      queryParams: {
        currPage,
        pageSize,
        ...time,
        ...data,
      },
    });
  };

  /** 表头 */
  const columns = [
    {
      title: '交易时间',
      align: 'center',
      className: 'jiaoyiTime',
      dataIndex: 'createTime',
      width: 200,
      render: (createTime) => (
        <div>{moment(createTime).format('YYYY-MM-DD hh:mm:ss')}</div>
      ),
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
      width: 140,
      dataIndex: 'totalPay',
      render: (totalPay) => getFloat(totalPay / TRANSTEMP, PRECISION),
    },
    {
      title: '交易类型',
      align: 'center',
      dataIndex: 'bizType',
      width: 100,
      render: (bizTypes) => TransactionTypes[bizTypes],
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
      fixed: 'right',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        if (status === TRANSA_STATUS_5)
          return <div style={{ color: 'red' }}>失败</div>;
        return TransaStatus[status];
      },
    },
  ];

  return (
    <div className="order">
      <div className="shop-item_header">{'交易管理 > 交易订单'}</div>
      <div className="order-info">
        <MapForm layout="horizontal" onCreate={(form) => setForm(form)}>
          <Row>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
              <CstSelect
                label="交易类型"
                name="bizType"
                customProps={{
                  placeholder: '请选择交易类型',
                  size: 'large',
                }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                {_.map(TransactionTypes, (item, key) => (
                  <Select.Option key={key} value={parseInt(key)}>
                    {item}
                  </Select.Option>
                ))}
              </CstSelect>
            </Col>
            <Col span={8}>
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
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <CstInput
                label="外部订单号"
                name="customerOrderNo"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                customProps={{
                  placeholder: '请输入外部订单号',
                  size: 'large',
                }}
              />
            </Col>
            <Col span={8}>
              <CstRangePicker
                label="交易时间"
                name="CreateTime"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                customProps={{
                  placeholder: ['开始时间', '结束时间'],
                  size: 'large',
                }}
              />
            </Col>
            <Col span={7} offset={1}>
              <Form.Item>
                <Button
                  icon="search"
                  type="primary"
                  onClick={() => dispatchInit()}
                  style={{ width: 92 }}
                >
                  查询
                </Button>
                <Button
                  icon="undo"
                  style={{ marginLeft: '20px', width: 92 }}
                  onClick={() => form?.resetFields()}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </MapForm>
      </div>
      <Table
        loading={loading}
        dataSource={list}
        columns={columns}
        pagination={false}
        className="global-table"
        onHeaderRow={() => ({
          className: 'global-table_head-tr',
        })}
        locale={{
          emptyText: (
            <div className="cash-flow_empty">
              <img width="218px" height="134px" src={noData} />
              <p className="cash-flow_empty-text">暂无交易订单信息</p>
            </div>
          ),
        }}
        scroll={{ x: 1300, y: 'calc(100vh - 480px)' }}
      />
      {_.isEmpty(list) ? null : (
        <div className="cash-flow_pagination">
          <Pagination
            disabled={loading}
            current={currPage}
            onChange={(currPage) => setCurrPage(currPage)}
            defaultPageSize={pageSize}
            total={total}
          />
          <span style={{ color: '#CCCCCC', marginLeft: '10px' }}>
            共 {total} 条 ,每页 {pageSize} 条
          </span>
        </div>
      )}
    </div>
  );
};

export default connect(({ transaction: { list, total } = {}, loading }) => ({
  list,
  total,
  loading: loading.effects['transaction/fetchList'],
}))(Order);
