import BaseEntityForm from "@components/EntityForm ";
import FieldSelect from "@components/FieldSelect";
import { IField } from "@domain/interface";
import { ITemplateItem } from "@domain/interface/template";
import { Template, TemplateItem } from "@domain/template";
import * as React from "react";
import ComponentSet, { getDefaultCompByField } from "./ComponentSet";
import Main from "./Main";
import PropsContainer from "./PropsContainer";
import PropsTabs from "./PropsTab";
import * as Style from "./style.scss";

@BaseEntityForm("Template")
export default class Editor extends React.Component {


  state = {
    crrrencuComp: null,
  }

  handleCompInsert = (field: IField) => {
    const { label, name } = field;
    const compType = getDefaultCompByField(field);
    const newComp = new TemplateItem({
      label,
      name,
      compType,
      width: 200,
    });

    const { onChange, data } = this.props;
    data.items.push(newComp);
    onChange && onChange(data);

    this.setState({
      crrrencuComp: newComp,
    })
  };

  handleCompRemove = (name: string) => {
    const { onChange, data } = this.props;
    data.items = data.items.filter((item) => item.name !== name);
    onChange && onChange(data);
  };

  handleCompSelect = (crrrencuComp) => {
    this.setState({
      crrrencuComp
    })
  }

  // 组件属性改变时触发
  handleChangeTemplateItemProps = (value: ITemplateItem) => {
    const {data, onChange} = this.props;
    const index = data.items.findIndex(item => item.name === value.name);
    if (index !== -1) {
      data.items[index] = value;
    }
    onChange && onChange({...data});
  }

  // 点击右侧组件栏目时，切换字段的组件
  handleComponentSetClick = (compType: string) => {
    const {crrrencuComp} = this.state;
    const {data, onChange} = this.props;
    const index = data.items.findIndex(item => item.name === crrrencuComp.name);
    if (index !== -1) {
      const item = data.items[index];
      item['compType'] = compType;
      item.resetExtendProps();
      console.log(item);
    }
    onChange && onChange(new Template(data));
  }

  render() {
    const { referEntityID } = this.props.data;
    return (
      <div className={Style.editor}>
        <div className={Style.editor_fields}>
          <FieldSelect
            entityName="entity"
            entityID={referEntityID}
            onInsert={this.handleCompInsert}
            onRemove={this.handleCompRemove}
            value={this.props.data.items}
          />
        </div>
        <div className={Style.editor_content}>
          <Main items={this.props.data.items || []} current={this.state.crrrencuComp} onSelect={this.handleCompSelect}/>
        </div>
        <div className={Style.editor_props}>
          {/* <PropsContainer item={this.state.crrrencuComp as ITemplateItem} onChange={this.handleChangeTemplateItemProps}/> */}
          <PropsTabs 
          item={this.state.crrrencuComp as unknown as ITemplateItem} 
          onSelectComp={this.handleComponentSetClick}
          onChange={this.handleChangeTemplateItemProps}/>
        </div>
      </div>
    );
  }
}
