/*
 * @Author: Dad
 * @Date: 2020-07-16 16:48:10
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-16 16:59:35
 */
import React, { useState } from 'react';
import MapForm from '@/components/MapForm';

const { CstInput, CstTextArea } = MapForm;

const modifyApp = () => {
  const [form, setForm] = useState({});

  return (
    <div className="modifyApp">
      <MapForm
        layColWrapper={formItemLayout}
        labelAlign="left"
        onCreate={(form) => setForm(form)}
      >
        <CstInput
          label="应用名称:"
          name="telephone"
          customProps={{
            placeholder: '请填写应用名称',
            size: 'large'
          }}
        />
        <CstInput
          label="应用简介:"
          name="telephone"
          customProps={{
            placeholder: '一句话介绍您的应用',
            size: 'large'
          }}
        />
        <CstTextArea
          label="备注(选项)"
          name="code"
          customProps={{
            placeholder: '请输入备注信息',
            size: 'large'
          }}
        />
      </MapForm>
    </div>
  );
};

export default modifyApp;
