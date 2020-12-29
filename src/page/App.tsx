import * as React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from 'react-router-dom';
import "@common/assets/style/index.scss";
// import Routes from './route';
import "antd/dist/antd.css";
import Layout from "@/page/layout";
import '@common/assets/style/iconfont/iconfont.css';

function render() {
  ReactDOM.render(
    <div>
      {/* <BrowserRouter>
                <Routes/>
            </BrowserRouter> */}
      <Layout />
    </div>,
    document.getElementById("app")
  );
}

render();
