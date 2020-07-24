/*
 * @Date: 2020-07-24 09:56:43
 * @LastEditTime: 2020-07-24 11:13:49
 */

import React from 'react';
import { Button, Select, Input, Table, Checkbox } from 'antd';
import mail from '@/assets/images/message/mail.png';

const Message = () => {
  const columns = [
    {
      title: (
        <span>
          <img src={mail} />
          <span style={{ marginLeft: '20px', verticalAlign: 'middle' }}>
            主题
          </span>
        </span>
      ),
      key: 'id',
      render: (record) => formateTime(record.createTime),
      width: '60%',
      align: 'left',
    },
    {
      title: '发件人',
      align: 'center',
      render: (record) => record.code,
      width: '10%',
    },
    {
      title: '日期',
      align: 'center',
      render: (record) => formateTime(record.createTime),
      width: '20%',
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => <></>,
      width: '10%',
    },
  ];

  const rowSelection = {
    // selectedRowKeys,
    columnWidth: '60px',
    columnTitle: (
      <span>
        <Checkbox disabled />
      </span>
    ),
    hideDefaultSelections: true,
    // onSelect: async(record, selected) => {
    //   try {
    //     setLoading(true);
    //     const paramsData = {
    //       itemCode: record.code,
    //       checked: selected ? 'Y' : 'N',
    //     };
    //     const [err, data, msg] = await updateCarItem(paramsData);
    //     setLoading(false);
    //     if (!err) {
    //       dispatch({
    //         type: 'account/setCarData',
    //       });
    //     } else {
    //       message.error(msg);
    //     }
    //   } catch (error) {}
    // },
  };

  return (
    <div className="page-message">
      <div className="page-message_header">{'商户中心 > 消息中心'}</div>
      <div className="page-message_content">
        <div className="page-message_content-header">
          <span className="page-message_content-header-title">消息中心</span>
          <Button style={{ padding: '5px' }} type="link">
            (未读消息0条)
          </Button>
        </div>

        <div className="page-message_content-tools">
          <Select size="large" defaultValue="" style={{ width: '120px' }}>
            <Select.Option value="">全部消息</Select.Option>
            <Select.Option value="1">未读消息</Select.Option>
            <Select.Option value="2">已读消息</Select.Option>
          </Select>
          <Button size="large" style={{ marginLeft: '30px' }}>
            标为已读
          </Button>
          <Button size="large" style={{ marginLeft: '30px' }}>
            批量删除
          </Button>

          <span className="page-message_content-tools-search">
            <Input.Search
              placeholder="输入主题"
              onSearch={(value) => console.log(value)}
              enterButton="查询"
            />
          </span>
        </div>

        <div className="page-message_content-table">
          <Table
            className="global-table check-box-rectangle"
            rowSelection={rowSelection}
            columns={columns}
            pagination={false}
            dataSource={[]}
            rowClassName={() => 'global-table_row-tr'}
            onHeaderRow={() => ({
              className: 'global-table_head-tr',
            })}
            rowKey={(record, index) => record.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
