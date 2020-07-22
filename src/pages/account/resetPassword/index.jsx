/*
 * @Date: 2020-06-28 19:40:38
 * @LastEditTime: 2020-07-22 10:13:23
 */

import React, { useState } from "react";

import MapForm from "@/components/MapForm";
import Container from "../Container";

import { Form, Button, Checkbox, message } from "antd";
import { createHashHistory } from "history";
import { patternPhone } from "@/rules";
import { getResetPwdValidCode, resetPassword } from "@/services/account";
import successImg from "@/assets/images/pay/success.png";

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

  const [loading, setLoading] = useState(false);
  const [timing, setTiming] = useState(false);
  const [time, setTime] = useState(60);
  const [time3, setTime3] = useState(3);

  const [resetPwdLoading, setResetPwdLoading] = useState(false);
  const [success, setSucess] = useState(false);

  let timer = null;

  const handleSendAuthCode = () => {
    form.validateFields(["telephone"], async (err, value) => {
      if (!err) {
        try {
          setLoading(true);
          const [err, data, msg] = await getResetPwdValidCode(value);
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

  const handleResetPwd = () => {
    form.validateFields(async (err, value) => {
      if (!err) {
        try {
          setResetPwdLoading(true);
          const [err, data, msg] = await resetPassword(value);
          setResetPwdLoading(false);
          if (!err) {
            setSucess(true);
            dispatchTimer(3, setTime3, () => history.push("/admin/signIn"));
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
            <div className="sign-up_success-title">密码重置成功</div>
            <div className="sign-up_success-img">
              <img width="122px" height="122px" src={successImg} />
            </div>
            <div className="sign-up_success-title--sub">
              请妥善保管您的账户信息
            </div>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => history.push("/admin/signIn")}
            >
              返回登录（{time3}）
            </Button>
          </div>
        ) : (
          <MapForm
            layColWrapper={formItemLayout}
            onCreate={(form) => setForm(form)}
          >
            <Form.Item label=" " colon={false}>
              <div className="signUp_title">重置密码</div>
            </Form.Item>
            <CstInput
              label="手机号"
              name="telephone"
              customProps={{
                placeholder: "请输入手机号",
                size: "large",
              }}
              validateTrigger="onBlur"
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
            <CstPassword
              label="新密码"
              name="password"
              customProps={{
                placeholder: "请输入6~20位字符",
                size: "large",
              }}
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                  whitespace: true,
                },
                {
                  min: 6,
                  max: 20,
                  message: "请输入6~20位字符",
                },
              ]}
            />
            <CstPassword
              label="确认密码"
              name="passwordSure"
              customProps={{
                placeholder: "再次输入新密码",
                size: "large",
              }}
              rules={[
                {
                  required: true,
                  message: "确认新密码不能为空",
                  whitespace: true,
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== form.getFieldValue("password")) {
                      callback("确认新密码输入错误");
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            />
            <CstInput
              label="验证码"
              name="code"
              customProps={{
                placeholder: "请输入验证码",
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
            <Form.Item label=" " colon={false}>
              <Button
                loading={resetPwdLoading}
                type="primary"
                block
                size="large"
                onClick={handleResetPwd}
                loading={resetPwdLoading}
              >
                确认修改
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
