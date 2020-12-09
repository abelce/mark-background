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
import * as React from "react";
import { Observer } from "mobx-react";
import * as Style from "./style.scss";
import { withRouter } from "react-router-dom";
import LoadingContainer from "@components/LoadingContainer";
import { Template } from "@domain/template";

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

const BaseEntityForm  = (entityName: string) => {
  return (ChildrenComponent: React.ComponentClass | React.FC) => {
    return withRouter(
      class extends React.Component<IBaseFormProps, IBaseFormState> {
       

        constructor(props: IBaseFormProps) {
          super(props);
         
        }

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
                  <LoadingContainer
                    spinning={this.state.loading === ENUM_LOADING_SENDING}
                    tip="Loading..."
                  >
                      {this.state.data ? (
                        <ChildrenComponent
                          {...this.childrenProps}
                          ref={this._ref}
                        />
                      ) : null}
                    {this.renderFooter()}
                  </LoadingContainer>
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

export default BaseEntityForm;
