/*
 * @Date: 2020-07-16 19:17:35
 * @LastEditTime: 2020-07-30 10:56:38
 */

import React, { useEffect, useState } from 'react';
import { getQueryVariable, getFloat } from '@/utils';
import {
  getProductMap,
  getGoodsSku,
  getGoodsInfo,
  submitOrder,
  addToCart,
} from '@/services/shop';
import { message, List, Avatar, Skeleton, Button, Tabs } from 'antd';
import { ProductTypes, PRODUCT_TYPE_4, TRANSTEMP, PRECISION } from '@/const';
import SkuPanel from './SkuPanel';
import { connect } from 'dva';
const { TabPane } = Tabs;
import _ from 'lodash';
import Car from '../components/Car';

const ShopItem = (props) => {
  const { history, dispatch } = props;

  const productTypeCode = getQueryVariable('productTypeCode');
  const brandCode = getQueryVariable('brandCode');
  const productCode = parseInt(getQueryVariable('productCode'));

  const [goodsLoading, setGoodsLoading] = useState(false);
  const [productListLoading, setProductListLoading] = useState(false);
  const [skuLoading, setSkuLoading] = useState(false);
  const [submitOrderLoading, setSubmitOrderLoading] = useState(false);
  const [submitCarLoading, setSubmitCarLoading] = useState(false);

  const [productList, setProductList] = useState([]);
  const [skuList, setSkuList] = useState([]);
  const [goodsInfo, setGoodsInfo] = useState({});

  const [productCodeSelect, setProductCodeSelect] = useState('');
  const [skuSelect, setSkuSelect] = useState('');
  const [count, setCount] = useState(1);

  const [skuCaches, setSkuCaches] = useState({});
  const [goodsInfoCaches, setGoodsInfoCaches] = useState({});
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    _getProductList();
  }, []);

  useEffect(() => {
    if (productList && productList.length)
      setProductCodeSelect(productCode || productList[0].productCode);
  }, [productList]);

  useEffect(() => {
    if (skuList.length) setSkuSelect(skuList[0].code);
  }, [skuList]);

  useEffect(() => {
    if (productCodeSelect) _getGoodsSku(productCodeSelect);
  }, [productCodeSelect]);

  useEffect(() => {
    if (skuSelect) _getGoodsInfo(skuSelect);
  }, [skuSelect]);

  /**
   * @name: 获取品牌下对应的商品列表
   * @param {type}
   */
  const _getProductList = async () => {
    try {
      setGoodsLoading(true);
      setProductListLoading(true);
      const [err, data, msg] = await getProductMap({
        productTypeCode,
        brandCode,
      });
      setProductListLoading(false);
      if (!err) {
        const ary = data[brandCode];
        setProductList(ary);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  /**
   * @name: 获取sku
   * @param {type}
   */
  const _getGoodsSku = async (productCode) => {
    const cacheObj = skuCaches[productCode];
    if (!_.isUndefined(cacheObj)) return setSkuList(cacheObj);
    try {
      setSkuLoading(true);
      const [err, data, msg] = await getGoodsSku(productCode);
      setSkuLoading(false);
      if (!err) {
        setSkuList(data);
        setSkuCaches({
          ...skuCaches,
          [productCode]: data,
        });
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  /**
   * @name: 通过sku code 获取商品信息
   * @param {type}
   */
  const _getGoodsInfo = async (productSubCode) => {
    try {
      const cacheObj = goodsInfoCaches[productSubCode];
      if (!_.isUndefined(cacheObj)) return setGoodsInfo(cacheObj);
      setGoodsLoading(true);
      const [err, data, msg] = await getGoodsInfo({
        productSubCode,
        productTypeCode,
      });
      setGoodsLoading(false);
      if (!err) {
        setGoodsInfo(data);
        setGoodsInfoCaches({
          ...goodsInfoCaches,
          [productSubCode]: data,
        });
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.log('_getGoodsInfo -> error', error);
    }
  };

  /**
   * @name: 立即购买 | 加入购物车
   * @param {type}
   */
  const _submitOrder = async (isBuy) => {
    try {
      const productType = parseInt(goodsInfo?.productTypeCode);
      if (productType === PRODUCT_TYPE_4 && !fileList.length)
        return message.error('请上传充值账号');

      const paramsObj = {
        goodsCode: goodsInfo?.code,
        productType,
        amount: productType === PRODUCT_TYPE_4 ? undefined : count,
        batchFileUrl:
          productType === PRODUCT_TYPE_4 ? fileList[0].url : undefined,
      };

      const api = isBuy ? submitOrder : addToCart;
      const loading = isBuy ? setSubmitOrderLoading : setSubmitCarLoading;

      loading(true);
      const [err, data, msg] = await api(paramsObj);
      loading(false);

      if (!err) {
        if (isBuy) history.push(`/admin/pay?orderId=${data.orderId}`);
        else
          dispatch({
            type: 'account/setCarData',
          });
      } else message.error(msg);
    } catch (error) {}
  };

  return (
    <div className="shop-item">
      <div className="shop-item_product-info">
        <div className="shop-item_header">权益商城 / 商品详情</div>
        <div
          style={{
            marginLeft: '50px',
            marginRight: '218px',
            marginTop: '30px',
          }}
        >
          <Skeleton
            loading={goodsLoading}
            active
            avatar
            paragraph={{ rows: 2 }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={100}
                  src={`/file/${goodsInfo?.iconUrl}`}
                />
              }
              title={goodsInfo?.productSub?.product?.brand?.name}
              description={
                <div className="shop-item_description">
                  <div className="shop-item_description-title">
                    <span>{goodsInfo?.productSub?.product?.brand?.resume}</span>
                    <span style={{ position: 'relative' }}>
                      <span className="shop-item_description-price">
                        <span style={{ fontSize: '16px' }}>￥</span>
                        {getFloat(goodsInfo?.price / TRANSTEMP, PRECISION)}
                      </span>
                      <span className="shop-item_description-price--old">
                        [ ￥
                        {getFloat(
                          goodsInfo?.productSub?.facePrice / TRANSTEMP,
                          PRECISION
                        )}{' '}
                        ]
                      </span>
                      <span className="shop-item_description-code">
                        商品代码：{goodsInfo?.code}
                      </span>
                    </span>
                  </div>
                  <div className="shop-item_description-type">
                    {ProductTypes[productTypeCode]}
                  </div>
                </div>
              }
            />
          </Skeleton>
        </div>
        <SkuPanel
          productListLoading={productListLoading}
          skuLoading={skuLoading}
          productList={productList}
          skuList={skuList}
          goodsInfo={goodsInfo}
          productCodeSelect={productCodeSelect}
          skuSelect={skuSelect}
          fileList={fileList}
          setFileList={setFileList}
          onFilterChange={({ productCodeSelect, skuSelect, count }) => {
            if (productCodeSelect) setProductCodeSelect(productCodeSelect);
            else if (skuSelect) setSkuSelect(skuSelect);
            else setCount(count);
          }}
        />
        {count > goodsInfo?.singleBuyLimit && (
          <div
            style={{
              margin: '20px 180px',
              lineHeight: '14px',
              color: '#CC0000',
            }}
          >
            您所填写的商品数量超过库存！
          </div>
        )}
        <div style={{ margin: '30px 0 0 180px' }}>
          <Button
            type="primary"
            disabled={count > goodsInfo?.singleBuyLimit}
            onClick={() => _submitOrder(true)}
            loading={submitOrderLoading}
          >
            立即购买
          </Button>
          <Button
            style={{ marginLeft: '30px' }}
            disabled={count > goodsInfo?.singleBuyLimit}
            onClick={() => _submitOrder(false)}
            loading={submitCarLoading}
          >
            加入购物车
          </Button>
        </div>
      </div>
      <div className="shop-item_tabs">
        <Tabs className="global-tabs" defaultActiveKey="" type="card">
          <TabPane tab="购买须知" key="1">
            {goodsInfo?.purchaseNotes}
          </TabPane>
          <TabPane tab="使用说明" key="2">
            {goodsInfo?.usageIllustration}
            {/* <div
              dangerouslySetInnerHTML={{ __html: goodsInfo?.usageIllustration }}
            /> */}
          </TabPane>
        </Tabs>
      </div>

      <Car />
    </div>
  );
};

export default connect()(ShopItem);
