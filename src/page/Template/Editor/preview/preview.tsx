import React from 'react';
import {EditPresenter} from "@page/Template/Editor/editPreenter";
import {FormRender} from './formRender';
import * as Style from './style.scss';
import { Button } from 'antd';
import {CodeEditor} from "@page/Template/Editor/preview/CodeEditor";
import { getFormString } from '../Main/formString/formString';
import {CodeTabs} from "@page/Template/Editor/preview/tabs";

interface IPreviw {
    presenter: EditPresenter;
    onOk: () => void;
}

export function Previw(props: IPreviw) {
    return <div className={Style.preview}>
        <div className={Style.content}>
            <div className={Style.main}>
                <div className={Style.code}>
                    <CodeTabs {...props}/>
                </div>
                <div className={Style.render_container}>
                    <div className={Style.form}>
                        <FormRender presenter={props.presenter}/>
                    </div>
                    <div className={Style.footer}>
                        <Button onClick={props.onOk}>退出</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}