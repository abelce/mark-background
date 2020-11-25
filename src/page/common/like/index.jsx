import React, { useState, useEffect } from 'react';
import Style from './style'

function Like () {
    const [ count, setCount] = useState(0);
    useEffect(() => {
        document.title = `count ${count}`;
    })
    
    return (
        <div className={Style.like}>
            <i className="iconfont icon-like" onClick={() => setCount(count + 1)}></i>
            <span className={Style.like_count}>{count}</span>
        </div>
    )
}

export default Like;