/*
 * @Author: Dad
 * @Date: 2020-07-17 20:59:45
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-28 09:42:23
 */

import React, { useState, useEffect } from 'react';
import { Tabs, Form, Button, Row, Col, Icon, message, Spin } from 'antd';
import MapForm from '@/components/MapForm';
import Head from '@/assets/images/operations/head.png';
import Mian from '@/assets/images/operations/mian.png';
import { patternIdCard, patternName, patternPhone } from '@/rules';
import { FILE_ERROR_SIZE, FILE_ERROR_TYPE } from '@/components/GlobalUpload';
import {
  addIdentifyWorkorder,
  getMerchantBaseInfo,
  getLatestIdentifyWorkorder,
} from '@/services/businessInfo';
import Success from './success';
import _ from 'lodash';
import {
  USER_TYPE_1,
  USER_TYPE_2,
  MERCHANT_STATUS_0,
  MERCHANT_STATUS_1,
  MERCHANT_STATUS_2,
  MERCHANT_STATUS_3,
} from '@/const';

const { CstInput, CstUpload } = MapForm;

const certification = () => {
  const [tabKey, setTabKey] = useState();
  const [type, setType] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [Inputdisabled, setInputdisabled] = useState(false);
  const [butVisible, setButVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [helpMsg, setHelpMsg] = useState(
    '需清晰展示五官和文字信息， 支持2M以内的PNG、JPEG、GIF格式'
  );
  const [rejectText, setRejectText] = useState(
    '您尚未完成实名认证，请根据实际情况选择填写。'
  );
  const [rejectTextType, setRejectTextType] = useState(false);
  const [helpMsag, setHelpMsag] = useState();
  const [typeData, setTypeData] = useState({});
  const [stateData, setStateData] = useState({});

  useEffect(() => {
    if (_.isEmpty(form)) return;
    const data = JSON.parse(stateData.data);
    console.log(data);
    form.setFieldsValue({ ...data });
  }, [loading]);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    if (typeData?.identityState === 0) form.setFieldsValue();
    form.resetFields();
  }, [tabKey]);

  useEffect(() => {
    getMerchantBase();
  }, []);

  useEffect(() => {
    if (_.isEmpty(typeData)) return;
    getLatestIdentify();
  }, [typeData]);

  useEffect(() => {
    if (_.isEmpty(stateData)) return;
    setTabKey(stateData?.identifyType.toString());
    ToolMap[typeData.identityState](stateData);
    // setInterval(() => {
    setLoading(false);
    // }, 2000);
  }, [stateData]);

  // 提交
  const handleSubmit = () => {
    form.validateFields(async (err, value) => {
      console.log(value);
      if (!err) {
        const [errs, datas, msg] = await addIdentifyWorkorder({
          ...value,
          data: {
            ...value,
          },
        });
        message.success('实名认证信息已提交成功');
        setType(true);
        setRejectTextType(false);
      }
    });
  };

  // 获取用户身份
  const getMerchantBase = async () => {
    try {
      const [err, data, msg] = await getMerchantBaseInfo();
      if (!err) setTypeData(data);
    } catch (error) {}
  };

  // 获取用户状态
  const getLatestIdentify = async () => {
    try {
      const [err, data, msg] = await getLatestIdentifyWorkorder();
      if (!err) setStateData(data);
      if (_.isEmpty(data)) setTabKey('2');
    } catch (error) {}
  };

  const ToolMap = {
    [MERCHANT_STATUS_0]: () => {
      setRejectTextType(0);
      setDisabled(false);
      setTabKey('2');
    },
    [MERCHANT_STATUS_1]: () => {
      setRejectTextType(false);
      setType(true);
    },
    [MERCHANT_STATUS_2]: (state) => {
      setRejectText(state?.rejectText);
      setRejectTextType(2);
    },
    [MERCHANT_STATUS_3]: () => {
      setRejectTextType(0);
      setRejectText('您已完成实名认证。');
      setInputdisabled(true);
      setButVisible(false);
    },
  };

  const Content = ({ value }) => {
    const uploadButton = (
      <div style={{ fontSize: '12px', color: '#CCCCCC' }}>
        <Icon type="plus" />
        <div>点击上传</div>
      </div>
    );
    return value ? (
      <img
        src={process.env.FILE_URL + value}
        alt="avatar"
        style={{ height: 136 }}
      />
    ) : (
      uploadButton
    );
  };

  return (
    <>
      <div className="shop-item_header">业务管理 / 实名认证</div>
      <div className="certification">
        {rejectTextType === 0 ? (
          <div className="certification-title" style={{ color: '#fbbb66' }}>
            <div>
              <Icon type="info-circle" theme="filled" />
              {'温馨提示： '}
              {rejectText}
            </div>
          </div>
        ) : rejectTextType === 2 ? (
          <div className="certification-title" style={{ color: '#ea0000' }}>
            <div>
              <Icon type="close-circle" theme="filled" />
              {'认证未通过： '}
              {rejectText}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="certification-border">
          <Tabs
            className="configApp-content global-tabs"
            type="card"
            activeKey={tabKey}
            onChange={(Key) => {
              setTabKey(Key.toString());
            }}
          >
            <Tabs.TabPane tab={'企业认证'} disabled={disabled} key="2">
              <div style={{ margin: '30px 0px' }}>
                {/* {loading ? (
                  // <Success
                  //   title={'企业认证信息提交成功！'}
                  //   desc={'企业认证信息已提交成功，平台正在进行审核……'}
                  // />
                  <Spin />
                ) : ( */}
                  <MapForm
                    className="global-form global-edit-form"
                    onCreate={(form) => setForm(form)}
                    className="filter-form"
                  >
                    <CstInput
                      name="identifyType"
                      defaultValue={tabKey}
                      style={{ display: 'none' }}
                    />
                    <CstInput
                      label="企业名称:"
                      name="appname"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入姓名',
                        maxLength: '32',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '企业名称不能为空' },
                        {
                          pattern: new RegExp(patternName),
                          message: '数据格式错误',
                        },
                      ]}
                    />
                    <CstInput
                      label="统一社会信用代码:"
                      name="desc"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入统一社会信用代码',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '统一社会信用代码不能为空' },
                      ]}
                    />
                    <CstUpload
                      name="img"
                      label="企业证件图片:"
                      help={helpMsg}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 17 }}
                      rules={[
                        {
                          validator: (rule, value, callback) => {
                            if (value === FILE_ERROR_TYPE) {
                              setHelpMsg('文件格式错误');
                              callback(new Error('文件格式错误'));
                            } else if (value === FILE_ERROR_SIZE) {
                              setHelpMsg('文件大小不能超过2M');
                              callback(new Error('文件大小不能超过2M'));
                            } else {
                              setHelpMsg(
                                '请将通过年检的证件原件或者盖章的复印件扫描后上传, 支持2M以内的PNG、JPEG、GIF格式'
                              );
                              callback();
                            }
                          },
                        },
                        { required: true, message: '企业证件图片不能为空' },
                      ]}
                      customProps={{
                        action: `${process.env.FILE_URL}/upload`,
                        method: 'POST',
                        data: {
                          userName: 'yunjin_file_upload',
                          password: 'yunjin_upload_password',
                          domain: 'identify',
                          secret: 'Y',
                        },
                        className: 'layout_uploader',
                        Content,
                        multiple: 'true',
                        uploadName: '请上传身份证的头像面',
                        disabled: Inputdisabled,
                      }}
                    />
                    <CstInput
                      label="联系人:"
                      name="userName"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入联系人',
                        maxLength: '16',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '联系人不能为空' },
                        {
                          pattern: new RegExp(patternName),
                          message: '数据格式错误',
                        },
                      ]}
                    />
                    <CstInput
                      label="联系电话:"
                      name="mobile"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入联系电话',
                        maxLength: '16',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '联系电话不能为空' },
                        {
                          pattern: new RegExp(patternPhone),
                          message: '数据格式错误',
                        },
                      ]}
                    />
                    {butVisible ? (
                      <Form.Item
                        colon={false}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10, offset: 4 }}
                      >
                        <Button
                          type="primary"
                          onClick={handleSubmit}
                          type="primary"
                          disabled={Inputdisabled}
                        >
                          提交
                        </Button>
                      </Form.Item>
                    ) : (
                      ''
                    )}
                  </MapForm>
                )
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'个人认证'} disabled={disabled} key="1">
              <div style={{ margin: '30px 0px' }}>
                {type ? (
                  <Success
                    title={'个人认证信息提交成功！'}
                    desc={'个人身份证信息已提交成功，平台正在进行审核……'}
                  />
                ) : (
                  <MapForm
                    className="global-form global-edit-form"
                    onCreate={(form) => setForm(form)}
                    className="filter-form"
                  >
                    <CstInput
                      name="identifyType"
                      defaultValue={tabKey}
                      style={{ display: 'none' }}
                    />
                    <Row>
                      <Col span={10} push={2}>
                        <CstUpload
                          name="idCardFront"
                          label="应用logo:"
                          help={helpMsg}
                          labelCol={{ span: 5 }}
                          wrapperCol={{ span: 17 }}
                          rules={[
                            {
                              validator: (rule, value, callback) => {
                                if (value === FILE_ERROR_TYPE) {
                                  setHelpMsg('文件格式错误');
                                  callback(new Error('文件格式错误'));
                                } else if (value === FILE_ERROR_SIZE) {
                                  setHelpMsg('文件大小不能超过2M');
                                  callback(new Error('文件大小不能超过2M'));
                                } else {
                                  setHelpMsg(
                                    '需清晰展示五官和文字信息， 支持2M以内的PNG、JPEG、GIF格式'
                                  );
                                  callback();
                                }
                              },
                            },
                            {
                              required: true,
                              message: '身份证正面照片不能为空',
                            },
                          ]}
                          customProps={{
                            action: `${process.env.FILE_URL}/upload`,
                            method: 'POST',
                            data: {
                              userName: 'yunjin_file_upload',
                              password: 'yunjin_upload_password',
                              domain: 'identify',
                              secret: 'Y',
                            },
                            className: 'layout_uploader',
                            Content,
                            multiple: 'true',
                            uploadName: '请上传身份证的头像面',
                            disabled: Inputdisabled,
                          }}
                        />
                      </Col>
                      <Col span={4} push={2}>
                        <img src={Head} alt="" />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10} push={2}>
                        <CstUpload
                          name="idCardBack"
                          help={helpMsag}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 17, offset: 5 }}
                          rules={[
                            {
                              validator: (rule, value, callback) => {
                                if (value === FILE_ERROR_TYPE) {
                                  setHelpMsag('文件格式错误');
                                  callback(new Error('文件格式错误'));
                                } else if (value === FILE_ERROR_SIZE) {
                                  setHelpMsag('文件大小不能超过2M');
                                  callback(new Error('文件大小不能超过2M'));
                                } else {
                                  callback();
                                }
                              },
                            },
                            {
                              required: true,
                              message: '身份证正面照片不能为空',
                            },
                          ]}
                          customProps={{
                            action: `${process.env.FILE_URL}/upload`,
                            method: 'POST',
                            data: {
                              userName: 'yunjin_file_upload',
                              password: 'yunjin_upload_password',
                              domain: 'identify',
                              secret: 'Y 4',
                            },
                            listType: 'picture-card',
                            multiple: 'true',
                            uploadName: '请上传身份证的国徽面',
                            showUploadList: false,
                            disabled: Inputdisabled,
                            className: 'layout_uploader',
                            Content,
                          }}
                        />
                      </Col>
                      <Col span={4} push={2}>
                        <img src={Mian} alt="" />
                      </Col>
                    </Row>
                    <CstInput
                      label="姓名:"
                      name="userName"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入姓名',
                        maxLength: '16',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '姓名不能为空' },
                        {
                          pattern: new RegExp(patternName),
                          message: '数据格式错误',
                        },
                      ]}
                    />
                    <CstInput
                      label="身份证号码:"
                      name="userId"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 7 }}
                      customProps={{
                        placeholder: '请输入身份证号码',
                        maxLength: '18',
                        size: 'large',
                        disabled: Inputdisabled,
                      }}
                      rules={[
                        { required: true, message: '身份证号码不能为空' },
                        {
                          pattern: new RegExp(patternIdCard),
                          message: '数据格式错误',
                        },
                      ]}
                    />
                    {butVisible ? (
                      <Form.Item
                        colon={false}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10, offset: 4 }}
                      >
                        <Button
                          type="primary"
                          onClick={handleSubmit}
                          className="filter_button--blue"
                          disabled={Inputdisabled}
                        >
                          提交
                        </Button>
                      </Form.Item>
                    ) : (
                      ''
                    )}
                  </MapForm>
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default certification;
