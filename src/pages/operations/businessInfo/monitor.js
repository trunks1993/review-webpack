/*
 * @Author: Dad
 * @Date: 2020-07-17 20:28:10
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-17 20:57:24
 */

import React, { useState } from 'react';
import { Row, Col, Form, Button, Select, Table } from 'antd';
import MapForm from '@/components/MapForm';
import { JieGuoStatus } from '@/const';
const { CstDatePicker, CstSelect } = MapForm;
const columns = [
  {
    title: '时间',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: '异常原因',
    dataIndex: 'error',
    key: 'error',
  },
  {
    title: '平台请求URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '开发者响应',
    dataIndex: 'kfz',
    key: 'kfz',
  },
];
const monitor = () => {
  const [form, setForm] = useState({});
  return (
    <div style={{ padding: '0 30px', marginTop:20 }}>
      <div className="interfaceConfig-title">
        您的开发人员可以关注这里的异常订单情况，监控自己的接口状态是否健康。
      </div>
      <div style={{ margin: '20px 0px' }}>
        <MapForm
          className="filter-form"
          layout="horizontal"
          onCreate={(form) => setForm(form)}
        >
          <Row>
            <Col span={8}>
              <CstDatePicker
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="data"
                label="日期"
                customProps={{
                  placeholder: '请选择日期',
                }}
              />
            </Col>
            <Col span={8}>
              <CstSelect
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="type"
                label="异常原因"
                customProps={{
                  placeholder: '全部',
                }}
              >
                {_.map(JieGuoStatus, (item, key) => (
                  <Select.Option key={key} value={parseInt(key)}>
                    {item}
                  </Select.Option>
                ))}
              </CstSelect>
            </Col>
            <Col span={7} push={1}>
              <Form.Item>
                <Button
                  type="primary"
                  icon="search"
                  // onClick={initList}
                >
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </MapForm>
      </div>
      <Table columns={columns} pagination={false} bordered/>
    </div>
  );
};
export default monitor;
