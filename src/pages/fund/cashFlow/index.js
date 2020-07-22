/*
 * @Date: 2020-07-22 11:01:06
 * @LastEditTime: 2020-07-22 16:31:43
 */

import React, { useState, useEffect } from "react";
import MapForm from "@/components/MapForm";
import {
  Form,
  Button,
  Row,
  message,
  Col,
  Table,
  Select,
  Pagination,
} from "antd";
import { fetchList, getInfo, modify } from "@/services/cashFlow";

const { CstInput, CstSelect, CstUpload } = MapForm;

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUM,
  CashFlowStatus,
  CashFlowBizTypes,
  CASH_FLOW_BIZTYPE_1,
  CASH_FLOW_BIZTYPE_2,
  CASH_FLOW_STATUS_1,
  CASH_FLOW_STATUS_2,
  CASH_FLOW_STATUS_3,
} from "@/const";

import noCashFlow from "@/assets/images/fund/no-cash-flow.png";
import _ from "lodash";
import { formateTime } from "@/utils";
import GlobalModal from "@/components/GlobalModal";
import { Icon } from "antd";

const colorMaps = {
  [CASH_FLOW_STATUS_1]: "#1A61DC",
  [CASH_FLOW_STATUS_2]: "#333333",
  [CASH_FLOW_STATUS_3]: "#D70000",
};

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
    offset: 1,
  },
};

const Content = ({ value }) => {
  const uploadButton = (
    <div style={{ fontSize: "12px", color: "#CCCCCC" }}>
      <Icon type="plus" />
      <div>点击上传</div>
    </div>
  );
  return value ? (
    <img
      src={process.env.FILE_URL + value}
      alt="avatar"
      style={{ width: "100%" }}
    />
  ) : (
    uploadButton
  );
};

const CashFlow = (props) => {
  const [filterForm, setFilterForm] = React.useState(null);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const [itemId, setItemId] = useState(0);
  const [item, setItem] = useState({});

  const [uploadVisible, setUploadVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const [uploadForm, setUploadForm] = React.useState(null);
  const [uploadFormData, setUploadFormData] = useState({});

  const [uploadLoading, setUploadLoading] = React.useState(false);

  useEffect(() => {
    initList();
  }, [currPage]);

  useEffect(() => {
    if (itemId) _getInfo();
  }, [itemId]);

  useEffect(() => {
    const { code, amount, bizType } = uploadFormData;
    if (uploadVisible) {
      uploadForm?.setFieldsValue({
        code,
        amountText:
          bizType === CASH_FLOW_BIZTYPE_1 ? `+${amount}` : `-${amount}`,
      });
    }
  }, [uploadForm]);

  /**
   * @name: 列表加载
   */
  const initList = async () => {
    try {
      const filterData = filterForm?.getFieldsValue();
      const queryParams = {
        pageSize,
        currPage,
        ...filterData,
      };
      setLoading(true);
      const [err, data, msg] = await fetchList(queryParams);
      setLoading(false);
      if (!err) {
        setList(data.list);
        setTotal(data.totalRecords);
      } else message.error(msg);
    } catch (error) {}
  };

  /**
   * @name: 详情
   */
  const _getInfo = async () => {
    try {
      const [err, data, msg] = await getInfo(itemId);
      if (!err) {
        setItem(data);
      } else message.error(msg);
    } catch (error) {}
  };

  /**
   * @name: 触发列表加载effect
   * @param {type}
   */
  const dispatchInit = (callback) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  /**
   * @name:
   * @param {type}
   */
  const handleUploadVisible = (item) => {
    setUploadVisible(true);
    setUploadFormData(item);
  };

  /**
   * @name: 回单提交
   * @param {type}
   */
  const handleUploadSubmit = () => {
    uploadForm?.validateFields(async (err, value) => {
      if (!err) {
        try {
          setUploadLoading(true);
          const [err, data, msg] = await modify(value);
          setUploadLoading(false);
          if (!err) {
            message.success("操作成功");
            setUploadVisible(false);
            dispatchInit();
          } else message.error(msg);
        } catch (error) {}
      }
    });
  };

  const columns = [
    {
      title: "交易时间",
      key: "id",
      render: (record) => formateTime(record.createTime),
      width: "20%",
    },
    {
      title: "业务订单号",
      align: "center",
      render: (record) => record.code,
      width: "20%",
    },
    {
      title: "业务类型",
      align: "center",
      render: (record) => CashFlowBizTypes[record.bizType],
      width: "10%",
    },
    {
      title: "状态",
      align: "center",
      render: (record) => (
        <span style={{ color: colorMaps[record.status] }}>
          {CashFlowStatus[record.status]}
        </span>
      ),
      width: "10%",
    },
    {
      title: "金额(元)",
      align: "center",
      render: (record) => (
        <span style={{ fontWeight: "bold" }}>
          {record.bizType === CASH_FLOW_BIZTYPE_1
            ? `+${record.amount}`
            : `-${record.amount}`}
        </span>
      ),
      width: "10%",
    },
    {
      title: "账户余额(元)",
      align: "center",
      render: (record) => (
        <span style={{ fontWeight: "bold" }}>{record.balance}</span>
      ),
      width: "10%",
    },
    {
      title: "操作",
      align: "center",
      render: (record) => (
        <>
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() => setItemId(record.id)}
          >
            详情
          </Button>
          <Button
            size="small"
            style={{ marginLeft: "10px" }}
            onClick={
              record.receiptUrl
                ? () => setImgUrl(record.receiptUrl)
                : () => handleUploadVisible(record)
            }
          >
            {record.receiptUrl ? "查看回单" : "上传回单"}
          </Button>
        </>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="cash-flow">
      <div className="cash-flow_header">{"资金管理 > 资金流水"}</div>
      <div className="cash-flow_filter">
        <MapForm
          className="filter-form"
          layout="horizontal"
          onCreate={setFilterForm}
        >
          <Row>
            <Col span={6}>
              <CstSelect
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="bizType"
                label="业务类型"
                customProps={{
                  placeholder: "选择业务类型",
                  size: "large",
                }}
              >
                {_.map(CashFlowBizTypes, (item, key) => (
                  <Select.Option key={key} value={key}>
                    {item}
                  </Select.Option>
                ))}
              </CstSelect>
            </Col>
            <Col span={6}>
              <CstSelect
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="status"
                label="处理状态"
                customProps={{
                  placeholder: "选择处理状态",
                  size: "large",
                }}
              >
                {_.map(CashFlowStatus, (item, key) => (
                  <Select.Option key={key} value={key}>
                    {item}
                  </Select.Option>
                ))}
              </CstSelect>
            </Col>
            <Col span={6}>
              <CstInput
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                name="code"
                label="业务订单号"
                customProps={{
                  placeholder: "输入订单号",
                  size: "large",
                }}
              />
            </Col>

            <Col span={5} offset={1}>
              <Form.Item>
                <Button
                  type="primary"
                  icon="search"
                  onClick={() => dispatchInit()}
                >
                  筛选
                </Button>
                <Button
                  icon="undo"
                  style={{ marginLeft: "10px" }}
                  onClick={() => filterForm?.resetFields()}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </MapForm>
      </div>
      <div className="cash-flow_table">
        <Table
          className="global-table"
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={list}
          rowClassName={() => "global-table_row-tr"}
          onHeaderRow={() => ({
            className: "global-table_head-tr",
          })}
          rowKey={(record, index) => record.id}
          locale={{
            emptyText: (
              <div className="cash-flow_empty">
                <img width="218px" height="134px" src={noCashFlow} />
                <p className="cash-flow_empty-text">暂无资金流水</p>
              </div>
            ),
          }}
        />
      </div>
      {!list.length ? null : (
        <div className="cash-flow_pagination">
          <Pagination
            current={currPage}
            onChange={(currPage) => setCurrPage(currPage)}
            defaultPageSize={pageSize}
            total={total}
          />
          <span className="cash-flow_pagination-data">
            共 {total} 条 ,每页 {pageSize} 条
          </span>
        </div>
      )}

      <GlobalModal
        modalVisible={!!itemId}
        // confirmLoading={pwdLoading}
        title={<div style={{ textAlign: "center" }}>资金流水详情</div>}
        cancelText="取消"
        onOk={() => setItemId(false)}
        onCancel={() => setItemId(false)}
        okText="确认"
        width={600}
      >
        <ul className="cash-flow_item-info">
          <li>
            <span className="cash-flow_item-info-title">金额：</span>
            <span>{item.amount}元</span>
          </li>
          <li>
            <span className="cash-flow_item-info-title">状态：</span>
            <span>{CashFlowStatus[item.status]}</span>
          </li>
          <li>
            <span className="cash-flow_item-info-title">开户银行：</span>
            <span>{item.bankName}</span>
          </li>
          <li>
            <span className="cash-flow_item-info-title">账户名称：</span>
            <span>{item.accountName}</span>
          </li>
          <li>
            <span className="cash-flow_item-info-title">汇款账号：</span>
            <span>{item.accountNo}</span>
          </li>
        </ul>
      </GlobalModal>
      <GlobalModal
        modalVisible={!!imgUrl}
        title={<div style={{ textAlign: "center" }}>查看回单</div>}
        width={600}
        footer={null}
        onCancel={() => setImgUrl("")}
      >
        <div style={{ height: "480px", overflow: "auto" }}>
          <img width="100%" src={process.env.FILE_URL + imgUrl} />
        </div>
      </GlobalModal>

      <GlobalModal
        modalVisible={uploadVisible}
        confirmLoading={uploadLoading}
        title={<div style={{ textAlign: "center" }}>上传回单</div>}
        width={600}
        onOk={handleUploadSubmit}
        onCancel={() => setUploadVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <MapForm
          layColWrapper={formItemLayout}
          labelAlign="right"
          onCreate={(form) => setUploadForm(form)}
        >
          <CstInput
            label="业务订单号"
            name="code"
            customProps={{
              placeholder: "请输入企业名称或昵称",
              size: "large",
              disabled: true,
            }}
          />
          <CstInput
            label="金额"
            name="amountText"
            customProps={{
              placeholder: "请输入账号/手机号",
              size: "large",
              disabled: true,
            }}
          />
          <CstUpload
            label="上传回单图片"
            name="receiptUrl"
            customProps={{
              action: `${process.env.FILE_URL}/upload`,
              method: "post",
              data: {
                userName: "yunjin_file_upload",
                password: "yunjin_upload_password",
                secret: "N",
                domain: "headicon",
              },
              className: "cash-flow_uploader",
              Content,
            }}
          />
        </MapForm>
      </GlobalModal>
    </div>
  );
};

export default CashFlow;
