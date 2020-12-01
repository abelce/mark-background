import { IField } from "@domain/interface";
import { getEntityByID } from "@services";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { template, values } from "lodash";
import * as React from "react";
import * as Style from "./style.scss";

const { useEffect, useState, useCallback, useMemo } = React;

interface IFieldSelect {
  entityName: string;
  entityID: string;
  value: Array<IField>;
  onInsert: (field: IField) => void;
  onRemove: (name: string) => void;
}

export default function FieldSelect(props: IFieldSelect) {
  const [entity, setEntity] = useState(null);
  const [checkList, setCheckList] = useState({});

  useEffect(() => {
    try {
      getEntityByID(props.entityName, props.entityID).then((result) => {
        setEntity(result);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelect = (field: IField) => {
    if (!checkList[field.name]) {
      props.onInsert(field);
    } else {
      props.onRemove(field.name);
    }
  };

  useMemo(() => {
    const result = {};
    if (entity) {
      entity.fields.forEach((field) => {
        result[field.name] = (props.value || []).some(
          (templateField) => templateField.name === field.name
        );
      });
    }
    setCheckList(result);
  }, [(props.value || []).length, entity]);

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
