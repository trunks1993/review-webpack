/*
 * @Author: Dad
 * @Date: 2020-07-17 15:52:50
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-17 20:26:00
 */

import React, { useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import MapForm from '@/components/MapForm';
import { modifyApplication, getApplication } from '@/services/businessInfo';
import { patternUrl } from '@/rules';
import { getQueryVariable } from '@/utils/index';
import { createHashHistory } from 'history';
const history = createHashHistory();

const { CstInput } = MapForm;
const HELP_MSG_UNLOGIN = (
  <>
    该接口开放给客户端，通过生成免登录URL与平台同步信息，查看
    <a style={{ color: '#1a61dc' }}>技术文档</a>
  </>
);
const HELP_MSG_CALLBACKURL = (
  <>
    该接口用来向您的服务器反馈交易结果，查看
    <a style={{ color: '#1a61dc' }}>技术文档</a>
  </>
);
const HELO_MSG_VIRTUAL = (
  <>
    该接口用来向您的服务器发起虚拟商品充值请求，查看
    <a style={{ color: '#1a61dc' }}>技术文档</a>
  </>
);

const interfaceConfig = ({ jumpMonitor, loading }) => {
  const [form, setForm] = useState({});
  const [appId, setId] = useState(getQueryVariable('appId'));
  const [helpMsg, setHelpMsg] = useState({
    unLogin: HELP_MSG_UNLOGIN,
    callbackUrl: HELP_MSG_CALLBACKURL,
    virtualChargeUrl: HELO_MSG_VIRTUAL,
  });

  useEffect(() => {
    if (_.isEmpty(form)) return;
    getApp();
  }, [form]);

  /** 保存配置 */
  const handleSubmit = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        try {
          const [err, values, msg] = await modifyApplication(value);
          if (!err) {
            history.push('/admin/operations/businessInfo/application');
          }
        } catch (error) {}
      }
    });
  };

  /** 获取配置 */
  const getApp = async () => {
    try {
      const [err, data, msg] = await getApplication({ appId });
      if (!err) {
          console.log(data.callbackUrl)
        form.setFieldsValue({
          ['callbackUrl']: data.callbackUrl,
          ['nologinUrl']: data.nologinUrl,
          ['virtualRecharge']: data.virtualRecharge,
        });
      }
    } catch (error) {}
  };
  
  return (
    <div className="interfaceConfig">
      <div className="interfaceConfig-title">
        请务必保持下面接口可用,否则你的应用将不能正常工作.带*选项为必填项,其余则为选填.为了实时监控由于您的服务器异常产生的异常订单,请在
        <Button
          type="link"
          className="interfaceConfig-title--but"
          onClick={() => jumpMonitor()}
        >
          异常监控
        </Button>
        {',设置异常提醒方式'}
      </div>
      <div className="interfaceConfig-content">
        <MapForm
          className="global-form global-edit-form"
          onCreate={(form) => setForm(form)}
        >
          <CstInput
            name="appId"
            defaultValue={appId}
            style={{ display: 'none' }}
          />
          <CstInput
            label="免登录接口:"
            defaultValue="http://"
            placeholder="http://"
            name="nologinUrl"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            help={helpMsg.unLogin}
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (value && !patternUrl.test(value)) {
                    setHelpMsg({
                      ...helpMsg,
                      unLogin: '免登录接口地址格式有误',
                    });
                    callback(new Error('免登录接口地址格式有误'));
                  } else {
                    setHelpMsg({ ...helpMsg, unLogin: HELP_MSG_UNLOGIN });
                    callback();
                  }
                },
              },
            ]}
          />
          <div className="interfaceConfig-content--border"></div>
          <CstInput
            label="结果通知:"
            placeholder="http://"
            defaultValue="http://"
            name="callbackUrl"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            rules={[
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (!value) {
                    setHelpMsg({
                      ...helpMsg,
                      callbackUrl: '结果通知地址不能为空',
                    });
                    callback(new Error('结果通知地址不能为空'));
                  } else if (!patternUrl.test(value)) {
                    setHelpMsg({
                      ...helpMsg,
                      callbackUrl: '结果通知地址格式有误',
                    });
                    callback(new Error('结果通知地址格式有误'));
                  } else {
                    setHelpMsg({
                      ...helpMsg,
                      callbackUrl: HELP_MSG_CALLBACKURL,
                    });
                    callback();
                  }
                },
              },
            ]}
            help={helpMsg.callbackUrl}
          />
          <div className="interfaceConfig-content--border"></div>
          <CstInput
            label="虚拟商品充值："
            defaultValue="http://"
            placeholder="http://"
            name="virtualChargeUrl"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            help={helpMsg.virtualChargeUrl}
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (value && !patternUrl.test(value)) {
                    setHelpMsg({
                      ...helpMsg,
                      virtualChargeUrl: '虚拟商品充值地址格式有误',
                    });
                    callback(new Error('虚拟商品充值地址格式有误'));
                  } else {
                    setHelpMsg({
                      ...helpMsg,
                      virtualChargeUrl: HELO_MSG_VIRTUAL,
                    });
                    callback();
                  }
                },
              },
            ]}
          />
          <Form.Item
            colon={false}
            label=" "
            labelCol={{ span: 3 }}
            style={{ marginTop: '30px' }}
          >
            <Button loading={loading} type="primary" onClick={handleSubmit}>
              保存配置
            </Button>
          </Form.Item>
        </MapForm>
      </div>
    </div>
  );
};
export default interfaceConfig;
