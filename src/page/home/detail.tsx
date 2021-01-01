import { Presenter } from "@page/layout/presenter";
import * as React from "react";
import * as Style from "./style.scss";
import { Button, message, Form, Input, Select } from "antd";
import { ENUM_array_MarkType } from "@gen";

const FormItem = Form.Item;

interface IDetail {
  presenter: Presenter;
}

export function Detail(props: IDetail) {
  const handleSubmit = (values) => {
    props.presenter.saveCurrentItem(values);
    message.success("保存成功");
  };
  return (
    <div className={Style.detail} key={props.presenter.currentItem.id}>
      <div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={props.presenter.currentItem}
        >
          <FormItem
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "标题必填",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="地址(url)"
            name="url"
            rules={[
              {
                required: true,
                message: "地址必填",
              },
              {
                type: "url",
                message: "请输入有效的地址",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="分类"
            name="type"
            rules={[
              {
                required: true,
                message: "分类必填",
              },
            ]}
          >
            <Select>
              {ENUM_array_MarkType.map((type: any) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.description}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem className={Style.submit}>
            <Button onClick={() => props.presenter.setCurrentItem(null)}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
