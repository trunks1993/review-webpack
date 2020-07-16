/*
 * @Date: 2020-07-02 19:14:16
 * @LastEditTime: 2020-07-16 19:26:24
 */

import React, { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";

import shopHomeBg from "@/assets/images/shop/shopHomeBg.png";
import {
  getCategoryList,
  getProductTypeList,
  getBrandList,
  getProductMap,
} from "@/services/shop";
import { message, Pagination, List, Avatar, Card, Skeleton } from "antd";
import ProductWrapper from "./ProductWrapper";

export default (props) => {
  const { history } = props;

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [productTypeLoading, setProductTypeLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);

  const [brandList, setBrandList] = useState([]);
  const [total, setTotal] = useState(0);

  const [list, setList] = useState([]);

  const [filterParams, setFilterParams] = useState({
    categoryCode: "",
    productTypeCode: "",
    currPage: 1,
    pageSize: 6,
  });

  useEffect(() => {
    initCategoryList();
    initProductTypeList();
  }, []);

  useEffect(() => {
    if (filterParams.categoryCode && filterParams.productTypeCode) initList();
  }, [filterParams]);

  useEffect(() => {
    if (brandList.length) initProductMap();
  }, [brandList]);

  const onFilterChange = (categoryCode, productTypeCode) => {
    if (categoryCode && productTypeCode) {
      setFilterParams({
        ...filterParams,
        currPage: 1,
        categoryCode,
        productTypeCode,
      });
    }
  };

  const initCategoryList = async () => {
    try {
      setCategoryLoading(true);
      const [err, data, msg] = await getCategoryList();
      setCategoryLoading(false);
      if (!err) {
        setCategoryList(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initProductTypeList = async () => {
    try {
      setProductTypeLoading(true);
      const [err, data, msg] = await getProductTypeList();
      setProductTypeLoading(false);
      if (!err) {
        setProductTypeList(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initList = async () => {
    try {
      setLoading(true);
      const [err, data, msg] = await getBrandList(filterParams);
      +setLoading(false);
      if (!err) {
        setBrandList(data.list);
        setTotal(data.totalRecords);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initProductMap = async () => {
    try {
      setLoading(true);
      const [err, data, msg] = await getProductMap({
        productTypeCode: filterParams.productTypeCode,
        brandCodes: _.map(brandList, (item) => item.brandCode).toString(),
      });
      setLoading(false);
      if (!err) {
        setList(
          _.map(brandList, (item) => {
            item.productList = data[item.brandCode];
            return item;
          })
        );
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  return (
    <div className="shop-home">
      <img width="1010px" height="180px" src={shopHomeBg} />
      <FilterPanel
        categoryLoading={categoryLoading}
        productTypeLoading={productTypeLoading}
        categoryList={categoryList}
        productTypeList={productTypeList}
        onFilterChange={onFilterChange}
      />
      <List
        loading={categoryLoading || productTypeLoading}
        locale={{ emptyText: "暂无数据" }}
        grid={{
          column: 3,
          gutter: 10,
        }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            key={item.brandCode}
            style={{ marginBottom: "10px" }}
            onClick={() => {
              history.push("/admin/shop/item");
            }}
          >
            <Card>
              <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
                <List.Item.Meta
                  avatar={<Avatar size={60} src={`/file${item.iconUrl}`} />}
                  title={item.brandName}
                  description={<span title={item.resume}>{item.resume}</span>}
                />
              </Skeleton>

              <ProductWrapper
                loading={loading}
                productList={item.productList}
                history={history}
              />
            </Card>
          </List.Item>
        )}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Pagination
          disabled={loading}
          current={filterParams.currPage}
          onChange={(currPage) =>
            setFilterParams({
              ...filterParams,
              currPage,
            })
          }
          defaultPageSize={6}
          total={total}
        />
        <span style={{ color: "#CCCCCC", marginLeft: "10px" }}>
          共{total}条
        </span>
      </div>
    </div>
  );
};
