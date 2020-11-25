import React from 'react';
import {BlogBase} from '@page/home'

class Blog extends BlogBase {
    getFilter = () => {
        return `type eq 'blog'`;
    }
}

export default (props) => <Blog {...props} key={props.location.pathname}/>;