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
import { Button, Input, Radio } from "antd";
import { SortableTable } from "@/components/SortTable";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import {
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
  ENUM_MODE_VIEW,
  ENUM_VALUETYPE_SINGLE,
} from "@/domain/enums";
import * as Style from "./style.scss";
import {
  ENUM_FIELDTYPE_STRING,
} from "@/domain/enums/fieldType";
import FieldType from "./FeildType";
import { IEntity } from "@/domain/interface";
import { v4 as uuidv4 } from "uuid";
import EasyRemoteSelect from "@components/EasySelect";
import BaseForm from "@components/Form";

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
@BaseForm("Entity")
// @FormMode
export default class EntityForm extends React.Component<IChildrenProps> {
  tableRef = React.createRef();

  formRef = React.createRef();

  columnsProps = {
    width: 100,
  };

  columns: Array<IColumn> = [
    {
      title: "字段名",
      dataIndex: "name",
      render: (value: string, _, index: number) => (
        <Input
          defaultValue={value}
          size="small"
          style={{ width: "200px" }}
          onBlur={(e) => this.handleColumnChange("name", index)(e.target.value)}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "label",
      render: (value: string, _, index: number) => (
        <Input
          defaultValue={value}
          size="small"
          style={{ width: "200px" }}
          onBlur={(e) =>
            this.handleColumnChange("label", index)(e.target.value)
          }
        />
      ),
    },
    {
      title: "类型",
      dataIndex: "fieldType",
      render: (value: string, record, index: number) => (
        <span style={{ display: "flex" }}>
          <FieldType
            value={value}
            onChange={(value) => this.handleFieldTypeChange(value, index)}
          />
          {record.isExtend && (
            <EasyRemoteSelect
              entityName={this.props.entityName}
              value={record.referEntityID}
              onChange={(data) => this.handleReferChange(data, index)}
            />
          )}
        </span>
      ),
    },
    {
      title: "删除",
      dataIndex: "action",
      render: (value: string, record, index: number) => (
        <Button size="small" onClick={() => this.handleRemove(record)}>
          删除
        </Button>
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

  componentDidMount() {
    // 组件渲染完成后要计算一次table的宽度
    this.setColumnWidth();
    this.forceUpdate();
  }

  // 删除属性
  handleRemove = (entity: IEntity) => {
    const { data } = this.props;
    data.fields = data.fields.filter((field) => field.id !== entity.id);
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
      data: { label = "", name = "" },
    } = this.props;
    const { mode } = this.props;
    return (
      <Form
        layout="inline"
        onValuesChange={this.handleBaseInfoChange}
        initialValues={{ label, name }}
        ref={this.formRef}
      >
        <FormItem label="对象名称(英文)" name="name" required>
          <Input disabled={mode !== ENUM_MODE_CREATE} value={label} />
        </FormItem>
        <FormItem label="字段名" name="label" required>
          <Input
            disabled={mode !== ENUM_MODE_CREATE && mode !== ENUM_MODE_EDIT}
          />
        </FormItem>
      </Form>
    );
  };

  handleNewItem = () => {
    const item = {
      title: "",
      name: "",
      fieldType: ENUM_FIELDTYPE_STRING,
      // required: true,
      // readonly: false,
      // hide: false,
      valueType: ENUM_VALUETYPE_SINGLE,
      id: uuidv4(),
      // 外键的id
      referEntityID: "",
      // 外键name
      referEntityName: "",
    };
    const data = this.props.data;
    data.fields = [...(data.fields || []), item];
    this.handleChange({ ...data });
  };

  handleColumnChange = (key: string, index: number) => {
    return (value: any) => {
      const { data } = this.props;
      if (typeof value === "string") {
        value = value.trim();
      }
      data.fields[index][key] = value;
      this.handleChange({ ...data });
    };
  };

  // 当FieldType改变时
  handleFieldTypeChange = (value: string, index: number) => {
    const { data } = this.props;
    // 不是数组或对象时要清空refer的数据
    const oldValue = data.fields[index]['fieldType'];
    data.fields[index]['fieldType'] = value;
    if (oldValue !== value) {
      data.fields[index]["referEntityID"] = "";
      data.fields[index]["referEntityName"] = "";
    }
    this.handleChange({ ...data });
  };

  handleReferChange = (value: IEntity, index: number) => {
    const { id, name } = value;
    const { data } = this.props;
    data.fields[index]["referEntityID"] = id;
    data.fields[index]["referEntityName"] = name;
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
            {this.renderList(this.props.data.fields || [])}
          </div>
        </div>
      </div>
    );
  }
}
