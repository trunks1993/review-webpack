/*
 * @Date: 2020-07-02 20:14:20
 * @LastEditTime: 2020-07-20 09:23:33
 */
import React, { useState, useEffect } from 'react';
import {
  Tabs,
  message,
  Row,
  Col,
  Button,
  List,
  Avatar,
  Skeleton,
  Modal,
  Icon,
  Table,
} from 'antd';
import { getPurchaseOrder, cancelOrder, queryListTrace } from '@/services/shop';
import {
  OrderStatus,
  ORDER_STATUS_1,
  ORDER_STATUS_2,
  ORDER_STATUS_3,
  ORDER_STATUS_4,
  ORDER_STATUS_5,
  PRODUCT_TYPE_1,
  PRODUCT_TYPE_4,
  TraceStatus,
  TRACE_STATUS_5,
  TRACE_STATUS_6,
} from '@/const';
import GlobalModal from '@/components/GlobalModal';

import moment from 'moment';
import { getToken } from '@/utils/auth';

const { confirm } = Modal;

const { TabPane } = Tabs;

const TabsPanel = (props) => {
  const { onChange, children } = props;
  return (
    <Tabs defaultActiveKey="" onChange={onChange}>
      <TabPane tab="全部订单" key="">
        {children}
      </TabPane>
      <TabPane tab="待付款" key="1">
        {children}
      </TabPane>
      <TabPane tab="待发货" key="2">
        {children}
      </TabPane>
      <TabPane tab="已完成" key="4">
        {children}
      </TabPane>
    </Tabs>
  );
};

export default (props) => {
  const { history, location } = props;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [orderItemCode, setOrderItemCode] = useState('');
  const [traceList, setTraceList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [filterParams, setFilterParams] = useState({
    currPage: 1,
    pageSize: 10000,
    status: '',
  });

  useEffect(() => {
    initPurchaseOrder();
  }, [filterParams]);

  useEffect(() => {
    if (orderItemCode) initTraceList();
    else setTraceList([]);
  }, [orderItemCode]);

  const pageScroll = (e) => {
    if (e.target.scrollTop >= 160) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const initPurchaseOrder = async() => {
    try {
      setLoading(true);
      const [err, data, msg] = await getPurchaseOrder(filterParams);
      setLoading(false);
      if (!err) {
        setList(data.list);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

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

  /**
   * @name: 删除
   * @param {number} id
   */
  const showConfirm = (id) => {
    confirm({
      title: '提示',
      content: '是否删除',
      okText: '确定',
      cancelText: '取消',
      onOk: async() => {
        try {
          const [err, data, msg] = await cancelOrder(id);
          if (!err) message.success('操作成功');
          else message.error(msg);
        } catch (error) {}
        initPurchaseOrder();
      },
      onCancel() {},
    });
  };

  const ToolMap = {
    [ORDER_STATUS_1]: (item) => (
      <>
        <Button
          type="primary"
          onClick={() => history.push({
            pathname: '/admin/pay',
            search: `?orderId=${item.orderId}`,
            state: { from: location.pathname },
          })
          }
          // "/admin/pay?orderId=" + item.orderId
        >
          立即付款
        </Button>
        <Button type="link" onClick={() => showConfirm(item.orderId)}>
          <span>
            <Icon type="delete" />
            删除
          </span>
        </Button>
      </>
    ),
    [ORDER_STATUS_2]: (item) => <>-</>,
    [ORDER_STATUS_3]: (item) => <>-</>,
    [ORDER_STATUS_4]: (item) => (
      <>
        <Button type="primary">再次购买</Button>
      </>
    ),
    [ORDER_STATUS_5]: (item) => <>-</>,
  };

  const TypeBtnMap = {
    [PRODUCT_TYPE_1]: (item) => item.status === ORDER_STATUS_4 && (
      <span
        className="purchase-order_trace-btn"
        onClick={() => {
          window.open(
            `${
              process.env.BASE_API + '/order/cardExtract'
            }?token=${getToken()}&itemCode=${item.code}`
          );
        }}
      >
          提取
      </span>
    ),
    [PRODUCT_TYPE_4]: (item) => (
      <span
        className="purchase-order_trace-btn"
        onClick={() => {
          setOrderItemCode(item.code);
          setModalTitle(item.productSubName);
        }}
      >
        直冲明细
      </span>
    ),
  };

  const columns = [
    {
      className: 'global-table--none',
      dataIndex: 'id',
    },
    {
      title: '序号',
      align: 'center',
      render: (record, arr, index) => index + 1,
      width: '20%',
    },
    {
      title: '充值账号',
      align: 'center',
      dataIndex: 'objNo',
      width: '24%',
    },
    {
      title: '充值数量（件）',
      align: 'center',
      dataIndex: 'amount',
      width: '16%',
    },
    {
      title: '充值状态',
      align: 'center',
      render: (record) => TraceStatus[record.status],
      width: '20%',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: '20%',
    },
  ];

  return (
    <div className="purchase-order" onScroll={pageScroll}>
      <div className="purchase-order_header">星权益 / 采购订单</div>
      <TabsPanel
        onChange={(status) => setFilterParams({
          ...filterParams,
          status,
        })
        }
      >
        <div>
          <Row
            className={
              fixed
                ? 'purchase-order_table-header--fixed'
                : 'purchase-order_table-header'
            }
            style={{ marginBottom: '20px' }}
          >
            <Col span={4}>最近三个月订单</Col>
            <Col span={10}>订单详情</Col>
            <Col span={2}>总金额</Col>
            <Col span={2}>状态</Col>
            <Col span={6}>操作</Col>
          </Row>
          {fixed && <div style={{ marginBottom: '20px' }} />}
          <Skeleton
            loading={loading}
            active
            title={false}
            avatar={false}
            paragraph={{ rows: 10 }}
          >
            {_.map(list, (item) => (
              <Row key={item.id}>
                <Col span={24} className="purchase-order_table-title">
                  <span>
                    {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <span style={{ marginLeft: '48px' }}>
                    订单号：{item.orderId}
                  </span>
                </Col>
                {_.map(item.orderItemList, (v, index) => (
                  <span key={index} className="purchase-order_table-item">
                    <Col span={6}>
                      <div style={{ width: '80%' }}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              shape="square"
                              size={60}
                              src={`/file${v.iconUrl}`}
                            />
                          }
                          title={
                            <>
                              <span
                                title={v.brandName}
                                className="purchase-order_product-title"
                              >
                                {v.brandName}
                              </span>
                              {TypeBtnMap[v.productTypeCode] &&
                                TypeBtnMap[v.productTypeCode](v)}
                            </>
                          }
                          description={
                            <span title={v.productSubName}>
                              {v.productSubName}
                            </span>
                          }
                        />
                      </div>
                    </Col>
                    <Col span={2}>{v.detailCount}</Col>
                    <Col span={2}>{v.typeLabel}</Col>
                    <Col span={4}>￥{v.price}</Col>
                    {index === 0 ? (
                      <>
                        <Col span={2}>￥{item.realTotalPay}</Col>
                        <Col span={2}>{OrderStatus[item.status]}</Col>
                        <Col span={6}>{ToolMap[item.status](item)}</Col>
                      </>
                    ) : (
                      <>
                        <Col span={10} />
                      </>
                    )}
                  </span>
                ))}
              </Row>
            ))}
          </Skeleton>
        </div>
      </TabsPanel>

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
          columns={columns}
          pagination={false}
          dataSource={traceList}
          scroll={{ y: 200 }}
          rowKey={(record, index) => record.id}
        />
      </GlobalModal>
    </div>
  );
};
