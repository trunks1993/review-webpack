/*
 * @Author: Dad
 * @Date: 2020-07-13 19:32:18
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-15 09:23:50
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Pagination, Icon } from 'antd';
import { connect } from 'dva';
import { ReconStatus } from '@/const';
import MapForm from '@/components/MapForm';
import moment from 'moment';
import _ from 'lodash';
import Delete from '@/assets/images/operations/delete.png';

const { CstInput, CstRangePicker } = MapForm;

const Reconciliation = ({ dispatch, reconList, reconTotal, loading }) => {
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

  const dispatchInit = (callback) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  const initList = () => {
    const data = form?.getFieldsValue();
    dispatch({
      type: 'transaction/fetchReconList',
      queryParams: {
        currPage,
        pageSize,
        createTime: moment(data.CreateTime?.[0]).format('YYYY-MM-DD HH:MM:SS'),
        endTime: moment(data.CreateTime?.[1]).format('YYYY-MM-DD HH:MM:SS'),
        ...data,
      },
    });
  };

  /** 表头 */
  const columns = [
    {
      title: '日期',
      align: 'center',
      width: 200,
      dataIndex: 'modifyTime',
      render: modifyTime => moment(modifyTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '标题',
      width: 200,
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '交易笔数',
      width: 100,
      align: 'center',
      dataIndex: 'tradeCount',
    },
    {
      title: '交易金额(元)',
      align: 'center',
      width: 120,
      dataIndex: 'tradeAmount',
      render: tradeAmount => tradeAmount
    },
    {
      title: '状态',
      align: 'center',
      width: 120,
      dataIndex: 'status',
      render: status => ReconStatus[status]
    },
    {
      title: '创建时间',
      align: 'center',
      width: 200,
      dataIndex: 'createTime',
      render: createTime => moment(createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (item) => {
        if (item.status === 2) {
          return (
            <>
              <a href={process.env.FILE_URL + item.checkFileList[0].fileUrl} className="reconciliation-download" >
                <Icon type="download" />
                  下载
              </a>
              <Button type="link" className="reconciliation-delete">
                <img src={Delete} alt="" />
                  删除
              </Button>
            </>
          );
        }
        return (
          <Button onClick={initList}>
            <Icon type="reload" />
              刷新
          </Button>
        );
      },
    },
  ];

  return (
    <div className="reconciliation">
      <div className="reconciliation-Info">
        <MapForm
          onCreate={(form) => setForm(form)}
          layout="inline"
          className="filter-form"
        >
          <CstInput
            label="标题"
            name="title"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            customProps={{
              placeholder: '请输入标题',
              size: 'large',
            }}
          />
          <CstRangePicker
            label="对账时间"
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
            <Button icon="search" className="filter_button--blue" onClick={() => dispatchInit()}>
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
      <div className="reconciliation-table">
        <div className="reconciliation-table--title">
          <span className="reconciliation-table--desc" >对账单列表</span>
          <Button type="link" className="reconciliation-table--name">
                +申请对账单
            <Icon type="setting" style={{ color: '#999' }} />
          </Button>
        </div>
        <Table dataSource={reconList} columns={columns} pagination={false} scroll={{ x: 1100 , y: 'calc(100vh - 450px)' }} loading={loading} />
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
            total={reconTotal}
          />
          <span style={{ color: '#CCCCCC', marginLeft: '10px' }}>
            共{reconTotal}条
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(({ transaction: { reconList, reconTotal } = {}, loading }) => ({
  reconList,
  reconTotal,
  loading: loading.effects['transaction/fetchReconList']
}))(Reconciliation);
