import React from 'react';
import Marked from 'marked';
import './style';

export default function Index({content}) {
    return <div
        className="marked"
        dangerouslySetInnerHTML={{__html: Marked.parse(content)}}/>
}