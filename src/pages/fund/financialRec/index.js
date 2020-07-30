/*
 * @Date: 2020-07-22 17:33:29
 * @LastEditTime: 2020-07-30 09:50:25
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
  Icon,
} from 'antd';
import { fetchList } from '@/services/financialRec';

const { CstInput, CstSelect, CstUpload } = MapForm;

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUM,
  financialRecBillTypes,
  financialRecStatus,
  FINANCIAL_REC_STATUS_2,
  TRANSTEMP,
  PRECISION,
} from '@/const';

import noCashFlow from '@/assets/images/fund/no-cash-flow.png';
import _ from 'lodash';
import { formateTime, getFloat } from '@/utils';

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
  const initList = async () => {
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
      title: '标题',
      dataIndex: 'title',
      width: '25%',
      align: 'center',
    },

    {
      title: '账单类型',
      align: 'center',
      render: (record) => financialRecBillTypes[record.billType],
      width: '10%',
    },
    {
      title: '交易笔数(笔)',
      align: 'center',
      dataIndex: 'tradeCount',
      width: '10%',
    },
    {
      title: '交易金额(元)',
      align: 'center',
      render: (record) => (
        <span style={{ fontWeight: 'bold' }}>
          {getFloat(record.tradeAmount / TRANSTEMP, PRECISION)}
        </span>
      ),
      width: '10%',
    },
    {
      title: '状态',
      align: 'center',
      render: (record) => <span>{financialRecStatus[record.status]}</span>,
      width: '10%',
    },

    {
      title: '创建时间',
      key: 'id',
      align: 'center',
      render: (record) =>
        moment(record.createTime).format('YYYY-MM-DD HH:MM:SS'),
      width: '15%',
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => (
        <>
          {!record.status === FINANCIAL_REC_STATUS_2 ? (
            <Button
              size="small"
              type="primary"
              ghost
              onClick={() => initList()}
            >
              <Icon type="reload" />
              刷新
            </Button>
          ) : null}
          {record.status === FINANCIAL_REC_STATUS_2 ? (
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              type="primary"
              ghost
              onClick={() =>
                window.open(
                  `${process.env.FILE_URL + record.checkFileList[0].fileUrl}`
                )
              }
            >
              <Icon type="vertical-align-bottom" />
              <span>下载</span>
            </Button>
          ) : null}
        </>
      ),
      width: '20%',
    },
  ];

  return (
    <div className="financial-rec">
      <div className="financial-rec_header">{'财务管理 > 财务对账'}</div>
      <div className="financial-rec_filter">
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
                name="title"
                label="标题"
                customProps={{
                  placeholder: '输入标题/关键字',
                  size: 'large',
                }}
              />
            </Col>
            <Col span={7}>
              <CstSelect
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="billType"
                label="账单类型"
                customProps={{
                  placeholder: '选择账单类型',
                  size: 'large',
                }}
              >
                {_.map(financialRecBillTypes, (item, key) => (
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
                  查询
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
      <div className="financial-rec_table">
        <div className="financial-rec_table-tools">
          <span className="financial-rec_table-tools-title">对账单列表</span>
          <Button type="link">+申请对账单</Button>
        </div>
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
              <div className="financial-rec_empty">
                <img width="218px" height="134px" src={noCashFlow} />
                <p className="financial-rec_empty-text">暂无财务对账</p>
              </div>
            ),
          }}
        />
      </div>
      {!list.length ? null : (
        <div className="financial-rec_pagination">
          <span className="financial-rec_pagination-denote">
            说明：1、如需自动生成对账文件，请开启相关配置。
            2、已生成的对账单只保留7天，请您及时下载查收。
          </span>
          <Pagination
            current={currPage}
            onChange={(currPage) => setCurrPage(currPage)}
            defaultPageSize={pageSize}
            total={total}
          />
          <span className="financial-rec_pagination-data">
            共 {total} 条 ,每页 {pageSize} 条
          </span>
        </div>
      )}
    </div>
  );
};

export default FinancialFlow;
