import React from 'react';

function Item({title, value}) {
    return <div className="statistic_item">
        <div>
            {title}
        </div>
        <div>
            {value}
        </div>
    </div>
}

export default class Statistic extends React.PureComponent {

    render () {
        return <div className="statistic">
            <Item title="文章" value={10}/>
            <Item title="喜欢" value={10}/>
            <Item title="收藏" value={10}/>
            <Item title="粉丝" value={10}/>
        </div>
    }
}