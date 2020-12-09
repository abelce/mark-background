import { IField } from "@domain/interface";
import { EditPresenter } from "@page/Template/Editor/editPreenter";
import { getEntityByID } from "@services";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { observer } from "mobx-react";
import * as React from "react";
import { oc } from "ts-optchain";
import * as Style from "./style.scss";

const { useEffect, useState, useCallback, useMemo } = React;

interface IFieldSelect {
  presenter: EditPresenter;
}

@observer
export default function FieldSelect(props: IFieldSelect) {
  const [entity, setEntity] = useState(null);
  const [checkList, setCheckList] = useState({});

  const {presenter} = props;
  // const entityName = presenter.entityName;

  useEffect(() => {
    try {
      getEntityByID('entity', presenter.data.referEntityID).then((result) => {
        setEntity(result);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelect = (field: IField) => {
    if (!checkList[field.name]) {
      props.presenter.addItem(field);
    } else {
      props.presenter.removeItem(field.name);
    }
  };

  useMemo(() => {
    const items = oc(presenter.currentItem).items([]);
    const result = {};
    if (entity) {
      entity.fields.forEach((field) => {
        result[field.name] = (items || []).some(
          (templateField) => templateField.name === field.name
        );
      });
    }
    setCheckList(result);
  }, [oc(presenter.currentItem).items([]).length, entity]);

  if (!entity) {
    return null;
  }

  return (
    <div className={Style.fieldSelect}>
      <div className={Style.header}>
        <div className={Style.header_name}>
          <strong>业务对象: {entity.name}</strong>
        </div>
        <div className={Style.header_label}>
          <strong>业务对象名称: {entity.label}</strong>
        </div>
      </div>
      <div className={Style.fields}>
        {entity.fields.map((field) => (
          <Item
            key={field.id}
            field={field}
            onSelect={handleSelect}
            checked={checkList[field.name]}
          />
        ))}
      </div>
    </div>
  );
}

interface IItem {
  field: IField;
  checked: boolean;
  onSelect: (field: IField) => void;
}

function Item(props: IItem) {
  return (
    <div className={Style.field}>
      <span
        className={Style.field_content}
        onClick={() => props.onSelect(props.field)}
      >
        <Checkbox checked={props.checked} />
        <span className={Style.field_name}>{props.field.label}</span>
      </span>
    </div>
  );
}
