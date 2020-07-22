import React, { useState } from "react";

import MapForm from "@/components/MapForm";
import Container from "../Container";
import { patternPhone } from "@/rules";

import { Form, Button, Checkbox, message } from "antd";
import { getSignUpValidCode, signUp } from "@/services/account";

import { createHashHistory } from "history";
const history = createHashHistory();
import successImg from "@/assets/images/pay/success.png";

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

  const [loading, setLoading] = useState(false);
  const [timing, setTiming] = useState(false);
  const [time, setTime] = useState(60);

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [success, setSucess] = useState(false);

  const checkboxRef = React.createRef();

  const handleSendAuthCode = () => {
    form.validateFields(["telephone"], async (err, value) => {
      if (!err) {
        try {
          setLoading(true);
          const [err, data, msg] = await getSignUpValidCode(value);
          if (!err) {
            dispatchTimer(60, setTime);
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

  const dispatchTimer = (sec, setFn, after) => {
    setTiming(true);
    setLoading(false);
    if (timer) return;
    let i = 1;
    timer = setInterval(() => {
      if (i < sec) {
        setFn(sec - i++);
      } else {
        setTiming(false);
        clearTimeout(timer);
        setFn(sec);
        after && after();
      }
    }, 1000);
  };

  const handleSignUp = () => {
    const checked = checkboxRef.current.rcCheckbox.state.checked;
    if (!checked) return message.error("请阅读用户服务协议");
    form.validateFields(async (err, value) => {
      if (!err) {
        try {
          setSignUpLoading(true);
          const [err, data, msg] = await signUp(value);
          setSignUpLoading(false);
          if (!err) {
            setSucess(true);
          } else message.error(msg);
        } catch (error) {}
      }
    });
  };

  return (
    <Container>
      <div className="sign-up">
        {success ? (
          <div style={{ padding: "0 80px" }}>
            <div className="sign-up_success-title">注册成功</div>
            <div className="sign-up_success-img">
              <img width="122px" height="122px" src={successImg} />
            </div>
            <div
              className="sign-up_success-title--sub"
              style={{ marginBottom: "0" }}
            >
              恭喜您成为星权益注册会员
            </div>
            <Button
              type="link"
              block
              size="large"
              onClick={() => history.push("/admin/signIn")}
            >
              {"去登陆>"}
            </Button>
          </div>
        ) : (
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
              name="aliasName"
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
              name="telephone"
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
              name="code"
              customProps={{
                placeholder: "请输入密码",
                addonAfter: (
                  <Button
                    loading={loading}
                    disabled={timing}
                    type="link"
                    onClick={handleSendAuthCode}
                  >
                    {timing ? time + "s" : !loading && "发送验证码"}
                  </Button>
                ),
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
                <Checkbox ref={checkboxRef}>
                  我已阅读并同意<Button type="link">《用户服务协议》</Button>
                </Checkbox>
              </div>
              <Button
                loading={signUpLoading}
                type="primary"
                block
                size="large"
                onClick={handleSignUp}
              >
                注册
              </Button>
              <div className="fbc">
                <span />
                <Button type="link" onClick={() => history.push("./signIn")}>
                  已有账号，立即登录
                </Button>
              </div>
            </Form.Item>
          </MapForm>
        )}
      </div>
    </Container>
  );
};
