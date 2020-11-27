/*
 * File: form.tsx
 * Project: ant-design-pro
 * File Created: Monday, 23rd November 2020 1:02:04 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Monday, 23rd November 2020 1:02:04 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
import * as React from 'react';
import BaseForm, { IChildrenProps } from '@/components/Form';
import { Button, Input, Radio } from 'antd';
import { SortableTable } from '@/components/SortTable';
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ENUM_MODE_CREATE, ENUM_VALUETYPE_SINGLE } from '@/domain/enums';
import * as Style from './style.scss';
import { ENUM_FIELDTYPE_STRING } from '@/domain/enums/fieldType';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import FieldType from './FeildType';
import ValueType from './ValueType';
import { IEntity } from '@/domain/interface';

@autobind
// @observer
@BaseForm('entity')
export default class EntityForm extends React.Component<IChildrenProps> {
  data = [];

  formRef = React.createRef();

  columns = [
    {
      title: '字段名',
      dataIndex: 'name',
      render: (value: string, _, index: number) => (
        <Input
          defaultValue={value}
          size="small"
          onBlur={(e) => this.handleColumnChange('name', index)(e.target.value)}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'label',
      render: (value: string, _, index: number) => (
        <Input
          defaultValue={value}
          size="small"
          onBlur={(e) => this.handleColumnChange('label', index)(e.target.value)}
        />
      ),
    },
    {
      title: '类型',
      dataIndex: 'fieldType',
      render: (value: string, _, index: number) => (
        <FieldType value={value} onChange={this.handleColumnChange('fieldType', index)} />
      ),
    },
    // {
    //   title: '值类型',
    //   dataIndex: 'valueType',
    //   render: (value: string, _, index: number) => (
    //     <ValueType value={value} onChange={this.handleColumnChange('valueType', index)} />
    //   ),
    // },
    // {
    //   title: '必填',
    //   dataIndex: 'required',
    //   render: (value: boolean, _, index: number) => (
    //     <Checkbox checked={value} onChange={this.handleColumnChange('required', index)} />
    //   ),
    // },
    // {
    //   title: '只读',
    //   dataIndex: 'readonly',
    //   render: (value: boolean, _, index: number) => (
    //     <Checkbox checked={value} onChange={this.handleColumnChange('readonly', index)} />
    //   ),
    // },
    // {
    //   title: '隐藏',
    //   dataIndex: 'hide',
    //   render: (value: boolean, _, index: number) => (
    //     <Checkbox checked={value} onChange={this.handleColumnChange('hide', index)} />
    //   ),
    // },
  ];

  handleChange = (data: IEntity) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  handleBaseInfoChange = (changedValues, allValues) => {
    const { data } = this.props;
    this.handleChange({
      ...data,
      ...allValues,
    });
  };

  baseInfoRender = () => {
    const {
      data: { label = '', name = '' },
      mode,
    } = this.props;
    return (
      <Form
        layout="inline"
        onValuesChange={this.handleBaseInfoChange}
        initialValues={{ label, name }}
        ref={this.formRef}
      >
        <FormItem label="标题" name="label" required>
          <Input disabled={mode !== ENUM_MODE_CREATE} value={label} />
        </FormItem>
        <FormItem label="字段名" name="name" required>
          <Input />
        </FormItem>
      </Form>
    );
  };

  handleNewItem = () => {
    const item = {
      title: '',
      name: '',
      fieldType: ENUM_FIELDTYPE_STRING,
      // required: true,
      // readonly: false,
      // hide: false,
      valueType: ENUM_VALUETYPE_SINGLE,
      _id: +new Date(),
    };
    const data = this.props.data;
    data.fields = [...data.fields, item];
    this.handleChange({...data});
  };

  handleColumnChange = (key: string, index: number) => {
    return (value: any) => {
      const { data } = this.props;
      if (typeof value === 'string') {
        value = value.trim();
      }
      data.fields[index][key] = value;
      this.handleChange({...data});
    };
  };

  beforeSave = () => {
    return this.formRef.current.validateFields()
  }

  render() {
    return (
      <div className={Style.entity}>
        <div className={Style.header}>
          {this.baseInfoRender()}
          <Button type="primary" onClick={this.handleNewItem}>
            添加字段
          </Button>
        </div>
        <SortableTable
          dataSource={this.props.data.fields}
          columns={this.columns}
          onChange={this.handleChange}
          rowKey="id"
          size="small"
        />
      </div>
    );
  }
}
