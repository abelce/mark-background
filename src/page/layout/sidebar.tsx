import * as React from 'react';
import * as Style from './style.scss';
import cs from 'classnames';
import { Presenter } from './presenter';
import { observer } from 'mobx-react';
const {useState} = React;

const TYPES = [
    {
        title: '全部',
        value: 'all',
    },
    {
        title: '星标',
        value: 'star',
    },
    // {
    //     title: '未读',
    //     value: 'notRead',
    // },
]
interface ISidebar {
    presenter: Presenter;
}

function Sidebar(props: ISidebar) {
    return <div className={Style.sidebar}>
        {
            TYPES.map(item => <div 
                key={item.value} 
                className={cs(Style.sidebar_item, {[Style.sidebar_item_active]: props.presenter.filter.nav === item.value})}
                onClick={() => props.presenter.setNav(item.value)}>
                <span>{item.title}</span>
            </div>)
        }
    </div>
}

export default observer(Sidebar);