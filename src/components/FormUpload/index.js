/*
 * @Date: 2020-07-21 16:03:40
 * @LastEditTime: 2020-07-21 19:20:09
 */

import React, { useState } from "react";
import _ from "lodash";
import { Upload, Icon } from "antd";
import noHead from "@/assets/images/global/no-head.png";
export const FILE_ERROR_TYPE = "0";
export const FILE_ERROR_SIZE = "1";

const FormUpLoad = (props) => {
  const { onChange, value, action, data, method } = props;

  const [loading, setLoading] = useState(false);

  /**
   * @name: 核心逻辑
   * @param {type} code
   */
  const handleChangeChecked = (info) => {
    setLoading(true);
    if (info.file.status === "done") {
      setLoading(false);
      const { result } = info.file.response;
      onChange && onChange(result.fileList[0].url);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
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
    onChange && onChange("");
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={action}
      method={method}
      data={data}
      beforeUpload={beforeUpload}
      onChange={handleChangeChecked}
    >
      {/* {value ? (
        <div>
          <img
            src={process.env.FILE_URL + value}
            alt="avatar"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
      ) : (
        uploadButton
      )} */}
      <img
        src={value ? process.env.FILE_URL + value : noHead}
        alt="avatar"
        style={{ width: "60px", height: "60px" }}
      />
    </Upload>
  );
};

export default React.forwardRef(FormUpLoad);
