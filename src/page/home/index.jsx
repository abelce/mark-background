import * as React from 'react';

export default class Home extends React.Component {
    state = {
        data: [],
        total: 0,
    }

    pageSize = 100

    blogRef = React.createRef();

    constructor(props) {
        super(props);
    }

    componentDidMount () {

    }

    componentWillUnmount() {
    }

    render() {
        const { data, total } = this.state;
        return (
            <div>
                content
            </div>
        )
    }
}
