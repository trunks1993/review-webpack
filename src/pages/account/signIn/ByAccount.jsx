import React, { useState, useEffect } from 'react';
import MapForm from '@/components/MapForm';
import { Context, SignInLoadingContext } from '../Context';
import { Form, Button, Checkbox } from 'antd';
import { createHashHistory } from 'history';
const history = createHashHistory();

const { CstInput, CstPassword } = MapForm;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
export default () => {
  const [form, setForm] = useState({});
  // useEffect(() => {
  //   if (form.setFieldsValue) {
  //     form?.setFieldsValue({
  //       type: 1,
  //     });
  //   }
  // }, [form]);
  return (
    <MapForm
      layColWrapper={formItemLayout}
      labelAlign="left"
      onCreate={(form) => setForm(form)}
    >
      <CstInput name="type" defaultValue={1} style={{ display: 'none' }} />
      <CstInput
        label="账号"
        name="telephone"
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
      <Context.Consumer>
        {(handleLogin) => (
          <CstPassword
            label="密码"
            name="password"
            customProps={{
              placeholder: '请输入密码',
              size: 'large',
              onPressEnter: () => {
                handleLogin(form, () => {
                  history.push('/');
                });
              },
            }}
            rules={[
              {
                required: true,
                message: '密码不能为空',
                whitespace: true,
              },
            ]}
          />
        )}
      </Context.Consumer>
      <Form.Item label=" " colon={false}>
        <div className="fbc">
          <Checkbox>自动登录</Checkbox>
          <Button type="link" onClick={() => history.push('./resetPassword')}>
            忘记密码?
          </Button>
        </div>
        <Context.Consumer>
          {(handleLogin) => (
            <SignInLoadingContext.Consumer>
              {(loading) => (
                <Button
                  type="primary"
                  block
                  loading={loading}
                  size="large"
                  onClick={() =>
                    handleLogin(form, () => {
                      history.push('/');
                    })
                  }
                >
                  登录
                </Button>
              )}
            </SignInLoadingContext.Consumer>
          )}
        </Context.Consumer>
        <div className="fbc">
          <span />
          <Button type="link" onClick={() => history.push('./signUp')}>
            立即注册
          </Button>
        </div>
      </Form.Item>
    </MapForm>
  );
};
