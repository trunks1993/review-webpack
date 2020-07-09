/*
 * @Date: 2020-07-01 15:06:53
 * @LastEditTime: 2020-07-04 10:13:24
 */
import React, { useState } from 'react';
import MapForm from '@/components/MapForm';
const { CstInput, CstSelect, CstRangePicker } = MapForm;
import { TRANSACTION_TYPE_ALL, TRANSACTION_STATUS_ALL, DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@/const';
import _ from 'lodash';
import { Select, Table, Pagination, Button, Form, Row, Col } from 'antd';
import { connect } from 'dva';

const transaction = () => {
  const [form, setForm] = useState({});
  const [currPage, setCurrPage] = useState({});
  /** 表头 */
  const columns = [
    {
      title: '交易时间',
      align: 'left',
      width: 180,
      render: createTime => createTime && moment(createTime).format('YYYY-MM-DD HH:mm:ss'),
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
      width: 160,
      dataIndex: 'totalPay',
      render: totalPay => totalPay / 10000,
    },
    {
      title: '交易类型',
      align: 'center',
      width: 100,
      render: bizTypes => TRANSACTION_TYPE_ALL[bizTypes],
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
      width: 100,
      render: (status) => {
        if (status === 5) return <div style={{ color: 'red' }}>失败</div>;
        return TRANSACTION_STATUS_ALL[status];
      },
    },
  ];
  return (
    <div className="transaction">
      <div className="transaction_condition">
        <MapForm onCreate={(form) => setForm(form)} layout={'inline'}>
          <Row>
            <Col span={8}>
              <CstInput
                label="交易订单号"
                name="telephone"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                customProps={{
                  placeholder: '请输入账号/手机号',
                  size: 'large',
                }}
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: '账号格式错误'
                  }
                ]}
              />
            </Col>
            <Col span={8}>
              <CstSelect
                label="交易类型"
                name="bizType"
                style={{ width: 290 }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                customProps={{
                  placeholder: '全部',
                  size: 'large',
                }}>
                {_.map(TRANSACTION_TYPE_ALL,(item,index) => (
                  <Select.Option key={index} value={index}>
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
                  placeholder: '输入商品名称/代码',
                  size: 'large',
                }}
              />
            </Col>
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
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                customProps={{
                  placeholder: ['开始时间','结束时间'],
                  size: 'large',
                }}
              />
            </Col>
            <Col span={6} offset={1}>
              <Form.Item>
                <Button type="primary" icon="search" onClick={() => dispatchInit()}>
                  {'查询'}
                </Button>
                <Button icon="reload" onClick={() => form?.resetFields()} >
                  {'重置'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </MapForm>
      </div>
      <Table columns={columns} scroll={{ x: 1100 }} pagination={false} />
      {/* <div style={{ textAlign: 'right', height: 32 }}>
        <Pagination
          current={currPage}
          onChange={(currPage) => setCurrPage(currPage)}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          total={total}
          showQuickJumper
        />
      </div> */}
    </div>
  );
};
export default connect(({ }) => ({

}))(transaction);
