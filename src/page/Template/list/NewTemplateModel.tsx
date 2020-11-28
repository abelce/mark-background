import * as Style from "./style.scss";
import * as React from "react";
import { Button, Input, Modal, Spin } from "antd";
import { Form } from "antd";
import EasyRemoteSelect from "@components/EasySelect";
import { createEntity } from "@services";
import { IModals } from "@components/modals";

export default class NewTemplateModel extends React.Component<IModals> {
  state = {
    loading: false,
  };

  handleOk = () => {};

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  handleReferChange = () => {};

  handleFinish = async (values: any) => {
    try {
      this.setState({
        loading: true,
      });
      await createEntity("Template", {
        label: values.label,
        referEntityID: values.referEntity.id,
        referEntityName: values.referEntity.name,
      });
      this.props.onOk();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <Modal title="新增模版" visible={true} footer={null} maskClosable onCancel={this.handleCancel}>
        <Spin spinning={this.state.loading} tip="loading...">
          <Form onFinish={this.handleFinish} className={Style.newTemplateModel}>
            <Form.Item
              label="模版名称"
              name="label"
              rules={[{ required: true, message: "模版名称必填!" }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="业务对象"
              name="referEntity"
              rules={[{ required: true, message: "业务对象必填!" }]}
            >
              <EasyRemoteSelect
                entityName="Entity"
                // onChange={this.handleReferChange}
              />
            </Form.Item>
            <Form.Item>
              <div className={Style.footer}>
                <Button size="small" onClick={this.handleCancel}>
                  取消
                </Button>
                <Button size="small" type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
