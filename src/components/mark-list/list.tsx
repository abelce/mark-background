import * as React from "react";
import { ENUM_array_MarkType, IMark } from "@gen";
import * as Style from "./style.scss";
import * as dayjs from "dayjs";
import { Presenter } from "@page/layout/presenter";
import { Observer } from "mobx-react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Tag } from "antd";
const { useMemo } = React;

interface IMarkList {
  list: Array<IMark>;
  presenter: Presenter;
}

export function MarkList(props: IMarkList) {
  return (
    <Observer
      render={() => (
        <div className={Style["mark-list"]}>
          {props.list.map((item) => (
            <MarkItem key={item.id} data={item} presenter={props.presenter} />
          ))}
        </div>
      )}
    ></Observer>
  );
}

interface IMarkItem {
  data: IMark;
  presenter: Presenter;
}

// 确定删除弹框
function showDeleteConfirm(data: IMark, presenter: Presenter) {
  Modal.confirm({
    title: "确定删除?",
    icon: <ExclamationCircleOutlined />,
    content: "确定删除该记录",
    okText: "确定",
    okType: "danger",
    cancelText: "取消",
    onOk() {
      presenter.deleteMark(data.id);
    },
    onCancel() {},
  });
}

// 操作暗流列表
function getActionMenus(data: IMark, presenter: Presenter) {
  return (
    <Menu className={Style.actionMenu}>
      <Menu.Item>
        <a href="javascript:;" onClick={() => presenter.setCurrentItem(data)}>
          编辑
        </a>
      </Menu.Item>
      <Menu.Item danger>
        <span onClick={() => showDeleteConfirm(data, presenter)}>删除</span>
      </Menu.Item>
    </Menu>
  );
}

function MarkItem(props: IMarkItem) {
  const {
    data: { id, title, url, createTime, isStar, type },
  } = props;

  const typeObject = useMemo(() => {
    return ENUM_array_MarkType.find((ty) => ty.value === type);
  }, [type]);

  return (
    <Observer
      render={() => (
        <div className={Style["mark-item"]} key={id}>
          {/* <div className={Style.left}>
                <input type="checkbox" checked={props.presenter.isSelected(id)} onChange={() => props.presenter.selectMark(id)} />
            </div> */}
          <a className={Style.content} href={url} target="_blank">
            <div className={Style.title}>{title}</div>
            <div className={Style.url}>{url}</div>
            <div className={Style.meta}>
              <div>{dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
              {typeObject && (
                <div className={Style.tag}>
                  <Tag>
                    {typeObject.description}
                    </Tag>
                </div>
              )}
            </div>
          </a>
          <div className={Style.right}>
            {isStar ? (
              <span
                className="iconfont iconbaseline-star-px"
                onClick={() => props.presenter.starMark(id)}
              ></span>
            ) : (
              <span
                className="iconfont iconstar"
                onClick={() => props.presenter.starMark(id)}
              ></span>
            )}
            <Dropdown
              trigger={["click"]}
              overlay={getActionMenus(props.data, props.presenter)}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span className="iconfont iconmore"></span>
              </a>
            </Dropdown>
          </div>
        </div>
      )}
    ></Observer>
  );
}
