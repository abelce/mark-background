import * as React from "react";
import * as Style from "./style.scss";
import {Form} from "antd";
import {IExtendProps, ITemplateItem} from "@domain/interface/template";
import {propsComponents} from "./components";
import {EditPresenter} from "../editPreenter";
import {Observer} from "mobx-react";
import {oc} from "ts-optchain";
import {runInAction} from "mobx";

interface IPropsContainer {
    item: ITemplateItem;
    presenter: EditPresenter;
}

export default function PropsContainer(props: IPropsContainer) {
    // 获取默认值
    const getPropsInitValues = () => {
        const initValues = {};
        const {
            currentItem: {extendProps = []},
        } = props.presenter;
        for (let item of extendProps) {
            initValues[item.key] = item.value;
        }
        return initValues;
    };

    // 属性改变时修改模版上元素的属性值
    const handleValuesChange = (changedValues, allValues: any) => {
        runInAction(() => {
            const tmp = props.presenter.currentExtendProps.map((prop: IExtendProps) => {
                if (Reflect.has(changedValues, prop.key)) {
                    prop.value = changedValues[prop.key];
                }
                return prop;
            });
            props.presenter.setExtendProps(tmp);
        })
    };

    // item.nameh或item.compType改变时重新渲染form
    return (
        <div className={Style.props}>
            <Observer>
                {
                    () => (
                        <div>
                            {
                                props.presenter.currentItem
                                && <Form
                                    key={`${props.presenter.currentItem.name}_${props.presenter.currentItem.compType}`}
                                    initialValues={getPropsInitValues()}
                                    onValuesChange={handleValuesChange}
                                >
                                    {propsComponents.map((Comp) => Comp ? <Comp presenter={props.presenter}/> : null)}
                                </Form>
                            }
                        </div>
                    )
                }
            </Observer>

        </div>
    );
}
