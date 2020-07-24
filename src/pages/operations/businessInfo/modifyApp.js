/*
 * @Author: Dad
 * @Date: 2020-07-16 16:48:10
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-24 16:48:44
 */
import React, { useState, useEffect } from 'react';
import MapForm from '@/components/MapForm';
import { Form, Button, message, Icon } from 'antd';
import _ from 'lodash';
import { FILE_ERROR_SIZE, FILE_ERROR_TYPE } from '@/components/GlobalUpload';
import {
  modifyApplication,
  addApplication,
  getApplication,
} from '@/services/businessInfo';
import { getQueryVariable } from '@/utils';
import { createHashHistory } from 'history';
const history = createHashHistory();

const { CstInput, CstTextArea, CstUpload } = MapForm;

const HELP_MSG_ICONURL = '建议尺寸：800*800像素，大小不超过1M的JPEG、PNG图片';

const formItemLayout = {
  labelCol: {
    span: 2,
    offset: 3,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    span: 8,
    offset: 5,
  },
};

const modifyApp = () => {
  const [form, setForm] = useState({});
  const [modifyAppType, setModifyAppType] = useState(true);
  const [appId, setAppId] = useState('');
  const [helpMsg, setHelpMsg] = useState({
    iconUrl: HELP_MSG_ICONURL,
  });

  // 判断页面是创建应用还是修改应用
  useEffect(() => {
    if (_.isEmpty(getQueryVariable('appId'))) return;
    setAppId(getQueryVariable('appId'));
    setModifyAppType(false);
  }, []);

  // 更新form表单内容
  useEffect(() => {
    if (!_.isEmpty(form)) getAppInfo();
  }, [form]);

  // 设置应用
  const modifyApp = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        let [errs, data, msg] = '';
        try {
          if (_.isEmpty(appId)) {
            [errs, data, msg] = await addApplication(value);
          } else {
            [errs, data, msg] = await modifyApplication({ ...value, appId });
          }

          if (!errs) {
            message.success('操作成功');
            history.push('/admin/operations/businessInfo/application');
          }
        } catch (error) {}
      }
    });
  };

  /** 获取应用信息 */
  const getAppInfo = async () => {
    try {
      const [err, data, msg] = await getApplication({ appId });
      form.setFieldsValue({
        ['iconUrl']: data?.iconUrl,
        ['appName']: data?.appName,
        ['resume']: data?.resume,
        ['remark']: data?.remark,
      });
    } catch (error) {}
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
        style={{ height: 50 }}
      />
    ) : (
      uploadButton
    );
  };

  return (
    <>
      <div className="shop-item_header">
        业务管理 / {modifyAppType ? '创建应用' : '修改应用'}
      </div>
      <div className="modifyApp">
        <div className="modifyApp-title">
          {modifyAppType ? '创建应用' : '修改应用'}
        </div>
        <MapForm
          layColWrapper={formItemLayout}
          labelAlign="left"
          onCreate={(form) => setForm(form)}
          className="filter-form"
        >
          <CstUpload
            name="iconUrl"
            label="应用logo:"
            help={helpMsg.iconUrl}
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (value === FILE_ERROR_TYPE) {
                    setHelpMsg({ ...helpMsg, iconUrl: '文件格式错误' });
                    callback(new Error('文件格式错误'));
                  } else if (value === FILE_ERROR_SIZE) {
                    setHelpMsg({ ...helpMsg, iconUrl: '文件大小不能超过2M' });
                    callback(new Error('文件大小不能超过2M'));
                  } else {
                    setHelpMsg({ ...helpMsg, iconUrl: HELP_MSG_ICONURL });
                    callback();
                  }
                },
              },
              { required: true, message: '应用LOGO不能为空' },
            ]}
            customProps={{
              action: `${process.env.FILE_URL}/upload`,
              method: 'POST',
              data: {
                userName: 'yunjin_file_upload',
                password: 'yunjin_upload_password',
                domain: 'product',
                secret: 'N',
              },
              listType: 'picture-card',
              multiple: 'true',
              className: 'layout_uploader',
              Content,
            }}
          />
          <CstInput
            label="应用名称:"
            name="appName"
            customProps={{
              placeholder: '请填写应用名称',
              size: 'large',
            }}
            rules={[
              { required: true, message: '应用名称不能为空' },
              {
                pattern: new RegExp(/^[\u4e00-\u9fa5A-Za-z]{1,16}$/),
                message: '数据格式错误',
              },
            ]}
          />
          <CstInput
            label="应用简介:"
            name="resume"
            customProps={{
              placeholder: '一句话介绍您的应用',
              size: 'large',
            }}
            rules={[{ required: true, message: '应用简介不能为空' }]}
          />
          <CstTextArea
            label="备注(选项)"
            name="remark"
            customProps={{
              placeholder: '请输入备注信息',
              size: 'large',
            }}
          />
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              className="modifyApp-but filter_button--blue"
              onClick={modifyApp}
            >
              {modifyAppType ? '创建应用' : '修改应用'}
            </Button>
          </Form.Item>
        </MapForm>
      </div>
    </>
  );
};

export default modifyApp;
