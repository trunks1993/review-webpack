/*
 * @Date: 2020-07-14 16:36:47
 * @LastEditTime: 2020-07-22 15:15:19
 */

import React from "react";
import { Modal } from "antd";

const GlobalModal = (props) => {
  const {
    modalVisible,
    onCancel,
    onOk,
    title,
    confirmLoading,
    width,
    cancelText,
    cancelButtonProps,
    okText,
    footer,
  } = props;

  return (
    <Modal
      className="global-modal"
      maskClosable={false}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={title}
      visible={modalVisible}
      width={width || 600}
      onCancel={() => onCancel && onCancel()}
      onOk={() => onOk && onOk()}
      okButtonProps={{ className: "global-modal-btn-ok" }}
      cancelButtonProps={
        cancelButtonProps || { className: "global-modal-btn-cancel" }
      }
      cancelText={cancelText}
      okText={okText}
      footer={footer}
    >
      {props.children}
    </Modal>
  );
};

export default GlobalModal;
