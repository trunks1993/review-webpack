import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Popover, message } from 'antd';
import { RouteList } from '@/router';
import { asyncRoutes } from '@/router/config';

import { createHashHistory } from 'history';
const history = createHashHistory();
import { connect } from 'dva';
import { removeToken } from '@/utils/auth';
import MapForm from '@/components/MapForm';

const { Header, Footer } = Layout;

import icon1 from '@/assets/images/layout/icon1.png';
import icon2 from '@/assets/images/layout/icon2.png';
import noImg from '@/assets/images/global/no-img.png';
import GlobalModal from '@/components/GlobalModal';
import { updatePassword, updateInfo } from '@/services/account';
import noHead from '@/assets/images/global/no-head.png';

const { CstInput, CstPassword, CstUpload } = MapForm;

const FuncContext = React.createContext(() => {});
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

const DropMenu = ({ user }) => {
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
    pwdForm.validateFields(async(err, value) => {
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
  const handleInfoSubmit = (dispatch) => {
    infoForm.validateFields(async(err, value) => {
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
      <FuncContext.Consumer>
        {(dispatch) => (
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
        )}
      </FuncContext.Consumer>

      <FuncContext.Consumer>
        {(dispatch) => (
          <GlobalModal
            modalVisible={infoVisible}
            confirmLoading={infoLoading}
            title={
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                个人信息
              </div>
            }
            cancelText="取消"
            onOk={() => handleInfoSubmit(dispatch)}
            onCancel={() => setInfoVisible(false)}
            okText="确认"
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
        )}
      </FuncContext.Consumer>

      <GlobalModal
        modalVisible={pwdVisible}
        confirmLoading={pwdLoading}
        title={
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            修改密码
          </div>
        }
        cancelText="取消"
        onOk={handlePwdSubmit}
        onCancel={() => setPwdVisible(false)}
        okText="确认"
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

const Name = ({ user, loading }) => (
  <Popover
    placement="bottom"
    content={<DropMenu user={user} />}
    trigger="hover"
  >
    <span>
      <img
        className="layout_header-img"
        src={`${user.headIcon ? process.env.FILE_URL + user.headIcon : noImg}`}
      />
    </span>
  </Popover>
);

const Comp = ({ carCount, user, dispatch, ...rest }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="layout_header-main">
          <div className="logo">
            <img
              width="81px"
              height="37px"
              src={process.env.FILE_URL + '/data/static/img/100001.png'}
            />
            <span className="layout_header-logo">助力企业数字化转型</span>
          </div>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '60px' }}>
            {_.map(
              asyncRoutes,
              (item) => !item.hidden && (
                <Menu.Item
                  key={item.id}
                  onClick={(e) => history.push(`${item.path}`)}
                >
                  {item.title}
                </Menu.Item>
              )
            )}
            <Menu.Item onClick={(e) => window.open('')}>文档中心</Menu.Item>
          </Menu>

          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '60px' }}>
            <Menu.Item onClick={(e) => history.push('/admin/message')}>
              <img className="layout_header-icon" src={icon2} />
              <span>消息(2)</span>
            </Menu.Item>
            <Menu.Item onClick={(e) => history.push('/admin/car')}>
              <Badge dot={!!carCount}>
                <img className="layout_header-icon" src={icon1} />
              </Badge>
              <span>购物车</span>
            </Menu.Item>
            <FuncContext.Provider value={dispatch}>
              <Name user={user} />
            </FuncContext.Provider>
          </Menu>
        </div>
      </Header>
      <Layout style={{ width: '1200px', margin: 'auto' }}>
        <RouteList path={rest.location.pathname} />
      </Layout>
      <Footer
        style={{ textAlign: 'center', fontSize: '14px', color: '#CCCCCC' }}
      >
        <div>Copyright © XJF All Rights Reserved</div>
        <div>领先的数字权益营销服务提供商</div>
      </Footer>
    </Layout>
  );
};

export default connect(({ app, account }) => ({
  carCount: app.carCount,
  user: account.user,
}))(Comp);
