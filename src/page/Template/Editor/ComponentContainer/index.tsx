import * as React from 'react';
import * as Style from './style.scss';
import cn from 'classnames';

interface IComponentContainer {
    label: string;
    name: string;
    readonly?: boolean;
    required?: boolean;
    layout: 'horizontal' | 'vertical';
    component: React.Component | React.FC | null
    style: object;
}

export default function ComponentContainer(props: IComponentContainer) {
    const {label, name, readonly = false, required, layout='horizontal', component = null, style} = props;
    return <div className={cn(Style.componentContainer, {})} style={style}>
        <div className={cn(Style.label, {[Style.requires]: required})}>
            {label}
        </div>
        <div>
            {
                () => {
                    if (component === null) {
                        return null;
                    } else {
                        return <component disabled={readonly} />
                    }
                }
            }
        </div>
    </div>
}