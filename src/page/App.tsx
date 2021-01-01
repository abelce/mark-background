import * as React from "react";
import ReactDOM from "react-dom";
import "@common/assets/style/index.scss";
import "antd/dist/antd.css";
import Layout from "@/page/layout";
import '@common/assets/style/iconfont/iconfont.css';

function render() {
  ReactDOM.render(
    <div>
      <Layout />
    </div>,
    document.getElementById("app")
  );
}

render();
