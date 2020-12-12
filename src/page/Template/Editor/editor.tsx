import FieldSelect from "@components/FieldSelect";
import { Footer } from "@components/Footer";
import LoadingContainer from "@components/LoadingContainer";
import {
  ENUM_LOADING_SENDING,
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
} from "@domain/enums";
import { IField } from "@domain/interface";
import { ITemplateItem } from "@domain/interface/template";
import { Template, TemplateItem } from "@domain/template";
import { observer, Observer } from "mobx-react";
import * as React from "react";
import ComponentSet, { getDefaultCompByField } from "./ComponentSet";
import { EditPresenter } from "./editPreenter";
import Main from "./Main";
import PropsTabs from "./PropsTab";
import * as Style from "./style.scss";
import {Button} from "antd";
import Modals from "@components/modals";
import {Previw} from "@page/Template/Editor/preview/preview";
import {runInAction} from "mobx";

@observer
export default class Editor extends React.Component {
  
  // @observable
  private presenter: EditPresenter;

  constructor(props) {
    super(props);
    this.presenter = new EditPresenter("Template");
  }

  handleCompInsert = (field: IField) => {
    const { label, name } = field;
    const compType = getDefaultCompByField(field);
    const newComp = new TemplateItem({
      label,
      name,
      compType,
      width: 200,
    });

    runInAction(() => {
      this.presenter.data.items.push(newComp);
    });
  };

  handleCompRemove = (name: string) => {
    const { data } = this.presenter;
    runInAction(() => {
      data.items = data.items.filter(
        (item: ITemplateItem) => item.name !== name
      );
      if (name === this.presenter.currentItemName) {
        this.presenter.currentItemName = '';
      }
    });
  };

  handleCompSelect = (name: string) => {
    this.presenter.currentItemName = name;
  };

  // 组件属性改变时触发
  handleChangeTemplateItemProps = (value: ITemplateItem) => {
    const { data } = this.presenter;
    const index = data.items.findIndex(
      (item: ITemplateItem) => item.name === value.name
    );
    if (index !== -1) {
      data.items[index] = value;
    }
  };

  // 点击右侧组件栏目时，切换字段的组件
  handleComponentSetClick = (compType: string) => {
    const { data } = this.presenter;
    const index = data.items.findIndex(
      (item: ITemplateItem) =>
        item.name === this.presenter.currentItemName
    );
    if (index !== -1) {
      const item = data.items[index];
      item["compType"] = compType;
      item.resetExtendProps();
    }
  };

  private  handlePreview = () => {
    Modals.show(Previw, {presenter: this.presenter})
  }

  private renderFooter = () => {
    if ([ENUM_MODE_CREATE, ENUM_MODE_EDIT].includes(this.presenter.mode)) {
      return (
        <div className={Style.footerContainer}>
          <div>
            <Button onClick={this.handlePreview}>预览</Button>
          </div>
          <Footer onSave={this.presenter.saveData} onCancel={this.handleCancel} />
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className={Style.baseForm}>
        <Observer
          render={() => (
            <LoadingContainer
              spinning={this.presenter.loading === ENUM_LOADING_SENDING}
              tip="Loading..."
            >
              <div className={Style.editor}>
                <div className={Style.editor_fields}>
                  <FieldSelect
                    presenter={this.presenter}
                  />
                </div>
                <div className={Style.editor_content}>
                  <Main
                    // items={items}
                    presenter={this.presenter}
                    // current={this.presenter.cu}
                    // onSelect={this.handleCompSelect}
                  />
                </div>
                <div className={Style.editor_props}>
                  {/* <PropsContainer item={this.state.crrrencuComp as ITemplateItem} onChange={this.handleChangeTemplateItemProps}/> */}
                  <PropsTabs
                    presenter={this.presenter}
                  />
                </div>
              </div>
              {this.renderFooter()}
            </LoadingContainer>
          )}
        />
      </div>
    );
  }
}
