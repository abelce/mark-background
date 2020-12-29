import * as React from 'react';
import * as Style from './style.scss';

export default function SourceBar({children}) {
    return <div className={Style['source-bar']}>
        {children}
    </div>
}