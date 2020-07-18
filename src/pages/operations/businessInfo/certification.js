/*
 * @Author: Dad
 * @Date: 2020-07-17 20:59:45
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-18 16:10:24
 */

import React, { useState } from 'react';
import { Tabs, Form, Button, Row, Col } from 'antd';
import MapForm from '@/components/MapForm';
import Head from '@/assets/images/operations/head.png';
import Mian from '@/assets/images/operations/mian.png';
import { patternIdCard, patternName } from '@/rules';

const { CstInput, CstUpload } = MapForm;

const certification = () => {
  const [tabKey, setTabKey] = useState('1');
  const [form, setForm] = useState({});
  const [helpMsg, setHelpMsg] = useState(
    '需清晰展示五官和文字信息， 支持2M以内的PNG、JPEG、GIF格式'
  );
  const [helpMsag, setHelpMsag] = useState();

  //提交
  const handleSubmit = () => {};

  return (
    <div className="certification">
      <Tabs
        className="configApp-content global-tabs"
        type="card"
        onChange={(activeKey) => setTabKey(activeKey)}
      >
        {/* <Tabs.TabPane tab={'企业认证'} key="2">
          1233
        </Tabs.TabPane> */}
        <Tabs.TabPane tab={'个人认证'} key="1">
          <div style={{ margin: '30px 0px' }}>
            <MapForm
              className="global-form global-edit-form"
              onCreate={(form) => setForm(form)}
            >
              <Row>
                <Col span={10} push={2}>
                  <CstUpload
                    name="idCardFront"
                    label="应用logo:"
                    help={helpMsg}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    className='configApp-content--upload'
                    rules={[
                      {
                        validator: (rule, value, callback) => {
                          if (value === FILE_ERROR_TYPE) {
                            setHelpMsg('文件格式错误');
                            callback(new Error('文件格式错误'));
                          } else if (value === FILE_ERROR_SIZE) {
                            setHelpMsg('文件大小不能超过2M');
                            callback(new Error('文件大小不能超过2M'));
                          } else {
                            setHelpMsg(
                              '需清晰展示五官和文字信息， 支持2M以内的PNG、JPEG、GIF格式'
                            );
                            callback();
                          }
                        },
                      },
                      { required: true, message: '身份证正面照片不能为空' },
                    ]}
                    customProps={{
                      action: `${process.env.FILE_URL}/upload`,
                      method: 'POST',
                      data: {
                        userName: 'yunjin_file_upload',
                        password: 'yunjin_upload_password',
                        domain: 'product',
                        secret: 'N',
                      },
                      multiple: 'true',
                      uploadName: '请上传身份证的头像面',
                    }}
                  />
                </Col>
                <Col span={4} push={2}>
                  <img src={Head} alt=""/>
                </Col>
              </Row>
              <Row>
                <Col span={10} push={2}>
                  <CstUpload
                    label=""
                    name="idCardBack"
                    help={helpMsag}
                    className=''
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 17, offset: 5 }}
                    rules={[
                      {
                        validator: (rule, value, callback) => {
                          if (value === FILE_ERROR_TYPE) {
                            setHelpMsag('文件格式错误');
                            callback(new Error('文件格式错误'));
                          } else if (value === FILE_ERROR_SIZE) {
                            setHelpMsag('文件大小不能超过2M');
                            callback(new Error('文件大小不能超过2M'));
                          } else {
                            callback();
                          }
                        },
                      },
                      { required: true, message: '身份证正面照片不能为空' },
                    ]}
                    customProps={{
                      action: `${process.env.FILE_URL}/upload`,
                      method: 'POST',
                      data: {
                        userName: 'yunjin_file_upload',
                        password: 'yunjin_upload_password',
                        domain: 'product',
                        secret: 'N',
                      },
                      listType: 'picture-card',
                      multiple: 'true',
                      uploadName: '请上传身份证的国徽面',
                      showUploadList: false,
                    }}
                  />
                </Col>
                <Col span={4} push={2}>
                  <img src={Mian} alt="" />
                </Col>
              </Row>
              <CstInput
                label="姓名:"
                name="userName"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 7 }}
                customProps={{
                  placeholder: '请输入姓名',
                  maxLength: '16',
                  size: 'large',
                }}
                rules={[
                  { required: true, message: '姓名不能为空' },
                  {
                    pattern: new RegExp(patternName),
                    message: '数据格式错误',
                  },
                ]}
              />
              <CstInput
                label="身份证号码:"
                name="userId"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 7 }}
                customProps={{
                  placeholder: '请输入身份证号码',
                  maxLength: '18',
                  size: 'large',
                }}
                rules={[
                  { required: true, message: '身份证号码不能为空' },
                  {
                    pattern: new RegExp(patternIdCard),
                    message: '数据格式错误',
                  },
                ]}
              />
              <Form.Item
                colon={false}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10, offset: 4 }}
                style={{ marginTop: '30px' }}
              >
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
              </Form.Item>
            </MapForm>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
export default certification;
