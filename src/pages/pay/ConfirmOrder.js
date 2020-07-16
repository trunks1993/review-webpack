/*
 * @Date: 2020-07-15 16:40:01
 * @LastEditTime: 2020-07-16 19:07:42
 */

import React, { useState, useEffect } from 'react';
import { Button, Table, List, Avatar } from 'antd';
import moment from 'moment';
import { PRODUCT_TYPE_4, TRACE_STATUS_5, TRACE_STATUS_6 } from '@/const';
import GlobalModal from '@/components/GlobalModal';
import { queryListTrace } from '@/services/shop';

export default (props) => {
  const { orderInfo, changeStep } = props;
  const [orderItemCode, setOrderItemCode] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [traceList, setTraceList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if (orderItemCode) initTraceList();
    else setTraceList([]);
  }, [orderItemCode]);

  /**
   * @name: 列表加载
   */
  const initTraceList = async() => {
    setConfirmLoading(true);
    try {
      const [err, data, msg] = await queryListTrace({
        currPage: 1,
        pageSize: 10000,
        itemCode: orderItemCode,
      });
      setConfirmLoading(false);
      if (!err) setTraceList(data.list);
      else message.error(msg);
    } catch (error) {}
  };

  const columns = [
    {
      title: '权益商品',
      key: 'id',
      render: (record) => (
        <div style={{ padding: '13px 25px' }}>
          <List.Item.Meta
            avatar={
              <Avatar shape="square" size={60} src={`/file${record.iconUrl}`} />
            }
            title={record.brandName}
            description={record.productSubName}
          />
        </div>
      ),
      width: '30%',
    },
    {
      title: '商品类型',
      align: 'center',
      dataIndex: 'typeLabel',
      width: '14%',
    },
    {
      title: '面值(元)',
      align: 'center',
      render: (record) => <span>￥{record.facePrice}</span>,
      width: '14%',
    },
    {
      title: '采购价(元)',
      align: 'center',
      render: (record) => <span>￥{record.price}</span>,
      width: '14%',
    },
    {
      title: '总数量（件）',
      align: 'center',
      // dataIndex: "detailCount",
      render: (record) => (
        <span
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <span>x{record.detailCount}</span>
          {record.productTypeCode === PRODUCT_TYPE_4 && (
            <span style={{ position: 'absolute', top: '10px' }}>
              <Button
                type="link"
                onClick={() => {
                  setOrderItemCode(record.code);
                  setModalTitle(record.productSubName);
                }}
              >
                查看明细
              </Button>
            </span>
          )}
        </span>
      ),
      width: '14%',
    },
    {
      title: '总价(元)',
      align: 'center',
      render: (record) => <span>￥{record.price * record.detailCount}</span>,
      width: '14%',
    },
  ];

  const columnsTrace = [
    {
      title: '序号',
      align: 'center',
      key: 'id',
      render: (record, arr, index) => index + 1,
      width: '20%',
    },
    {
      title: '充值账号',
      align: 'center',
      dataIndex: 'objNo',
      width: '25%',
    },
    {
      title: '充值数量（件）',
      align: 'center',
      dataIndex: 'amount',
      width: '25%',
    },
    // {
    //   title: "充值状态",
    //   align: "center",
    //   render: (record) => TraceStatus[record.status],
    //   width: "20%",
    // },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: '30%',
    },
  ];

  return (
    <div className="page-pay_confirm-order">
      <Table
        // className="global-table"
        // loading={false}
        columns={columns}
        pagination={false}
        dataSource={orderInfo.orderItemList}
        rowKey={(record) => record.id.toString()}
      />
      <div className="page-pay_confirm-order-footer">
        <span className="page-pay_order-info">
          <span className="page-pay_order-info-item">
            订单号：{orderInfo?.order?.orderId}
          </span>
          <span className="page-pay_order-info-item">
            下单时间：
            {moment(orderInfo?.order?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </span>
        <span className="page-pay_order-detail">
          <span className="page-pay_order-detail-item">
            已选择商品 <span>{orderInfo?.sumInfo?.checkedCount}</span> 个
          </span>
          {orderInfo?.sumInfo?.hasZhiChong === 'Y' && (
            <>
              <span className="page-pay_order-detail-item">
                充值账号 <span>{orderInfo?.sumInfo?.accountNums}</span> 个
              </span>
              <span className="page-pay_order-detail-item">
                充值数量 <span>{orderInfo?.sumInfo?.totalAmount}</span> 件
              </span>
            </>
          )}
          <span className="page-pay_order-detail-item">
            提取卡密 <span>{orderInfo?.sumInfo?.cardCount}</span> 件
          </span>
          <span className="page-pay_order-detail-total">
            合计：<span>￥{orderInfo?.sumInfo?.totalMoney}</span>
          </span>
          <Button type="primary" onClick={() => changeStep(3)}>
            立即付款
          </Button>
        </span>
      </div>

      <GlobalModal
        modalVisible={!!orderItemCode}
        title={
          <div
            style={{ textAlign: 'center', fontWeight: 'bold' }}
          >{`${modalTitle}-直充明细`}</div>
        }
        cancelText={
          <>
            <span style={{ color: '#333333' }}>
              充值账号
              <span
                style={{
                  color: '#1A61DC',
                  fontWeight: 'bold',
                  margin: '0 5px',
                }}
              >
                {traceList.length}
              </span>
              个
            </span>
            <span style={{ color: '#333333', marginLeft: '10px' }}>
              充值成功
              <span
                style={{
                  color: '#1A61DC',
                  fontWeight: 'bold',
                  margin: '0 5px',
                }}
              >
                {_.map(
                  traceList,
                  (item) => item.status === TRACE_STATUS_5 && item.amount
                ).reduce((total, pre) => total + pre, 0)}
              </span>
              件
            </span>
            <span style={{ color: '#333333', marginLeft: '10px' }}>
              充值失败
              <span
                style={{
                  color: '#DD0000',
                  fontWeight: 'bold',
                  margin: '0 5px',
                }}
              >
                {_.map(
                  traceList,
                  (item) => item.status === TRACE_STATUS_6 && item.amount
                ).reduce((total, pre) => total + pre, 0)}
              </span>
              件
            </span>
          </>
        }
        onOk={() => setOrderItemCode('')}
        onCancel={() => setOrderItemCode('')}
        cancelButtonProps={{
          className: 'global-modal-btn-cancel',
          type: 'link',
          style: { position: 'absolute', left: 0 },
          disabled: true,
        }}
        okText="确认"
        width={560}
      >
        <Table
          className="global-table"
          loading={confirmLoading}
          columns={columnsTrace}
          pagination={false}
          dataSource={traceList}
          scroll={{ y: 200 }}
          rowKey={(record, index) => record.id}
        />
      </GlobalModal>
    </div>
  );
};
