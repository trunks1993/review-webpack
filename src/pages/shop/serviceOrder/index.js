/*
 * @Date: 2020-07-02 20:14:30
 * @LastEditTime: 2020-07-24 12:12:53
 */

import React, { useState } from "react";
import { Tabs, Table, Input } from "antd";
const { TabPane } = Tabs;
import noServiceOrder from "@/assets/images/shop/no-service-order.png";

const TabsPanel = (props) => {
  const { onChange, children } = props;
  return (
    <Tabs defaultActiveKey="" onChange={onChange}>
      <TabPane tab="待审核" key="">
        {children}
      </TabPane>
      <TabPane tab="已完成" key="1">
        {children}
      </TabPane>
      <TabPane tab="已拒绝" key="2">
        {children}
      </TabPane>
    </Tabs>
  );
};

export default (props) => {
  const [filterParams, setFilterParams] = useState({
    currPage: 1,
    pageSize: 10000,
    code: "",
    status: "",
  });

  const columns = [
    {
      title: "商品详情",
      align: "center",
      render: (record) => record.code,
      width: "20%",
    },
    {
      title: "单价",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "数量",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "类型",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "退款金额(元)",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "状态",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "售后类型",
      align: "center",
      render: (record) => record.code,
      width: "10%",
    },
    {
      title: "操作",
      align: "center",
      render: (record) => <></>,
      width: "20%",
    },
  ];
  return (
    <div className="service-order">
      <div className="service-order_header">{"星权益 > 售后订单"}</div>
      <div className="service-order_content">
        <TabsPanel
          onChange={(status) =>
            setFilterParams({
              ...filterParams,
              status,
            })
          }
        >
          <Table
            className="global-table check-box-rectangle"
            columns={columns}
            pagination={false}
            dataSource={[]}
            rowClassName={() => "global-table_row-tr"}
            locale={{
              emptyText: (
                <div className="service-order_empty">
                  <img width="218px" height="134px" src={noServiceOrder} />
                  <p className="service-order_empty-text">暂无售后订单</p>
                </div>
              ),
            }}
            onHeaderRow={() => ({
              className: "global-table_head-tr",
            })}
            rowKey={(record, index) => record.id}
          />
        </TabsPanel>
        <span className="service-order_content-search">
          <Input.Search
            placeholder="商品名称/退货单号/订单号"
            onSearch={(value) => console.log(value)}
            enterButton="查询"
          />
        </span>
      </div>
    </div>
  );
};
