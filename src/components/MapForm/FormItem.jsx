import { Form, Input, Select, Cascader, Radio, InputNumber } from 'antd';
import React, { Component } from 'react';
import ItemMap from './map';
import FormContext from './FormContext';
import TextArea from 'antd/lib/input/TextArea';
// import TreeCheck from "@/pages/sys/manager/role/components/TreeCheck";
// import GlobalUpLoad from "../GlobalUpload";
// import BlockCheckbox from "../BlockCheckbox";
// import GlobalCheckbox from "../GlobCheckbox";
// import GlobalEditor from "../GlobalEditor";
// import GlobalDatePicker from "../GlobalDatePicker";
// import GlobalTreeSelect from "../GlobalTreeSelect";
// import ProductSubPanel from "@/pages/product/manager/management/components/ProductSubPanel";

const FormItem = Form.Item;

class WrapFormItem extends Component {
  getFormItemOptions = ({ onChange, defaultValue, rules, validateTrigger }) => {
    const options = {};
    rules && (options.rules = rules);
    onChange && (options.onChange = onChange);
    defaultValue && (options.initialValue = defaultValue);
    validateTrigger && (options.validateTrigger = validateTrigger);
    return options;
  };

  render() {
    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      type,
      form,
      label,
      name,
      children,
      help,
      wrapperCol,
      labelCol,
      className,
      style,
      customProps,
    } = this.props;

    if (!name) {
      return null;
    }

    if (!form) {
      return null;
    }

    const { getFieldDecorator } = form;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const Map = {
      CstInput: getFieldDecorator(name, options)(<Input {...customProps} />),
      CstTextArea: getFieldDecorator(
        name,
        options
      )(<TextArea {...customProps} />),
      CstPassword: getFieldDecorator(
        name,
        options
      )(<Input.Password autoComplete="off" {...customProps} />),
      CstOther: getFieldDecorator(name, options)(<>{children}</>),
      // CstTreeCheck: getFieldDecorator(
      //   name,
      //   options
      // )(<TreeCheck {...customProps} />),
      CstSelect: getFieldDecorator(
        name,
        options
      )(
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          {...customProps}
        >
          {children}
        </Select>
      ),
      // CstUpload: getFieldDecorator(
      //   name,
      //   options
      // )(<GlobalUpLoad {...customProps}>{children}</GlobalUpLoad>),
      // CstBlockCheckbox: getFieldDecorator(
      //   name,
      //   options
      // )(<BlockCheckbox {...customProps} />),
      CstRadio: getFieldDecorator(
        name,
        options
      )(<Radio.Group {...customProps}>{children}</Radio.Group>),
      // CstCheckbox: getFieldDecorator(
      //   name,
      //   options
      // )(<GlobalCheckbox {...customProps} />),
      // CstDatePicker: getFieldDecorator(
      //   name,
      //   options
      // )(<GlobalDatePicker {...customProps} />),
      // CstTreeSelect: getFieldDecorator(
      //   name,
      //   options
      // )(<GlobalTreeSelect {...customProps} />),
      // CstProductSubPanel: getFieldDecorator(
      //   name,
      //   options
      // )(<ProductSubPanel {...customProps} />),
      CstCascader: getFieldDecorator(
        name,
        options
      )(
        <Cascader
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          {...customProps}
        />
      ),
      CstInputNumber: getFieldDecorator(
        name,
        options
      )(<InputNumber {...customProps} />),
    };

    if (wrapperCol && labelCol) return (
      <FormItem
        className={className}
        colon={false}
        label={label}
        help={help}
        wrapperCol={wrapperCol}
        labelCol={labelCol}
        style={style}
      >
        {Map[type || '']}
      </FormItem>
    );
    return (
      <FormItem
        className={className}
        colon={false}
        label={label}
        help={help}
        style={style}
      >
        {Map[type || '']}
      </FormItem>
    );
  }
}

const CstFormItem = {};

Object.keys(ItemMap).forEach((key) => {
  CstFormItem[key] = (props) => (
    <FormContext.Consumer>
      {(context) => <WrapFormItem {...context} type={key} {...props} />}
    </FormContext.Consumer>
  );
});

export default CstFormItem;
