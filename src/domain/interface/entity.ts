export interface IEntity {
    label: string;
    name: string;
    fileds: Array<IField>;
    id: string;
}

export interface IField {
   label: string;
   name: string;
//    readonly: boolean;
//    required: boolean;
   fieldType: string;
   // valueType: string;
}