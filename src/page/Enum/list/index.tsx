import { entityList } from "@domain/entity";
import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
} from "@domain/enums";
import { IEntity } from "@domain/interface";
import { deleteEntity, getEntityList } from "@services";
import { Button, Divider, message, Popconfirm, Spin, Table } from "antd";
import { action, observable, reaction } from "mobx";
import { observer, Observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import * as Style from "./style.scss";

@observer
export default class EntityList extends React.Component {
  private readonly entityName = "Enum";

  @observable
  private list: Array<IEntity> = [];

  columns = [
    {
      title: "常量",
      dataIndex: "name",
    },
    {
      title: "描述",
      dataIndex: "label",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Link to={`/${this.entityName}/form?mode=Edit&id=${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="bottom"
              title="确定删除"
              onConfirm={() => this.handleOnDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  state = {
    loading: ENUM_LOADING_SUCCESS,
  };

  componentDidMount() {
    reaction(
      () => this.list.length,
      (value) => {
      }
    );
    this.queryList();
  }

  @action
  queryList = async () => {
    try {
      this.setState({
        loading: ENUM_LOADING_SENDING,
      });
      const result = await getEntityList(this.entityName, {
        "page[limit]": 999, // 分页大小
        "page[offset]": 0, // 偏移量
        sort: "-createdTime",
      });
      this.list = entityList(result.data);
      this.setState({
        loading: ENUM_LOADING_SUCCESS,
      });
    } catch (e) {
      console.error(e);
      this.setState({
        loading: ENUM_LOADING_FAILED,
      });
    }
  };

  handleOnDelete = async (entity: IEntity) => {
    try {
      this.setState({
        loading: ENUM_LOADING_SENDING,
      });
      await deleteEntity(this.entityName, entity.id);
      await this.queryList();
    } catch (e) {
      this.setState({
        loading: ENUM_LOADING_FAILED,
      });
      console.error(e);
      message.error("服务器发生错误");
    }
  };

  render() {
    return (
      <Observer
        render={() => (
          <div className={Style.list}>
            <Spin
              spinning={this.state.loading === ENUM_LOADING_SENDING}
              tip="loading..."
            >
              <div className={Style.header}>
                <Button type="primary" size="small">
                  <Link to={`/${this.entityName}/form?mode=Create`}>新增</Link>
                </Button>
              </div>
              <Table
                rowKey="id"
                dataSource={this.list}
                columns={this.columns}
                size="small"
              />
            </Spin>
          </div>
        )}
      ></Observer>
    );
  }
}
