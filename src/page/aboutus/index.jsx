import React from 'react';
import './style.scss';

function Index() {

    return <div className="aboutus">
        <h2 className="desc">
            本站用于记录工作、学习和生活过程的的所得，欢迎交流学习
        </h2>
        <fieldset>
            <legend>使用的技术:</legend>
            <dl>
                <dt>前端:</dt>
                <dd>React</dd>
                <dd>Webpack</dd>
                <dd>Scss</dd>
                
                <dt>后端:</dt>
                <dd>Golang</dd>
                <dd>PostgreSQL</dd>
                <dd>Docker</dd>
            </dl>
        </fieldset>
        <fieldset>
            <legend>个人信息:</legend>
            <dl>
                <dt>微信</dt>
                <dd>tzx1061225829</dd>
                <dt>邮箱</dt>
                <dd>1061225829@qq.com</dd>
            </dl>
        </fieldset>
    </div>
}

export default Index;