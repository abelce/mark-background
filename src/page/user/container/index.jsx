import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import './style.scss';

function Container({header, children}) {

    return <div className="user_coninter">
        <div>
            {header}
        </div>
        <Divider />
        <div>
            {children}
        </div>
    </div>
}

export default Container;