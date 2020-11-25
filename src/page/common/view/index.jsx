import React from 'react';

export default function View({data}) {

    return <span 
            id={window.location.pathname} 
            className="leancloud_visitors" 
            data-flag-title="Your Article Title">
            <em className="post-meta-item-text">阅读量: </em>
            <i className="leancloud-visitors-count">{data}</i>
    </span>
}