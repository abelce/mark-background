import {IExtend} from "@domain/interface/template";

export function getInputExtendsProps() {
    const extendProps: Array<IExtend> = [
        {
            type: "attr",
            key: "type",
            value: "password",
        },
        {
            type: "attr",
            key: "size",
            value: "default",
        },
    ];

    return extendProps;
}