import * as React from "react";
import * as Style from "./style.scss";
import { Form } from "antd";
import WidthSlider from "./components/WidthSlider";
import Required from "./Required";
import Readonly from "./components/Readonly";
import { IExtendProps, ITemplateItem } from "@domain/interface/template";
import ColSlider from "./components/ColSlider";
import { Presenter } from "@components/presenter";
import { propsComponents } from "./components";
import { EditPresenter } from "../editPreenter";

interface IPropsContainer {
    item: ITemplateItem;
    presenter: EditPresenter;
    // onChange: (data: any) => void;
}

export default function PropsContainer(props: IPropsContainer) {

    // 获取默认值
    const getPropsInitValues = () => {
        const initValues = {};
        const { item: { extendProps = [] } } = props;
        for (let item of extendProps) {
            initValues[item.key] = item.value;
        }
        return initValues;
    }

    // 属性改变时修改模版上元素的属性值
    const handleValuesChange = (changedValues, allValues: any) => {
        const {item} = props;
        item.extendProps.forEach((prop: IExtendProps) => {
            if (Reflect.has(changedValues, prop.key)) {
                prop.value = changedValues[prop.key];
            }
        })
        // props.onChange && props.onChange(item);
    }

    const currentItem = props.presenter.currentItem;

    if (!currentItem) {
        return null;
    }

    return <div className={Style.props}>
        <Form
            // item.nameh或item.compType改变时重新渲染form
            key={`${currentItem.name}_${currentItem.compType}`}
            initialValues={getPropsInitValues()}
            onValuesChange={handleValuesChange}>
                {
                    propsComponents.map(Comp => Comp ? <Comp presenter={props.presenter}/> : null)
                }
            {/* <ColSlider/> */}
            {/* <WidthSlider /> */}
            {/* <Required /> */}
            {/* <Readonly /> */}
        </Form>
    </div>;
}