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
import * as React from "react";
import { Button, Input, Select } from "antd";
import { autobind } from "core-decorators";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import {
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
} from "@/domain/enums";
import * as Style from "./style.scss";
import { IEntity } from "@/domain/interface";
import { v4 as uuidv4 } from "uuid";
import BaseForm from "@components/FormConstant";
import { IConstantItem } from "@gen/entity-interfaces/ConstantItem";

interface IColumn {
  title: string;
  dataIndex: string;
  width?: number;
  render?: (
    text?: any,
    record?: any,
    index?: number
  ) => React.Component | React.FC | null;
}

@autobind
// @observer
@BaseForm("Enum")
// @FormMode
export default class ConstractForm extends React.Component<IChildrenProps> {
  tableRef = React.createRef();

  formRef = React.createRef();

  columnsProps = {
    width: 100,
  };

  columns: Array<IColumn> = [
    {
      title: "键",
      dataIndex: "key",
      render: (value: string, _, index: number) => (
        <Input
          value={value}
          size="small"
          style={{ width: "200px" }}
          onChange={(e) => this.handleKeyChange(e.target.value, index)}
        />
      ),
    },
    {
      title: "值",
      dataIndex: "value",
      render: (value: string, record, index: number) => (
        <Input
          value={value}
          size="small"
          style={{ width: "300px" }}
          onChange={(e) => this.handleColumnChange("value", index)(e.target.value)}
          // disabled={this.getRuleDisabled()}
        />
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      render: (value: string, _, index: number) => (
        <Input
          value={value}
          size="small"
          style={{ width: "200px" }}
          onChange={(e) =>
            this.handleColumnChange("description", index)(e.target.value)
          }
        />
      ),
    },
    {
      title: "删除",
      dataIndex: "action",
      render: (value: string, record, index: number) => (
        <Button size="small" onClick={() => this.handleRemove(record, index)}>
          删除
        </Button>
      ),
    },
  ];

  componentDidMount() {
    // 组件渲染完成后要计算一次table的宽度
    this.setColumnWidth();
    this.forceUpdate();
  }

  // 删除属性
  handleRemove = (constantIem: IConstantItem, index: number) => {
    const { data } = this.props;
    if (constantIem.value) {
      data.items = data.items.filter((item: IConstantItem) => item.value !== constantIem.value);
    } else {
      data.items = [...data.items.slice(0, index), ...data.items.slice(index + 1)];
    }
    this.handleChange(data);
  };

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
      data: { label = "", name = "", rule="" },
    } = this.props;
    const { mode } = this.props;
    return (
      <Form
        layout="inline"
        onValuesChange={this.handleBaseInfoChange}
        initialValues={{ label, name, rule }}
        ref={this.formRef}
      >
        <FormItem label="枚举名称(英文)" name="name" required>
          <Input disabled={mode !== ENUM_MODE_CREATE}/>
        </FormItem>
        <FormItem label="描述" name="label" required>
          <Input
            disabled={mode !== ENUM_MODE_CREATE && mode !== ENUM_MODE_EDIT}
          />
        </FormItem>
        {/* <FormItem label="规则" name="rule" required>
          <Select 
            disabled={mode !== ENUM_MODE_CREATE && mode !== ENUM_MODE_EDIT}
            style={{width: "200px"}}>
            <Select.Option value="key=value">键值相同</Select.Option>
            <Select.Option value="uuid">uuid</Select.Option>
            <Select.Option value="timestamp">时间戳</Select.Option>
            <Select.Option value="customer">自定义</Select.Option>
          </Select>
        </FormItem> */}
      </Form>
    );
  };

  getRuleDisabled=() => {
    const {data} = this.props;
    switch(data.rule) {
      case "key=value": 
        return true;
      case "uuid":
        return true;
      case "timestamp":
        return true;
      default:
        return false;
    }
  }

  handleNewItem = () => {
    const item = {
      key: "",
      value: "",
      type: "",
    };
    const data = this.props.data;
    
    if (data.rule === 'uuid') {
      item["value"] = uuidv4();
    }
    switch(data.rule) {
      case 'uuid':
        item["value"] = uuidv4();
        break;
      case 'timestamp':
        item["value"] = (+ new Date()).toString();
        break;
    }

    data.items = [...(data.items || []), item];
    this.handleChange({ ...data });
  };

  handleColumnChange = (key: string, index: number) => {
    return (value: any) => {
      const { data } = this.props;
      if (typeof value === "string") {
        value = value.trim();
      }
      data.items[index][key] = value;
      this.handleChange({ ...data });
    };
  };

  // 当key改变时
  handleKeyChange = (value: string, index: number) => {
    const { data } = this.props;
    data.items[index]['key'] = value;
    if (data.rule === 'key=value') {
      data.items[index]["value"] = value;
    }
    this.handleChange({ ...data });
  };

  handleReferChange = (value: IEntity, index: number) => {
    const { id, name } = value;
    const { data } = this.props;
    data.items[index]["referEntityID"] = id;
    data.items[index]["referEntityName"] = name;
    this.handleChange({ ...data });
  };

  beforeSave = () => {
    return this.formRef.current.validateFields();
  };

  private setColumnWidth = () => {
    const totalWidth = this.columns.reduce((prev, current) => {
      if (typeof current.width === "number") {
        return prev + current.width;
      }
      return prev;
    }, 0);

    if (this.columns.length === 0) {
      return;
    }

    if (this.tableRef.current) {
      const tableWidth = this.tableRef.current.clientWidth;
      const colWidth =
        Math.max(tableWidth - totalWidth, 0) / this.columns.length;
      this.columnsProps.width = colWidth;
    }
  };

  private getColumnWidth = (index: number) => {
    if (typeof this.columns[index].width === "number") {
      return `${this.columns[index].width}px`;
    }
    return `${this.columnsProps.width}px`;
  };

  private getHeader = () => {
    return (
      <div className={Style.table_tr}>
        {this.columns.map((col, index) => (
          <div
            key={col.dataIndex}
            className={Style.table_td}
            style={{ width: this.getColumnWidth(index) }}
          >
            <span key={col.dataIndex}>{col.title}</span>
          </div>
        ))}
      </div>
    );
  };

  private renderList = (data: Array<any> = []) => {
    this.setColumnWidth();
    return <div>{data.map((row, index) => this.getRowRender(row, index))}</div>;
  };

  private getRowRender = (row: IEntity, rowIndex: number) => {
    return (
      <div className={Style.table_tr}>
        {this.columns.map((col, index) => {
          const text = row[col.dataIndex];
          return (
            <div
              className={Style.table_td}
              style={{ width: this.getColumnWidth(index) }}
            >
              {col.render && col.render(text, row, rowIndex)}
            </div>
          );
        })}
      </div>
    );
  };

  private createBtn = () => {
    // if (!this.props.data.rule) {
    //   return null;
    // }
    if ([ENUM_MODE_CREATE, ENUM_MODE_EDIT].includes(this.props.mode)) {
      return (
        <Button type="primary" onClick={this.handleNewItem}>
          添加字段
        </Button>
      );
    }
    return null;
  };

  render() {
    return (
      <div className={Style.entity}>
        <div className={Style.header}>
          {this.baseInfoRender()}
          {this.createBtn()}
        </div>
        <div className={Style.table} ref={this.tableRef}>
          <div className={Style.table_header}>{this.getHeader()}</div>
          <div className={Style.table_content}>
            {this.renderList(this.props.data.items || [])}
          </div>
        </div>
      </div>
    );
  }
}
