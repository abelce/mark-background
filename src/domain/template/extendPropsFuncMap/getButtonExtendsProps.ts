import {IExtend} from "@domain/interface/template";

export function getButtonExtendsProps() {
    // button组件需要按钮text
    const extendProps: Array<IExtend> = [
        {
            type: "text",
            key: "text",
            value: "按钮",
        },
        {
            type: "comp-attr", // 组件自身的属性，作用在组件本身，eg: <Input type="primary"/>
            key: "type",
            value: "primary",
        },
    ];

    return extendProps;
}