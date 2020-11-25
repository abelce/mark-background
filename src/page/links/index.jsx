import React from 'react';
import {BlogBase} from '@page/home'

class Links extends BlogBase {
    getFilter = () => {
        return `type eq 'link'`;
    }
}

export default (props) => <Links {...props} key={props.location.pathname}/>;