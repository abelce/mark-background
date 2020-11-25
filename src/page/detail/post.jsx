import React from 'react';
import Markdown from '@page/common/markdown';
import { isOwner } from '@utils';
import Operations from '@page/detail/operations';
import View from '@page/common/view';
import Comments from '@page/comments';
import dayjs from 'dayjs';
import 'braft-editor/dist/output.css';
import './style';

class Post extends React.Component {

    getTime = () => {
        // 相差一天的显示日期， 否则显示n小时前
        let now = dayjs();
        let createDay = dayjs(this.props.data.createdTime);
        let diffDay = now.diff(createDay, 'day');
        // 超过一天
        if (diffDay > 0) {
            return createDay.format('YYYY-MM-DD');
        }
        // 超过一小时
        let diffHour = now.diff(createDay, 'hour');
        if (diffHour > 0) {
            return `${diffHour}小时前`;
        }
        // 默认一分钟前
        let diffMin = now.diff(createDay, 'minutes') || 1;
        return `${diffMin}分钟前`;
    }


    getContent = () => {
        const { data } = this.props
        if (!data) {
            return null;
        }
        if (data.type === 'html') {
            return <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        }
        return <Markdown content={data.content || ""} />;
    }

    render() {
        const { data } = this.props
        if (!data) {
            return <div/>;
        }
        return (
            <div className="post_container">
                <div className="post">
                    <div className="post_content">
                        <div className="post_header">
                            <h1 className="name">{data.title}</h1>
                            <div className="base-info">
                                <span className="item">
                                    <i className="iconfont icon-time"></i>
                                    <span>{this.getTime()}</span>
                                    <View data={data.viewCount}/>
                                </span>
                                {isOwner(data.operatorID)
                                    ? <a target="_blank"
                                        href={`/blog/${data.id}/edit`}>编辑</a>
                                    : null}
                            </div>
                        </div>
                        <div className="detail_body">
                            <div className="content">
                                {this.getContent()}
                                {
                                    data.url
                                    ? <a target="_blank" href={data.url}>原文地址:{data.url}</a>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="operations">
                            <Operations likeCount={data.likeCount} sourceID={data.id} />
                        </div>
                    </div>
                    <Comments sourceID={data.id}/>
                </div>
            </div>
        );
    }
}

export default Post;
