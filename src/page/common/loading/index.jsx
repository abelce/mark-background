import React from 'react';
import {Spin} from 'antd'
import './style';

function Loading({show = false}) {
    if (typeof show !== 'boolean' || show !== true) {
        return null;
    }
    return (
        <div className="loading">
            <Spin spinning={true}></Spin>
        </div>
    )
}

export default Loading;