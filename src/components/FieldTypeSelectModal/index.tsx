/**
 * 改组件主要用于entity选择属性类型时根据对象数组选择不同的
 */
import FieldType from "@page/Entity/form/FeildType";
import * as React from "react";
import EasyRemoteSelect from "@components/EasySelect";
import { ISelectModal, SelectModal } from "./modal";
import Modals from "@components/modals";
import { Button } from "antd";
import * as Style from "./style.scss";

export function FieldTypeSelectModal(props: ISelectModal) {
  const handleShowModal = () => {
    Modals.show(SelectModal, {...props}).then((data) => {
      props.onChange && props.onChange(data);
    });
  };

  const renderAdvance = () => {
    if(props.referEntityID) {
      return <EasyRemoteSelect entityName="entity" value={props.referEntityID} disabled/>
    }  
    if (props.isAdvance) {
      return <FieldType value={props.advanceType} disabled />
    }
    return null;
  }

  return (
    <div className={Style.select_modal_wrapper}>
      <div className={Style.input}>
        <FieldType value={props.fieldType} disabled />
        {renderAdvance()}
      </div>
      <Button type="link" onClick={handleShowModal}>
        编辑
      </Button>
    </div>
  );
}
