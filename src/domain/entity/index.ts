import { ENUM_FIELDTYPE_DETAIL, ENUM_FIELDTYPE_ENUM, ENUM_FIELDTYPE_OBJECT } from "@domain/enums";

export class Entity{
    id: string = '';
    name: string = '';
    label: string = '';
    fields: Array<EntityField> = [];

    constructor(data: any) {
        const {id, name, label, fields = []} = data || {};
        this.id = id;
        this.name = name;
        this.label = label;
        this.fields = fields.map( (field: any) => new EntityField(field));
    }
}

export class EntityField {
    id: string = '';
    name: string = '';
    label: string = '';
    referEntityID = '';
    referEntityName = '';
    fieldType:string = '';

    get isRefer() {
        return this.fieldType === ENUM_FIELDTYPE_OBJECT;
    }

    get isEnum() {
        return this.fieldType === ENUM_FIELDTYPE_ENUM;
    }

    get isDetail() {
        return this.fieldType === ENUM_FIELDTYPE_DETAIL;
    }

    get isExtend() {
        return this.isRefer || this.isEnum || this.isDetail;
    }

    constructor(data: any) {
        const {id, name, label, referEntityID, referEntityName, fieldType} = data || {};
        this.id = id;
        this.name = name;
        this.label = label;
        this.referEntityID= referEntityID;
        this.referEntityName = referEntityName;
        this.fieldType = fieldType;
    }
}

export const entityList = (list: Array<any>) => {
    return list.map(item => new Entity(item));
}