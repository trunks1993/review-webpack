import React, { useState, useEffect } from 'react';

import { Layout, Menu, Badge, Popover, message } from 'antd';
import GlobalModal from '@/components/GlobalModal';
import { updatePassword, updateInfo } from '@/services/account';
import MapForm from '@/components/MapForm';
import { removeToken } from '@/utils/auth';
import noHead from '@/assets/images/global/no-head.png';

const { CstInput, CstPassword, CstUpload } = MapForm;

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
  return (
    <img
      src={value ? process.env.FILE_URL + value : noHead}
      alt="avatar"
      style={{ width: '100%' }}
    />
  );
};

const DropMenu = ({ user, dispatch }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  const [pwdForm, setPwdForm] = useState({});
  const [pwdLoading, setPwdLoading] = useState(false);

  const [infoForm, setInfoForm] = useState({});
  const [infoLoading, setInfoLoading] = useState(false);

  /**
   * @name: 修改密码
   * @param {type}
   */
  const handlePwdSubmit = () => {
    pwdForm.validateFields(async (err, value) => {
      if (!err) {
        try {
          setPwdLoading(true);
          const [err, data, msg] = await updatePassword(value);
          setPwdLoading(false);
          if (!err) {
            message.success('修改成功');
            setPwdVisible(false);
          } else message.error(msg);
        } catch (error) {}
      }
    });
  };

  /**
   * @name: 修改资料
   * @param {type}
   */
  const handleInfoSubmit = () => {
    infoForm.validateFields(async (err, value) => {
      if (!err) {
        try {
          setInfoLoading(true);
          const [err, data, msg] = await updateInfo(value);
          setInfoLoading(false);
          if (!err) {
            message.success('修改成功');
            setInfoVisible(false);
            dispatch({
              type: 'account/setUser',
            });
          } else message.error(msg);
        } catch (error) {}
      }
    });
  };

  return (
    <>
      <div className="layout_drop-menu">
        <ul>
          <li onClick={() => setInfoVisible(true)}>修改资料</li>
          <li onClick={() => setPwdVisible(true)}>修改密码</li>
          <li
            onClick={() => {
              removeToken();
              window.location.href = '/';
            }}
          >
            退出登录
          </li>
        </ul>
      </div>

      <GlobalModal
        modalVisible={infoVisible}
        confirmLoading={infoLoading}
        title={
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            个人信息
          </div>
        }
        onOk={handleInfoSubmit}
        onCancel={() => setInfoVisible(false)}
        width={560}
      >
        <MapForm
          layColWrapper={formItemLayout}
          labelAlign="right"
          onCreate={(form) => setInfoForm(form)}
        >
          <CstUpload
            label="头像"
            name="headIcon"
            defaultValue={user.headIcon}
            customProps={{
              action: `${process.env.FILE_URL}/upload`,
              method: 'post',
              data: {
                userName: 'yunjin_file_upload',
                password: 'yunjin_upload_password',
                secret: 'N',
                domain: 'headicon',
              },
              className: 'layout_uploader',
              Content,
            }}
          />
          <CstInput
            label="真实姓名"
            name="realname"
            defaultValue={user.realname}
            customProps={{
              placeholder: '请输入账号/手机号',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '账号/手机号不能为空',
                whitespace: true,
              },
            ]}
          />
          <CstInput
            label="昵称"
            name="aliasName"
            defaultValue={user.aliasName}
            customProps={{
              placeholder: '请输入企业名称或昵称',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入企业名称或昵称不能为空',
                whitespace: true,
              },
            ]}
          />
          <CstInput
            label="手机号"
            name="telephone"
            defaultValue={user.telephone}
            customProps={{
              placeholder: '请输入账号/手机号',
              size: 'large',
              disabled: true,
            }}
            rules={[
              {
                required: true,
                message: '账号/手机号不能为空',
                whitespace: true,
              },
            ]}
          />
        </MapForm>
      </GlobalModal>

      <GlobalModal
        modalVisible={pwdVisible}
        confirmLoading={pwdLoading}
        title={
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            修改密码-{user.telephone}
          </div>
        }
        onOk={handlePwdSubmit}
        onCancel={() => setPwdVisible(false)}
        width={560}
      >
        <MapForm
          layColWrapper={formItemLayout}
          labelAlign="right"
          onCreate={(form) => setPwdForm(form)}
        >
          <CstPassword
            label="原密码"
            name="oldPassword"
            customProps={{
              placeholder: '请输入原密码',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '原密码不能为空',
                whitespace: true,
              },
            ]}
          />
          <CstPassword
            label="新密码"
            name="newPassword"
            customProps={{
              placeholder: '请输入6~20位字符',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '新密码不能为空',
                whitespace: true,
              },
              {
                min: 6,
                max: 20,
                message: '请输入6~20位字符',
              },
            ]}
          />
          <CstPassword
            label="确认新密码"
            name="newPasswordSure"
            customProps={{
              placeholder: '再次输入新密码',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '确认新密码不能为空',
                whitespace: true,
              },
              {
                validator: (rule, value, callback) => {
                  if (value && value !== pwdForm.getFieldValue('newPassword')) {
                    callback('确认新密码输入错误');
                  } else {
                    callback();
                  }
                },
              },
            ]}
          />
        </MapForm>
      </GlobalModal>
    </>
  );
};

export default DropMenu;
