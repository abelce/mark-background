import React from 'react';
import Comment from './comment';

function List ({comments = [], onLoadChildren, onLoadMore, total}) {
    if (comments.length === 0) {
        return <div className="no_comment">--没有任何评论--</div>
    }

    return <div>
        {
            comments.map(ct => <Comment key={ct.id} data={ct} onLoadMore={onLoadChildren} parentID={ct.id}/>)
        }
        <div>
            {
                total > comments.length 
                ? <div className="loadMore">
                    <a href="javascript:;" onClick={() => onLoadMore()}>加载更多</a>
                </div>
                : <div></div>
            }
        </div>
    </div>
}

export default List;