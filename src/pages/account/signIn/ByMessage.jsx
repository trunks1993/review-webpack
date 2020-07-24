import React, { useState } from 'react';
import MapForm from '@/components/MapForm';
import { Context } from '../Context';
import { Form, Button, Checkbox, message } from 'antd';
import { createHashHistory } from 'history';
import { patternPhone } from '@/rules';
import { getLoginValidCode } from '@/services/account';

const history = createHashHistory();

const { CstInput } = MapForm;

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

  const [loading, setLoading] = useState(false);
  const [timing, setTiming] = useState(false);
  const [time, setTime] = useState(60);

  let timer = null;

  const handleSendAuthCode = () => {
    form.validateFields(['telephone'], async(err, value) => {
      if (!err) {
        try {
          setLoading(true);
          const [err, data, msg] = await getLoginValidCode(value);
          if (!err) {
            dispatchTimer();
          } else {
            setLoading(false);
            message.error(msg);
          }
        } catch (error) {
          setLoading(false);
        }
      }
    });
  };

  const dispatchTimer = () => {
    setTiming(true);
    setLoading(false);
    if (timer) return;
    let i = 1;
    timer = setInterval(() => {
      if (i < 60) {
        setTime(time - i++);
      } else {
        setTiming(false);
        clearTimeout(timer);
        setTime(60);
      }
    }, 1000);
  };

  return (
    <MapForm
      layColWrapper={formItemLayout}
      labelAlign="left"
      onCreate={(form) => setForm(form)}
    >
      <CstInput name="type" defaultValue={2} style={{ display: 'none' }} />
      <CstInput
        label="手机号"
        name="telephone"
        customProps={{
          placeholder: '请输入手机号',
          size: 'large',
        }}
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: '手机号不能为空',
          },
          {
            pattern: patternPhone,
            message: '手机号格式有误',
          },
        ]}
      />
      <CstInput
        label="验证码"
        name="code"
        customProps={{
          placeholder: '请输入验证码',
          addonAfter: (
            <Button
              loading={loading}
              disabled={timing}
              type="link"
              onClick={handleSendAuthCode}
            >
              {timing ? time + 's' : !loading && '发送验证码'}
            </Button>
          ),
          className: 'byMessage_cst-input',
          size: 'large',
        }}
        rules={[
          {
            required: true,
            transform: (value) => (value % 1 === 0 ? parseInt(value) : false),
            type: 'number',
            whitespace: true,
            message: '请输入正确验证码',
          },
        ]}
      />
      <Form.Item label=" " colon={false}>
        <div className="fbc">
          <Checkbox>自动登录</Checkbox>
          <Button type="link" onClick={() => history.push('./resetPassword')}>
            忘记密码?
          </Button>
        </div>
        <Context.Consumer>
          {(handleLogin) => (
            <Button
              type="primary"
              block
              size="large"
              onClick={() => handleLogin(form)}
            >
              登录
            </Button>
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
