import '@common/errors/index'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@common/assets/style/index.scss';
import Routes from './route';
import 'antd/dist/antd.css'

window.AV = require('leancloud-storage');

function render() {
    ReactDOM.render(
        <div>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </div>
        ,
        document.getElementById('app'));
}

render();