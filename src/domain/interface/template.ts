export interface ITemplate {
    id: string;
    label: string; // 默认与entity相同
    items: Array<ITemplateItem>;
    referEntityID: string;
    referEntityName: string;
    createdTime: number;
    udpateTime: number;
}

export interface ITemplateItem {
    label: string; // 默认与entity相同
    name: string;
    compType: string;
    readonly: boolean;
    required: boolean;
    width: number;
    extendProps?: Array<IExtendProps>;
}
export interface IExtendProps {
    type: string;
    key: string;
    value: any;
}
