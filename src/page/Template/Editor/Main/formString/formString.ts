// 标的字段串


import {EditPresenter} from "@page/Template/Editor/editPreenter";
import * as Style from "@page/Template/Editor/Main/style.scss";
import {
    formLayout,
    getColSpan,
    getCompAttr,
    getCompText,
    getItemProps,
    renderComp,
    switchCompString
} from "@page/Template/Editor/Main/index";
import {getRulesString, objectToString} from "./utils";
import {getItemString} from "@page/Template/Editor/Main/formString/itemString";
import { getFooterString } from "./footerString";
import { getImportString } from "./importString";

export function getFormString(presenter: EditPresenter) {
    const importStr = getImportString();
    const bodyStr = getBodyString(presenter);

    return [
        importStr,
        '',
        bodyStr,
    ].join('\n');
}

function getBodyString(presenter: EditPresenter): string {
    const {data: {items = [], referEntityName}} = presenter;
    return `export function ${referEntityName} (props){
        const onFinish = values => {
           console.log('Success:', values);
        };
        
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        
        const getInitialValues = () => {
            return {};
        }
        
        return <Form
                ${objectToString(formLayout)}
                layout="vertical" 
                className={Style.form}
                initialValues={getInitialValues()}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    <Row style={{width: '100%'}}>
                      ${items.map((item) => getItemString(item)).join('\n')}
                    </Row>
            ${getFooterString()}
        </Form>
    }`
}
