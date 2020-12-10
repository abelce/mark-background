import {getButtonExtendsProps} from "@domain/template/extendPropsFuncMap/getButtonExtendsProps";
import {getInputExtendsProps} from "@domain/template/extendPropsFuncMap/getInputExtendsProps";
import {baseProps} from "@domain/template/extendPropsFuncMap/baseProps";

export const extendPropsFuncMap = {
    button: getButtonExtendsProps,
    input: getInputExtendsProps
};


export function getExtendProps(compType: string) {
    const spicalExtendProps = extendPropsFuncMap[compType]
        ? extendPropsFuncMap[compType]()
        : [];
    const defaultProps = baseProps().concat(spicalExtendProps);

    return defaultProps;
}

