import {IField} from "@domain/interface";
import {EditPresenter} from "@page/Template/Editor/editPreenter";
import {getEntityByID} from "@services";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {Observer, observer} from "mobx-react";
import * as React from "react";
import {oc} from "ts-optchain";
import * as Style from "./style.scss";

const {useEffect, useState} = React;

interface IFieldSelect {
    presenter: EditPresenter;
}

export default function FieldSelect(props: IFieldSelect) {
    const [entity, setEntity] = useState(null);
    const {presenter} = props;

    useEffect(() => {
        try {
            oc(presenter.data).referEntityID('') && getEntityByID('entity', presenter.data.referEntityID).then((result) => {
                setEntity(result);
            });
        } catch (e) {
            console.error(e);
        }
    }, [oc(presenter.data).referEntityID('')]);

    const handleSelect = (field: IField) => {
        if (!props.presenter.isItemExist(field.name)) {
            props.presenter.addItem(field);
        } else {
            props.presenter.removeItem(field.name);
        }
    };

    if (!entity) {
        return null;
    }

    return (
        <div className={Style.fieldSelect}>
            <Observer>
                {
                    () => {
                        return <div>
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
                                        checked={props.presenter.isItemExist(field.name)}
                                    />
                                ))}
                            </div>
                        </div>
                    }
                }
            </Observer>
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
        <Checkbox checked={props.checked}/>
        <span className={Style.field_name}>{props.field.label}</span>
      </span>
        </div>
    );
}
