/*
 * @Author: Dad
 * @Date: 2020-07-16 17:01:12
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-22 09:44:17
 */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Upload, Icon } from 'antd';

export const FILE_ERROR_TYPE = '0';
export const FILE_ERROR_SIZE = '1';

const GlobalUpload = ({
  multiple,
  onChange,
  disabled,
  value,
  action,
  method,
  data,
  uploadName,
}) => {
  const [loading, setloading] = useState(false);
  const handleChangeChecked = (info) => {
    setloading(true);
    if (info.file.status === 'done') {
      setloading(false);
      const { result } = info.file.response;
      onChange && onChange(result.fileList[0].url);
    }
  };
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">
        {uploadName ? uploadName : '上传图片'}
      </div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      onChange && onChange(FILE_ERROR_TYPE);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      onChange && onChange(FILE_ERROR_SIZE);
    }
    return isJpgOrPng && isLt2M;
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onChange && onChange('');
  };
  return (
    <div>
      {!disabled ? (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={action}
          method={method}
          data={data}
          multiple={multiple}
          beforeUpload={beforeUpload}
          onChange={handleChangeChecked}
        >
          {value ? (
            <div className=".upload-imgbox">
              <img
                src={process.env.FILE_URL + value}
                alt="avatar"
                style={{ maxHeight: 110 }}
              />
              <div className=".upload-delete">
                <Icon type="delete" onClick={handleDelete} />
              </div>
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      ) : (
        <img style={{ maxHeight: 110 }} src={process.env.FILE_URL + value} />
      )}
    </div>
  );
};
export default GlobalUpload;
