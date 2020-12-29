// 切换组件时重新设置所有的属性
import {IExtend} from "@domain/interface/template";

export function baseProps() {
    const defaultProps: Array<IExtend> = [
        {
            type: "style",
            key: "width",
            value: 100, // 默认100%
        },
        {
            type: "col",
            key: "col",
            value: 6, // 栅格值默认为6
        },
        {
            type: "attr",
            key: "required",
            value: false,
        },
        {
            type: "comp-attr",
            key: "readonly",
            value: false,
        },
        {
            type: "style",
            key: "hide",
            value: false,
        },
    ];

    return defaultProps;
}