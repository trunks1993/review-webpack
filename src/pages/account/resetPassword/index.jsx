/*
 * @Date: 2020-06-28 19:40:38
 * @LastEditTime: 2020-06-28 20:39:49
 */

import React, { useState } from 'react';

import MapForm from '@/components/MapForm';
import Container from '../Container';

import { Form, Button, Checkbox } from 'antd';
import { createHashHistory } from 'history';
import { patternPhone } from '@/rules';

const history = createHashHistory();

const { CstInput, CstPassword } = MapForm;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
    offset: 1,
  },
};
export default () => {
  const [form, setForm] = useState({});
  return (
    <Container>
      <div className="sign-up">
        <MapForm
          layColWrapper={formItemLayout}
          onCreate={(form) => setForm(form)}
        >
          <Form.Item label=" " colon={false}>
            <div className="signUp_title">重置密码</div>
          </Form.Item>
          <CstInput
            label="手机号"
            name="username"
            customProps={{
              placeholder: '请输入手机号',
              size: 'large',
            }}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
              {
                pattern: patternPhone,
                message: '手机号格式有误',
              },
            ]}
          />
          <CstPassword
            label="新密码"
            name="password"
            customProps={{
              placeholder: '请输入新密码',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
            ]}
          />
          <CstPassword
            label="确认密码"
            name="password"
            customProps={{
              placeholder: '再次输入新密码',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
            ]}
          />
          <CstInput
            label="验证码"
            name="passwordfff"
            customProps={{
              placeholder: '请输入密码',
              addonAfter: <Button type="link">获取验证码</Button>,
              className: 'byMessage_cst-input',
              size: 'large',
            }}
            rules={[
              {
                required: true,
                transform: (value) => value % 1 === 0 ? parseInt(value) : false,
                type: 'number',
                whitespace: true,
                message: '请输入正确验证码',
              },
            ]}
          />
          <Form.Item label=" " colon={false}>
            <Button type="primary" block size="large">
              确认修改
            </Button>
            <div className="fbc">
              <span />
              <Button type="link" onClick={() => history.push('./signIn')}>
                已有账号，立即登录
              </Button>
            </div>
          </Form.Item>
        </MapForm>
      </div>
    </Container>
  );
};
