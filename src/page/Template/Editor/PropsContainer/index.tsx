import * as React from "react";
import * as Style from "./style.scss";
import { Form } from "antd";
import WidthSlider from "./WidthSlider";
import Required from "./Required";
import Readonly from "./Readonly";
import { IExtendProps, ITemplateItem } from "@domain/interface/template";
import ColSlider from "./ColSlider";

interface IPropsContainer {
    item: ITemplateItem;
    onChange: (data: any) => void;
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
        props.onChange && props.onChange(item);
    }

    if (!props.item) {
        return null;
    }

    return <div className={Style.props}>
        <Form
            // item.nameh或item.compType改变时重新渲染form
            key={`${props.item.name}_${props.item.compType}`}
            initialValues={getPropsInitValues()}
            onValuesChange={handleValuesChange}>
            <ColSlider/>
            <WidthSlider />
            <Required />
            <Readonly />
        </Form>
    </div>;
}