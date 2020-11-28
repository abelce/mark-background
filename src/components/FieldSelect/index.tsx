import { IField } from "@domain/interface";
import { getEntityByID } from "@services";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { template, values } from "lodash";
import * as React from "react";
import * as Style from './style.scss';

const { useEffect, useState, useCallback, useMemo } = React;

interface IFieldSelect {
  entityName: string;
  entityID: string;
  value: Array<IField>;
//   onChange: (value: Array<IField>) => void;
  onInsert: (field: IField)=>void;
  onRemove: (name: string)=>void;
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

  const handleSelect = useCallback((field: IField) => {
    if (!checkList[field.name]) {
      props.onInsert(field);
    } else {
      props.onRemove(field.name);
    }
  }, []);

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
  }, [props.value, entity]);

  if (!entity) {
    return null;
  }

  return (
    <div className={Style.fieldSelect}>
      <div className={Style.header}>
        <div className={Style.header_name}>{entity.name}</div>
        <div className={Style.header_label}>{entity.label}</div>
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
      <Checkbox
        checked={props.checked}
        onChange={() => props.onSelect(props.field)}
      />
      <span className={Style.field_name}>{props.field.label}</span>
    </div>
  );
}
