import {getCompAttr, getCompText, getItemProps, getRules, switchCompString} from "@page/Template/Editor/Main";

export function getCompString(item = {}) {
    const Comp = switchCompString(item);
    const compProps = getCompAttrString(item);
    const text = getCompText(item) || '';
    if (text) {
        return `<${Comp} ${compProps}>
                ${text}
            </${Comp}>`
    }
    return `<${Comp} ${compProps}/>`
}

// 组件的属性字符串
export function getCompAttrString(item = {}) {
    const attrObject = getCompAttr(item);
    return objectToString(attrObject);
}

export function getItemPropsString(item = {}) {
    const obj = getItemProps(item);
    return objectToString(obj);
}

export  function getRulesString(item) {
    const obj = getRules(item);
    return objectToString(obj);
}

// 奖对象转为字符串
export function objectToString(obj = {}) {
    if (Array.isArray(obj)) {
        return JSON.stringify(obj);
    }
    return Reflect.ownKeys(obj).map((current: string) => {
        switch (typeof obj[current]) {
            case 'string':
                return ` ${current}={"${obj[current]}"}`;
            case 'number':
            case 'boolean':
                return ` ${current}={${obj[current]}}`;
            case 'object':
                return ` ${current}={${JSON.stringify(obj[current])}}`;
            default:
                return ` ${current}={"${obj[current]}"}`;
        }
    }).join('\n');
}