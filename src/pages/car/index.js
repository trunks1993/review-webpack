/*
 * @Date: 2020-07-18 17:19:33
 * @LastEditTime: 2020-07-28 16:50:22
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  List,
  Avatar,
  Icon,
  Modal,
  Checkbox,
  message,
} from 'antd';
import { connect } from 'dva';
import { ProductTypes, PRODUCT_TYPE_4, TRANSTEMP, PRECISION } from '@/const';
import {
  removeCarItem,
  updateCarItem,
  checkedAll,
  removeAll,
  getCartDetail,
  addOrder,
} from '@/services/shop';
import car from '@/assets/images/shop/big-car.png';
import InputNumber from '@/components/InputNumber';
import _ from 'lodash';
import GlobalModal from '@/components/GlobalModal';
import { getFloat } from '@/utils';

const { confirm } = Modal;

const CarPage = (props) => {
  const { carData, dispatch, history, location } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const [itemCode, setItemCode] = useState('');
  const [traceList, setTraceList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const keys = _.map(carData.cartItemList, (item) => {
      if (item.status === 1) return item.id;
    }).filter((item) => item);
    setSelectedRowKeys(keys);
  }, [carData]);

  useEffect(() => {
    if (itemCode) initTraceList();
    else setTraceList([]);
  }, [itemCode]);

  /**
   * @name: 删除
   * @param {number} itemCode
   */
  const showConfirm = (itemCode) => {
    confirm({
      title: '提示',
      content: '是否删除',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          const [err, data, msg] = await removeCarItem(itemCode);
          setLoading(false);
          if (!err) {
            message.success('操作成功');
            dispatch({
              type: 'account/setCarData',
            });
          } else message.error(msg);
        } catch (error) {}
      },
      onCancel() {},
    });
  };

  /**
   * @name: 批量删除
   * @param {type}
   */
  const removeCarSelection = () => {
    confirm({
      title: '提示',
      content: '是否删除',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          const [err, data, msg] = await removeAll();
          setLoading(false);
          if (!err) {
            message.success('操作成功');
            dispatch({
              type: 'account/setCarData',
            });
          } else message.error(msg);
        } catch (error) {}
      },
      onCancel() {},
    });
  };

  /**
   * @name: checkbox onChange 事件
   * @param {CheckboxChangeEvent} e
   */
  const handleSelectAll = async (e) => {
    const checked =
      carData.cartItemList.length === selectedRowKeys.length ? 'N' : 'Y';
    setLoading(true);
    try {
      const [err, data, msg] = await checkedAll(checked);
      setLoading(false);
      if (!err) {
        dispatch({
          type: 'account/setCarData',
        });
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  /**
   * @name: 更新购物车数量
   * @param
   */
  const updateCount = async (amount, itemCode) => {
    try {
      setLoading(true);
      const paramsData = {
        itemCode,
        amount,
      };
      const [err, data, msg] = await updateCarItem(paramsData);
      setLoading(false);
      if (!err) {
        dispatch({
          type: 'account/setCarData',
        });
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  /**
   * @name: 列表加载
   */
  const initTraceList = async () => {
    try {
      setConfirmLoading(true);
      const [err, data, msg] = await getCartDetail(itemCode);
      setConfirmLoading(false);
      if (!err) setTraceList(data);
      else message.error(msg);
    } catch (error) {}
  };

  /**
   * @name: 提交订单
   * @param {type}
   */
  const submitOrder = async () => {
    try {
      setLoading(true);
      const [err, data, msg] = await addOrder();
      setLoading(false);
      if (!err) {
        dispatch({
          type: 'account/setCarData',
        });
        // history.push(`/admin/pay?orderId=${data}`);
        history.push({
          pathname: '/admin/pay',
          search: `?orderId=${data}`,
          state: { from: location.pathname },
        });
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: '商品信息',
      key: 'id',
      render: (record) => (
        <List.Item.Meta
          avatar={
            <Avatar
              shape="square"
              size={60}
              src={`/file${record.goods.iconUrl}`}
            />
          }
          title={record.brand.name}
          description={record.goods.productSubName}
        />
      ),
      width: '25%',
    },
    {
      title: '类型',
      align: 'center',
      render: (record) => ProductTypes[record.productType],
      width: '10%',
    },
    {
      title: '单价',
      align: 'center',
      render: (record) => (
        <span>￥{getFloat(record.goods.price / TRANSTEMP, PRECISION)}</span>
      ),
      width: '10%',
    },
    {
      title: '数量',
      align: 'center',
      render: (record) => {
        if (record.productType === PRODUCT_TYPE_4) return record.amount;
        return (
          <span>
            <InputNumber
              min={1}
              max={record.goods.singleBuyLimit}
              defaultValue={record.amount}
              onChange={(v) => updateCount(v, record.code)}
            />
          </span>
        );
      },
      width: '25%',
    },
    {
      title: '总价',
      align: 'center',
      render: (record) => (
        <span>
          ￥
          {getFloat(
            (record.goods.price * record.amount) / TRANSTEMP,
            PRECISION
          )}
        </span>
      ),
      width: '10%',
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => (
        <span className="car_table-tool">
          <Button
            style={{ color: '#999999' }}
            type="link"
            onClick={() => showConfirm(record.code)}
          >
            <span>
              <Icon
                style={{ position: 'relative', top: '1px' }}
                type="delete"
              />
              <span>删除</span>
            </span>
          </Button>
          {record.productType === PRODUCT_TYPE_4 ? (
            <>
              <span className="car_table-tool-line" />
              <Button
                type="link"
                onClick={() => {
                  setItemCode(record.code);
                  setModalTitle(record.goods.productSubName);
                }}
              >
                查看明细
              </Button>
            </>
          ) : null}
        </span>
      ),
      width: '20%',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    columnWidth: '76px',
    columnTitle: (
      <span style={{ whiteSpace: 'nowrap' }}>
        <Checkbox
          indeterminate={
            carData?.cartItemList?.length !== selectedRowKeys.length &&
            selectedRowKeys.length > 0
          }
          onChange={handleSelectAll}
          checked={selectedRowKeys.length > 0}
        >
          全选
        </Checkbox>
      </span>
    ),
    hideDefaultSelections: true,
    onSelect: async (record, selected) => {
      try {
        setLoading(true);
        const paramsData = {
          itemCode: record.code,
          checked: selected ? 'Y' : 'N',
        };
        const [err, data, msg] = await updateCarItem(paramsData);
        setLoading(false);
        if (!err) {
          dispatch({
            type: 'account/setCarData',
          });
        } else {
          message.error(msg);
        }
      } catch (error) {}
    },
  };

  const columns_trace = [
    {
      className: 'global-table--none',
      dataIndex: 'id',
    },
    {
      title: '序号',
      align: 'center',
      render: (record, arr, index) => index + 1,
      width: '25%',
    },
    {
      title: '充值账号',
      align: 'center',
      dataIndex: 'objNo',
      width: '29%',
    },
    {
      title: '充值数量（件）',
      align: 'center',
      dataIndex: 'amount',
      width: '21%',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'extraInfo',
      width: '25%',
    },
  ];

  return (
    <div className="car">
      <div style={{ border: '1px solid #e6e6e6' }}>
        <div className="car-header">
          <span className="car-header_title">购物车</span>
          <Button type="link" onClick={() => history.push('/admin/shop')}>
            {'添加更多商品>'}
          </Button>
        </div>
        <div>
          <Table
            className="global-table check-box-circular"
            rowSelection={rowSelection}
            loading={loading}
            columns={columns}
            pagination={false}
            dataSource={carData.cartItemList}
            rowKey={(record, index) => record.id}
            rowClassName={() => 'global-table_row-tr--114'}
            onHeaderRow={() => ({
              className: 'global-table_head-tr--40',
            })}
            locale={{
              emptyText: (
                <div className="car_empty-text">
                  <img width="134px" height="116px" src={car} />
                  <p className="car_empty-text-title">您目前还没有任何商品</p>
                  <Button
                    size="small"
                    onClick={() => history.push('/admin/shop')}
                  >
                    返回购买
                  </Button>
                </div>
              ),
            }}
          />
          <div className="car-footer">
            <span className="car-footer_tool-box">
              <Checkbox
                indeterminate={
                  carData?.cartItemList?.length !== selectedRowKeys.length &&
                  selectedRowKeys.length > 0
                }
                onChange={handleSelectAll}
                checked={selectedRowKeys.length > 0}
              >
                已选({selectedRowKeys.length})
              </Checkbox>
              <Button
                type="link"
                disabled={!selectedRowKeys.length}
                onClick={removeCarSelection}
              >
                批量删除选中的商品
              </Button>
            </span>
            <span className="car-footer_detail">
              <span className="car-footer_detail-item">
                已选择商品 <span>{carData?.sumInfo?.checkedCount}</span> 个
              </span>
              {carData?.sumInfo?.hasZhiChong === 'Y' && (
                <>
                  <span className="car-footer_detail-item">
                    充值账号 <span>{carData?.sumInfo?.accountNums}</span> 个
                  </span>
                  <span className="car-footer_detail-item">
                    充值数量 <span>{carData?.sumInfo?.totalAmount}</span> 件
                  </span>
                </>
              )}
              <span className="car-footer_detail-item">
                提取卡密 <span>{carData?.sumInfo?.cardCount}</span> 件
              </span>
              <span className="car-footer_detail-total">
                合计：
                <span>
                  ￥
                  {getFloat(
                    carData?.sumInfo?.totalMoney / TRANSTEMP,
                    PRECISION
                  )}
                </span>
              </span>
              <Button
                loading={loading}
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={submitOrder}
              >
                提交订单
              </Button>
            </span>
          </div>
        </div>
      </div>

      <GlobalModal
        modalVisible={!!itemCode}
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
              充值数量
              <span
                style={{
                  color: '#1A61DC',
                  fontWeight: 'bold',
                  margin: '0 5px',
                }}
              >
                {_.map(traceList, (item) => item.amount).reduce(
                  (total, pre) => total + pre,
                  0
                )}
              </span>
              件
            </span>
          </>
        }
        onOk={() => setItemCode('')}
        onCancel={() => setItemCode('')}
        cancelButtonProps={{
          className: 'global-modal-btn-cancel',
          type: 'link',
          style: { position: 'absolute', left: 0 },
          disabled: true,
        }}
        width={560}
      >
        <Table
          className="global-table"
          loading={confirmLoading}
          columns={columns_trace}
          pagination={false}
          dataSource={traceList}
          scroll={{ y: 200 }}
          rowKey={(record, index) => record.id}
        />
      </GlobalModal>
    </div>
  );
};

export default connect(({ account }) => ({ carData: account.carData }))(
  CarPage
);
