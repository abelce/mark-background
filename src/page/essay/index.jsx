import React from 'react';
import {BlogBase} from '@page/home'

class Essay extends BlogBase {
    getFilter = () => {
        return `type eq 'essay'`;
    }
}

export default (props) => <Essay {...props} key={props.location.pathname}/>;