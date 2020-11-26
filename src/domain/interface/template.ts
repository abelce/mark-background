interface ITemplate {
    label: string; // 默认与entity相同
    name: string;
    readonly: boolean;
    required: boolean;
    width: string;
    eleType: string; // 组件类型，没有设置就按系统默认的组件
}