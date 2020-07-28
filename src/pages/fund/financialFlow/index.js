/*
 * @Date: 2020-07-22 16:33:56
 * @LastEditTime: 2020-07-28 15:01:49
 */

import React, { useState, useEffect } from 'react';
import MapForm from '@/components/MapForm';
import {
  Form,
  Button,
  Row,
  message,
  Col,
  Table,
  Select,
  Pagination,
} from 'antd';
import { fetchList } from '@/services/financialFlow';

const { CstInput, CstSelect, CstUpload } = MapForm;

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUM,
  financialFlowBizTypes,
  financialFlowBillTypes,
  FINANCIAL_FLOW_BILLTYPE_1,
  FINANCIAL_FLOW_BILLTYPE_2,
  TRANSTEMP,
  PRECISION,
} from '@/const';

import noCashFlow from '@/assets/images/fund/no-cash-flow.png';
import _ from 'lodash';
import { formateTime, getFloat } from '@/utils';

const colorMaps = {
  [FINANCIAL_FLOW_BILLTYPE_1]: '#D70000',
  [FINANCIAL_FLOW_BILLTYPE_2]: '#1A61DC',
};

const FinancialFlow = (props) => {
  const [filterForm, setFilterForm] = React.useState(null);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initList();
  }, [currPage]);

  /**
   * @name: 列表加载
   */
  const initList = async() => {
    try {
      const filterData = filterForm?.getFieldsValue();
      const queryParams = {
        pageSize,
        currPage,
        ...filterData,
      };
      setLoading(true);
      const [err, data, msg] = await fetchList(queryParams);
      setLoading(false);
      if (!err) {
        setList(data.list);
        setTotal(data.totalRecords);
      } else message.error(msg);
    } catch (error) {}
  };

  /**
   * @name: 触发列表加载effect
   * @param {type}
   */
  const dispatchInit = (callback) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  const columns = [
    {
      title: '交易时间',
      key: 'id',
      render: (record) => formateTime(record.createTime),
      width: '20%',
      align: 'center',
    },
    {
      title: '业务订单号',
      align: 'center',
      render: (record) => record.code,
      width: '15%',
    },
    {
      title: '交易类型',
      align: 'center',
      render: (record) => financialFlowBizTypes[record.bizType],
      width: '10%',
    },
    {
      title: '收支类型',
      align: 'center',
      render: (record) => (
        <span style={{ color: colorMaps[record.type] }}>
          {financialFlowBillTypes[record.type]}
        </span>
      ),
      width: '10%',
    },
    {
      title: '金额(元)',
      align: 'center',
      render: (record) => (
        <span style={{ fontWeight: 'bold' }}>
          {getFloat(record.changeAmount / TRANSTEMP, PRECISION)}
        </span>
      ),
      width: '10%',
    },
    {
      title: '余额(元)',
      align: 'center',
      render: (record) => (
        <span style={{ fontWeight: 'bold' }}>
          {getFloat(record.amount / TRANSTEMP, PRECISION)}
        </span>
      ),
      width: '10%',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: '25%',
    },
  ];

  return (
    <div className="cash-flow">
      <div className="cash-flow_header">{'财务管理 > 财务流水'}</div>
      <div className="cash-flow_filter">
        <MapForm
          className="filter-form"
          layout="horizontal"
          onCreate={setFilterForm}
        >
          <Row>
            <Col span={7}>
              <CstInput
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="orderNo"
                label="交易订单号"
                customProps={{
                  placeholder: '输入订单号',
                  size: 'large',
                }}
              />
            </Col>
            <Col span={7}>
              <CstSelect
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="bizType"
                label="交易类型"
                customProps={{
                  placeholder: '选择业务类型',
                  size: 'large',
                }}
              >
                {_.map(financialFlowBizTypes, (item, key) => (
                  <Select.Option key={key} value={key}>
                    {item}
                  </Select.Option>
                ))}
              </CstSelect>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item>
                <Button
                  type="primary"
                  icon="search"
                  size="large"
                  onClick={() => dispatchInit()}
                >
                  筛选
                </Button>
                <Button
                  icon="undo"
                  size="large"
                  style={{ marginLeft: '10px' }}
                  onClick={() => filterForm?.resetFields()}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </MapForm>
      </div>
      <div className="cash-flow_table">
        <Table
          className="global-table"
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={list}
          rowClassName={() => 'global-table_row-tr'}
          onHeaderRow={() => ({
            className: 'global-table_head-tr',
          })}
          rowKey={(record, index) => record.id}
          locale={{
            emptyText: (
              <div className="cash-flow_empty">
                <img width="218px" height="134px" src={noCashFlow} />
                <p className="cash-flow_empty-text">暂无财务流水</p>
              </div>
            ),
          }}
        />
      </div>
      {!list.length ? null : (
        <div className="cash-flow_pagination">
          <Pagination
            current={currPage}
            onChange={(currPage) => setCurrPage(currPage)}
            defaultPageSize={pageSize}
            total={total}
          />
          <span className="cash-flow_pagination-data">
            共 {total} 条 ,每页 {pageSize} 条
          </span>
        </div>
      )}
    </div>
  );
};

export default FinancialFlow;
