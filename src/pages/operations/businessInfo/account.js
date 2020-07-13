/*
 * @Author: Dad
 * @Date: 2020-07-13 19:32:18
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-13 21:40:51
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { RECONCILIATION_STATUS_ALL, ACCOUNT_INFO_ALL } from '@/const';
import MapForm from '@/components/MapForm';
import moment from 'moment';
import _ from 'lodash';
import { Form, Button, Table, Pagination, Icon, Select } from 'antd';

const { CstInput, CstSelect } = MapForm;

const account = ({ dispatch, reconList, reconTotal, loading }) => {
  const [form, setForm] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    (async() => {
      initList();
    })();
  }, []);

  useEffect(() => {
    (async() => {
      initList();
    })();
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
      title: '登陆账号',
      dataIndex: 'act',
      className: 'jiaoyiTime',
      width: '16%',
      editable: true,
    },
    {
      title: '昵称/名称',
      dataIndex: 'name',
      width: '16%',
      editable: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: '10%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'type',
      width: '10%',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '16%',
      editable: true,
    },
    {
      title: '上次登陆时间',
      dataIndex: 'lastTime',
      width: '16%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <Button
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                  type="link"
                >
                  {'保存'}
                </Button>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="是否取消更改?" onConfirm={() => this.cancel(record.key)}>
              <Button type="link">取消</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button type="link" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              {'编辑'}
            </Button>
            <Button type="link" disabled={editingKey !== ''} onClick={() => this.delete(record.key)}>
              {'删除'}
            </Button>
          </>
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
            label="登录账号"
            name="act"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            customProps={{
              placeholder: '请输入标题',
              size: 'large',
            }}
          />
          <CstSelect
            label="角色"
            name="role"
            style={{ width: 260 }}
            customProps={{
              placeholder: '选择角色',
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {_.map(ACCOUNT_INFO_ALL, (item, key) => (
              <Select.Option key={key} value={parseInt(key)}>
                {item}
              </Select.Option>
            ))}
          </CstSelect>
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
          <span className="reconciliation-table--desc" >账号列表</span>
          <Button type="link" className="reconciliation-table--name">
            <Icon type="plus" style={{ fontWeight: 600 }} />
                添加账号
          </Button>
        </div>
        <Table dataSource={reconList} columns={columns} pagination={false} scroll={{ x: 1000 }} />
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
}))(account);
