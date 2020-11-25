import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import './style.scss';

function Result({data, history, onBack}) {
    return <div className="blog_result">
        <div className="blog_result_body">
            <div className="blog_result_header">
                <a className="blog_result_header_link"
                    to="/users/blogs"
                    onClick={onBack}>
                    {/* <ArrowBackIosIcon/> */}
                    <Icon type="left" />
                    管理文章
                </a>
            </div>
            <div className="blog_result_content">
                <h2>{data.title}</h2>
                {data.description ? <p>{data.description}</p> : null}
            </div>
            <div className="blog_result_footer">
                <p className="blog_result_success">发布成功</p>
                <a 
                    className="blog_result_create"
                    href={`/blog/create?${+new Date()}`}>继续创作</a>
            </div>
        </div>
    </div>
}

export default Result;