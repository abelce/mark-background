import React, { useEffect, useState } from 'react';
import { Icon, Spin, Avatar } from 'antd';
import './style.scss';
import CommentInput from './commentInput';


function Header({ data }) {
    return <div className="header">
        <Avatar className="avatar" shape="circle" src={data.fromAvatar} alt={data.fromName} />
        <h2>{data.fromName}</h2>
    </div>
}

function Comment({ data, onLoadMore, parentID = '' }) {
    const [open, setOpen] = useState(false);

    function toComment() {
        setOpen(!open);
    }

    return <div className="comment_item">
        <Header data={data} />
        <div className="content">
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            <div className="baseInfo">
                <a onClick={toComment}>
                    <Icon type="message" />
                    <span className="text">评论</span>
                </a>
                <div>
                    {open && <div className="childCommentInput">
                        <CommentInput
                            parentID={parentID}
                            sourceID={data.sourceID} 
                            to={{
                            id: data.fromID,
                            avatar: data.fromAvatar,
                            name: data.fromName,
                        }} />
                    </div>
                    }
                </div>
            </div>
            <SubCommentList data={data.children} parentID={parentID} onLoadMore={onLoadMore}/>
        </div>
       
    </div>
}

function SubComment ({data}) {
    const [open, setOpen] = useState(false);

    function toComment() {
        setOpen(!open);
    }
   
    return <div className="sub_comment">
    <Header data={data} />
    <div className="content">
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        <div className="baseInfo">
            <a onClick={toComment}>
                <Icon type="message" />
                <span className="text">评论</span>
            </a>
            <div>
                {open && <div className="childCommentInput">
                    <CommentInput
                        parentID={parentID}
                        sourceID={data.sourceID} 
                        to={{
                        id: data.fromID,
                        avatar: data.fromAvatar,
                        name: data.fromName,
                    }} />
                </div>
                }
            </div>
        </div>
    </div>
   
</div>

   
}

function SubCommentList({data, onLoadMore, parentID}) {
    const [loading, setLoading] = useState(false);

    if (!data || data.total === 0) {
        return null;
    }

    function handleLoadAll() {
        const params = {
            filter: `parentID eq '${parentID}' and sourceID eq '${data.data[0].sourceID}'`,
            'page[offset]': data.data.length,
            'page[limit]': 9999
        }
        onLoadMore(params);
    }

    return <div>
    {
        data.total > 0
           ? <div className="sub_comment_list">
               {data.data.map(ct => <SubComment 
                key={ct.id} 
                data={ct} 
                onLoadMore={onLoadMore}
                parentID={parentID}/>)}
               {data.total > data.data.length
                   && <div>
                       {loading
                           ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                           : <a href="javascript:;" onClick={handleLoadAll}>加载所有评论</a>
                       }
                   </div>
               }
           </div>
           : null
   }
</div>
}

export default Comment;