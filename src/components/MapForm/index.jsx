/*
 * @Date: 2020-06-23 21:38:43
 * @LastEditTime: 2020-07-21 21:45:14
 */
import { Form } from 'antd';
import React, { Component } from 'react';
import FormContext from './FormContext';
import FormItem from './FormItem';

class MapForm extends Component {
  static CstInput;
  static CstPassword;
  static CstOther;
  static CstTextArea;
  static CstTreeCheck;
  static CstSelect;
  static CstUpload;
  static CstGlobalUpload;
  static CstBlockCheckbox;
  static CstRadio;
  static CstCheckbox;
  static CstDatePicker;
  static CstRangePicker;
  static CstEditor;
  static CstTreeSelect;
  static CstProductSubPanel;
  static CstCascader;
  static CstInputNumber;

  static defaultProps = {
    className: '',
    onSubmit: () => {},
  };

  componentDidMount() {
    const { form, onCreate } = this.props;
    if (onCreate) {
      onCreate(form);
    }
  }

  getContext = () => {
    const { form } = this.props;
    return {
      form: { ...form },
    };
  };

  render() {
    const {
      children,
      className,
      layout,
      layColWrapper,
      labelAlign,
    } = this.props;
    return (
      <FormContext.Provider value={this.getContext()}>
        <div>
          <Form
            layout={layout}
            labelAlign={labelAlign}
            {...layColWrapper}
            className={className}
          >
            {children}
          </Form>
        </div>
      </FormContext.Provider>
    );
  }
}

Object.keys(FormItem).forEach((item) => {
  MapForm[item] = FormItem[item];
});

export default Form.create()(MapForm);
