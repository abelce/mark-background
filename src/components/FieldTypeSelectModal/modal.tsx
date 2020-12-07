/*
 * File: index copy.tsx
 * Project: wait
 * File Created: Sunday, 6th December 2020 11:24:02 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Sunday, 6th December 2020 11:24:03 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
/**
 * 改组件主要用于entity选择属性类型时根据对象数组选择不同的
 */
import FieldType from "@page/Entity/form/FeildType";
import { Button, Modal } from "antd";
import * as React from "react";
import {
  ENUM_declare_FieldType,
  ENUM_FieldType_array,
  ENUM_FieldType_enum,
  ENUM_FieldType_object,
  ENUM_object_FieldType,
} from "@gen";
import EasyRemoteSelect from "@components/EasySelect";
import { IEntity } from "@domain/interface";
import { Form } from "antd";
import * as Style from "./style.scss";
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

// 判断类型是不是基本类型
export function isAdvanceType(type: ENUM_declare_FieldType) {
  const advanceTypes = [
    ENUM_FieldType_object,
    ENUM_FieldType_array,
    ENUM_FieldType_enum,
  ];
  if (advanceTypes.includes(type)) {
    return true;
  }
  return false;
}

export interface ISelectModal {
  fieldType: string;
  isAdvance: boolean; // 默认false，表示基本类型，比如string、数字、bool
  advanceType: string; // 不是基本类型时的类型
  referEntityID: string;
  onChange: (data: object) => void;
}

export class SelectModal extends React.Component<ISelectModal> {
  state = {
    data: {},
  };

  constructor(props: ISelectModal) {
    super(props);
    const { fieldType, isAdvance, advanceType, referEntityID } = this.props;
    this.state.data = {
      fieldType,
      isAdvance,
      advanceType,
      referEntityID,
    };
  }

  handleChange = (data: object) => {
    this.setState({
      data: {
        ...this.state.data,
        ...data,
      },
    });
  };

  handleFieldTypeChange = (fieldType: any) => {
    this.handleChange({
      fieldType,
      isAdvance: isAdvanceType(fieldType),
    });
  };

  handleAdvanceTypeChange = (advanceType: any) => {
    this.handleChange({
      advanceType,
    });
  };

  handleReferEntityChange = (data: IEntity) => {
    const { id, name } = data;
    debugger;
    this.handleChange({
      referEntityID: id,
      referEntityName: name,
    });
  };

  // 如果高级类型也是高级类型就查询实体列表或者、枚举列表
  renderAdvanceType = () => {
    if (!this.state.data.isAdvance || !this.state.data.advanceType) {
      return null;
    }
    if (this.state.data.advanceType === ENUM_FieldType_object) {
      return (
        <FormItem label="高级类型" required>
          <EasyRemoteSelect
            entityName="entity"
            value={this.state.data.referEntityID}
            onChange={this.handleReferEntityChange}
          />
        </FormItem>
      );
    }

    return null;
  };

  handleSubmit = () => {
    this.props.onOk && this.props.onOk(this.state.data);
  };

  render() {
    return (
      <Modal {...this.props} title="属性类型" footer={null}>
        <div style={{ height: "300px" }}>
          <Form
            {...formLayout}
            className={Style.select_modal}
            onFinish={this.handleSubmit}
          >
            <FormItem label="类型" required>
              <FieldType
                value={this.state.data.fieldType}
                onChange={this.handleFieldTypeChange}
              />
            </FormItem>
            <div>
              {this.state.data.isAdvance && (
                <FormItem
                  label={`${
                    ENUM_object_FieldType[this.state.data.fieldType].description
                  }类型`}
                  required
                >
                  <FieldType
                    value={this.state.data.advanceType}
                    onChange={this.handleAdvanceTypeChange}
                  />
                </FormItem>
              )}
              {this.renderAdvanceType()}
            </div>
            <FormItem wrapperCol={{span: 24}}>
              <div className={Style.btns}>
                <Button>取消</Button>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}
