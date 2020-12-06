import { ITemplateItem } from '../entity-interfaces/TemplateItem'

export class TemplateItem implements ITemplateItem {

  id: string
  label: string
  required: boolean
  readonly: boolean
  compType: string
  extendsProps: any

  constructor({id, label, required, readonly, compType, extendsProps}={}){
    this.id = id;
    this.label = label;
    this.required = required;
    this.readonly = readonly;
    this.compType = compType;
    this.extendsProps = extendsProps;
  }
}