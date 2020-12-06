import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
  ENUM_MODE_VIEW,
} from "@/domain/enums";
import { createEntity, getEntityByID, updateEntity } from "@/services";
import { parseQuery } from "@/utils";
import { Button, message, Spin } from "antd";
import { autobind } from "core-decorators";
import { observable, computed, action } from "mobx";
import * as React from "react";
import { observer, Observer } from "mobx-react";
import * as Style from "./style.scss";
import { relativeTimeThreshold } from "moment";
import { withRouter } from "react-router-dom";
import { Entity, EntityList } from "@domain/entity";
import { Constant } from '@gen/entity-classes';

interface IBaseFormProps {}
interface IBaseFormState {
  mode: string;
}

export interface IChildrenProps {
  entityName: string;
  mode: string;
  data: any;
  loading: string;
  onChange: (data: any) => void;
}

const FormConstant = (entityName: string) => {
  return (ChildrenComponent: React.ComponentClass | React.FC) => {
    return withRouter(
      class extends React.Component<IBaseFormProps, IBaseFormState> {
        _ref = React.createRef();

        state = {
          data: null,
          loading: ENUM_LOADING_SUCCESS,
        };
        // @observable
        protected mode: string = "";

        protected id: string = "";

        // @observable
        protected entityName: string = "";

        // @observable
        // protected data: any;

        // @observable
        // protected loading: boolean;

        // @computed
        get childrenProps() {
          const res = {
            ...this.props,
            entityName: this.entityName,
            data: this.state.data,
            loading: this.state.loading,
            mode: this.mode,
            onChange: this.handleChange,
          };
          return res;
        }

        constructor(props: IBaseFormProps) {
          super(props);
          this.init(props);
        }

        init = (props: IBaseFormProps) => {
          const obj = parseQuery();
          this.mode = (obj["mode"] as string) || ENUM_MODE_CREATE;
          this.entityName = entityName;
          if (this.mode === ENUM_MODE_VIEW) {
          }
          switch (this.mode) {
            case ENUM_MODE_VIEW:
              this.id = obj.id;
              break;
            case ENUM_MODE_CREATE:
              this.state.data = new Constant();
              break;
            case ENUM_MODE_EDIT:
              this.id = obj.id;
              break;
          }
        };

        componentDidMount() {
          console.log("componentDidMount...");
          if (
            (this.mode === ENUM_MODE_VIEW || this.mode === ENUM_MODE_EDIT) &&
            this.id
          ) {
            this.queryData();
          }
        }

        @action
        handleChange = (data: any) => {
          // this.data = [...data];
          this.setState({
            data: new Constant(data),
          });
        };

        handleCancel = () => {
          this.gotoList();
        };

        handleSave = () => {
          try {
            let beforeSave = this._ref.current.beforeSave;
            if (typeof beforeSave !== "function") {
              beforeSave = () => Promise.resolve();
            }
            beforeSave().then(() => {
              this.saveData();
            });
          } catch (e) {
            console.error(e);
          }
        };

        saveData = () => {
          switch (this.mode) {
            case ENUM_MODE_CREATE:
              this.createData();
              break;
            case ENUM_MODE_EDIT:
              this.updateData();
              break;
          }
        };

        createData = async () => {
          try {
            // this.loading = ENUM_LOADING_SENDING;
            this.setState({
              loading: ENUM_LOADING_SENDING,
            });
            await createEntity(this.entityName, this.state.data);
            // this.loading = ENUM_LOADING_SUCCESS;
            this.setState({
              loading: ENUM_LOADING_SUCCESS,
            });
            message.success("保存成功");
            this.gotoList();
          } catch (e) {
            // this.loading = ENUM_LOADING_FAILED;
            this.setState({
              loading: ENUM_LOADING_FAILED,
            });
            message.error("保存失败");
          }
        };

        updateData = async () => {
          try {
            // this.loading = ENUM_LOADING_SENDING;
            this.setState({
              loading: ENUM_LOADING_SENDING,
            });
            await updateEntity(this.entityName, this.state.data);
            // this.loading = ENUM_LOADING_SUCCESS;
            this.setState({
              loading: ENUM_LOADING_SUCCESS,
            });
            message.success("保存成功");
            this.gotoList();
          } catch (e) {
            // this.loading = ENUM_LOADING_FAILED;
            this.setState({
              loading: ENUM_LOADING_FAILED,
            });
            message.error("保存失败");
          }
        };

        gotoList = () => {
          this.props.history.push(`/${this.entityName}/list`);
        };

        queryData = async () => {
          try {
            // this.loading = ENUM_LOADING_SENDING;
            this.setState({
              loading: ENUM_LOADING_SENDING,
            });
            const result = await getEntityByID(this.entityName, this.id);
            this.setState({
              data: new Constant(result),
              loading: ENUM_LOADING_SUCCESS,
            });
          } catch (e) {
            console.error(e);
            // this.loading = ENUM_LOADING_FAILED;
            this.setState({
              loading: ENUM_LOADING_FAILED,
            });
            message.error("获取数据失败");
          }
        };

        private renderFooter = () => {
          if ([ENUM_MODE_CREATE, ENUM_MODE_EDIT].includes(this.mode)) {
            return (
              <div className={Style.footerContainer}>
                <Footer onSave={this.saveData} onCancel={this.handleCancel} />
              </div>
            );
          }
          return null;
        };

        render() {
          return (
            <Observer
              render={() => (
                <div className={Style.baseForm}>
                  <Spin
                    spinning={this.state.loading === ENUM_LOADING_SENDING}
                    tip="Loading..."
                  >
                    <div>
                      {this.state.data ? (
                        <ChildrenComponent
                          {...this.childrenProps}
                          ref={this._ref}
                        />
                      ) : null}
                    </div>
                    {this.renderFooter()}
                  </Spin>
                </div>
              )}
            ></Observer>
          );
        }
      }
    );
  };
};

interface IFooter {
  onSave: () => void;
  onCancel: () => void;
}
function Footer(props: IFooter) {
  return (
    <div className={Style.footer}>
      <Button onClick={props.onCancel}>取消</Button>
      <Button type="primary" onClick={props.onSave}>
        提交
      </Button>
    </div>
  );
}

export default FormConstant;
