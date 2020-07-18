/*
 * @Date: 2020-07-17 14:57:09
 * @LastEditTime: 2020-07-18 15:48:16
 */

import React, { useState, useEffect } from "react";
import { Skeleton, Upload, Button, Icon, message } from "antd";
import InputNumber from "@/components/InputNumber";
import { PRODUCT_TYPE_4 } from "@/const";

export default (props) => {
  const {
    productList,
    skuList,
    onFilterChange,
    productListLoading,
    skuLoading,
    goodsInfo,

    productCodeSelect,
    skuSelect,
    fileList,
    setFileList,
  } = props;

  const uploadProps = {
    name: "file",
    action: `${process.env.FILE_URL}/upload`,
    methods: "post",
    data: {
      userName: "yunjin_file_upload",
      password: "yunjin_upload_password",
      secret: "Y",
      domain: "cart",
    },
    multiple: false,
    onChange(info) {
      let fileList = [...info.fileList];
      // 1. Limit the number of uploaded files
      // Only to show one recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);
      // 2. Read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(fileList);
    },
  };

  return (
    <div className="shop-item_sku-panel">
      <ul>
        <li className="shop-item_sku-panel-item border-t-b">
          <span className="sku-panel-item_title">选择商品</span>
          <ul className="sku-panel-item_selection">
            <Skeleton
              loading={productListLoading}
              active
              title={false}
              paragraph={{ rows: 2 }}
            >
              {_.map(productList, (item) => (
                <li
                  className={
                    productCodeSelect === item.productCode ? "active" : ""
                  }
                  onClick={() =>
                    onFilterChange({ productCodeSelect: item.productCode })
                  }
                  key={item.productCode}
                >
                  {item.productName}
                </li>
              ))}
            </Skeleton>
          </ul>
        </li>
        <li className="shop-item_sku-panel-item">
          <span className="sku-panel-item_title">商品规格</span>
          <ul className="sku-panel-item_selection">
            <Skeleton
              loading={skuLoading}
              active
              title={false}
              paragraph={{ rows: 2 }}
            >
              {_.map(skuList, (item) => (
                <li
                  className={skuSelect === item.code ? "active-no-img" : ""}
                  onClick={() => onFilterChange({ skuSelect: item.code })}
                  key={item.code}
                >
                  {item.name}
                </li>
              ))}
            </Skeleton>
          </ul>
        </li>
        {goodsInfo?.productTypeCode !== PRODUCT_TYPE_4 ? (
          <li className="shop-item_sku-panel-item border-b">
            <div className="count-line"></div>
            <span
              className="sku-panel-item_title"
              style={{ lineHeight: "30px" }}
            >
              商品数量
            </span>
            <span style={{ marginLeft: "30px" }}>
              <InputNumber
                style={{ marginLeft: "30px" }}
                min={1}
                max={goodsInfo?.singleBuyLimit}
                defaultValue={1}
                onChange={(val) => onFilterChange({ count: val })}
              />
            </span>
          </li>
        ) : (
          <li className="shop-item_sku-panel-item border-t-b">
            <span
              className="sku-panel-item_title"
              style={{ lineHeight: "30px" }}
            >
              <span style={{ color: "#CC0000" }}>*</span>批量文件
            </span>
            <span style={{ marginLeft: "26px" }}>
              <span style={{ display: "inline-block" }}>
                <Upload {...uploadProps} fileList={fileList}>
                  <Button>
                    <Icon type="upload" />
                    上传文件
                  </Button>
                </Upload>
              </span>
              <span className="sku-panel-item_upload-temp">
                请下载导入模板
                <Button
                  type="link"
                  style={{ padding: "0 5px", fontSize: "12px" }}
                  onClick={() => {
                    window.open(
                      `${process.env.FILE_URL}/data/static/template/recharge.xlsx`
                    );
                  }}
                >
                  EXCEL模板
                </Button>
              </span>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
