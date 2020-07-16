/*
 * @Author: Dad
 * @Date: 2020-07-15 09:57:12
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-16 16:47:05
 */
import React, { useState, useEffect } from 'react';
import List from './List';
import { getApp, deleteApp, getSecret } from '@/services/businessInfo';
import MapForm from '@/components/MapForm';
import { Icon, Modal, message, Button } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';

const { CstInput } = MapForm;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const application = ({ user }) => {
  const [list, setList] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [appVisible, setAppVisible] = useState({});
  const [arrSecret, setArrSecret] = useState({});
  const [form, setForm] = useState({});
  const [appId, setAppId] = useState();

  useEffect(() => {
    getAppInfo();
  },[]);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    form.setFieldsValue({ ['telephone']: user?.telephone });
  },[form]);

  /** SecretKey显示隐藏 */
  const setVisible = (id) => {
    if (!appVisible[id]){
      setAppId(id);
      setModalVisible(!modalVisible);
    } else {
      setAppVisible({ appVisible: { ...appVisible,[id]: !appVisible[id] } });
    }
  };

  /** 获取app */
  const getAppInfo = async() => {
    const [err, data, msg] = await getApp();
    if (!err){
      const visible = {};
      const secret = {};
      _.map(data.list, item => {
        visible[item.id] = false,
        secret[item.id] = '';
      });
      setAppVisible(visible);
      setArrSecret(secret);
      setList(data);
    }
  };

  /** 删除app */
  const showDeleteConfirm = (appId) => {
    Modal.confirm({
      title: '您确定要删除这个APP吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: async() => {
        const [err, data, msg] = await deleteApp({ appId });
        getAppInfo();
        if (!err) message.success('删除成功!');
      },
    });
  };

  /** Modal确认按钮 */
  const handleOk = () => {
    form.validateFields(async(errs, value) => {
      if (!errs) {
        const datas = { ...value, appId };
        const [err, data, msg] = await getSecret(datas);
        if (!err){
          setAppVisible({ ...appVisible,[appId]: !appVisible[appId] });
        }
      }
    });
    setModalVisible(!modalVisible);
  };

  return (
    <div className="app">
      <div className="app-title">应用信息<span className="app-desc">已添加 {list?.totalRecords ? list?.totalRecords : 0} 个应用</span></div>
      <div className="app-content">
        {_.map(list.list, (item) => (
          <List
            setVisible={setVisible}
            appVisible={appVisible}
            SecretVisble={arrSecret}
            showDeleteConfirm={showDeleteConfirm}
            list={item}
          />
        ))}
        <div className="app-newlist">
          <Icon type="plus" />
                    创建应用
        </div>
      </div>
      <Modal
        title="显示应用密钥"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(!modalVisible); }}
        style={{ height: 300 }}
        className="app-modal"
        okText="确认"
        cancelText="取消"
      >
        <MapForm
          layColWrapper={formItemLayout}
          labelAlign="left"
          onCreate={(form) => setForm(form)}
        >
          <CstInput
            label="手机号"
            name="telephone"
            customProps={{
              disabled: 'true',
            }}
          />
          <CstInput
            label="验证码"
            name="code"
            customProps={{
              placeholder: '请输入密码',
              addonAfter: <Button type="link">获取验证码</Button>,
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
        </MapForm>
      </Modal>
    </div>
  );
};

export default connect(({ account: { user } = {} }) => ({
  user
}))(application);
