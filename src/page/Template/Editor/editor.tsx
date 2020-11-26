import * as React from 'react';
import ComponentSet from './ComponentSet';
import * as Style from './style.scss';

export default function Editor() {
    const handleComponentSetClick = (comp: React.Component | React.FC) => {
        debugger;
    }
    return <div className={Style.editor}>
        <div>
            <ComponentSet onClick={handleComponentSetClick}/>
        </div>
    </div>
}