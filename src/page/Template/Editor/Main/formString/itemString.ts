import {getColSpan} from "@page/Template/Editor/Main";
import {getCompString, getItemPropsString, getRulesString} from "@page/Template/Editor/Main/formString/utils";

export function getItemString(item) {
    const itemProps = getItemPropsString(item);
    return `<Col span={${getColSpan(item)}} key={"${item.name}"}>
        <Form.Item 
            name={"${item.name}"} 
            label={"${item.label}"} 
            className={Style.field} 
            rules={${getRulesString(item)}}
            ${itemProps}>
            ${getCompString(item)}
        </Form.Item>
    </Col>`;
}