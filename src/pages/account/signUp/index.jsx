import React, { useState } from "react";

import MapForm from "@/components/MapForm";
import Container from "../Container";
import { patternPhone } from "@/rules";

import { Form, Button, Checkbox } from "antd";
import { createHashHistory } from "history";
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
          // labelAlign="left"
          onCreate={(form) => setForm(form)}
        >
          <Form.Item label=" " colon={false}>
            <div className="signUp_title">注册您的账号</div>
          </Form.Item>
          <CstInput
            label="用户名"
            name="username"
            customProps={{
              placeholder: "请输入用户名称",
              size: "large",
            }}
            rules={[
              {
                required: true,
                message: "用户名不能为空",
              },
            ]}
          />
          <CstInput
            label="手机号"
            name="username"
            customProps={{
              placeholder: "请输入手机号",
              size: "large",
            }}
            rules={[
              {
                required: true,
                message: "手机号不能为空",
              },
              {
                pattern: patternPhone,
                message: "手机号格式有误",
              },
            ]}
          />
          <CstInput
            label="验证码"
            name="passwordfff"
            customProps={{
              placeholder: "请输入密码",
              addonAfter: <Button type="link">获取验证码</Button>,
              className: "byMessage_cst-input",
              size: "large",
            }}
            rules={[
              {
                required: true,
                transform: (value) =>
                  value % 1 === 0 ? parseInt(value) : false,
                type: "number",
                whitespace: true,
                message: "请输入正确验证码",
              },
            ]}
          />
          <CstPassword
            label="设置密码"
            name="password"
            customProps={{
              placeholder: "请设置6-20位登录密码",
              size: "large",
            }}
            rules={[
              {
                required: true,
                message: "密码不能为空",
              },
            ]}
          />
          <Form.Item label=" " colon={false}>
            <div className="fbc">
              <Checkbox>
                我已阅读并同意<Button type="link">《用户服务协议》</Button>
              </Checkbox>
            </div>
            <Button type="primary" block size="large">
              注册
            </Button>
            <div className="fbc">
              <span></span>
              <Button type="link" onClick={() => history.push("./signIn")}>
                已有账号，立即登录
              </Button>
            </div>
          </Form.Item>
        </MapForm>
      </div>
    </Container>
  );
};
