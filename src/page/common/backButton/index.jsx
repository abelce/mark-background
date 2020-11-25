import React from 'react';
import {withRouter} from 'react-router-dom';
import { Icon } from 'antd';
import './style.scss';


function BackButton({history}) {
    function handleBack() {
        history.goBack();
    }
    return <div className="backButton" onClick={handleBack}>
        <Icon type="left" />
        <span>返回</span>
    </div>
}

export default withRouter(BackButton);