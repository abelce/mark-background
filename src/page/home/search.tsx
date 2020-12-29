import { Presenter } from '@page/layout/presenter';
import { Input } from 'antd';
import * as React from 'react';

interface IMySearch {
    presenter: Presenter;
}
export function MySearch(props: IMySearch) {
    return <div>
        <Input.Search 
        placeholder="搜索"
        onSearch={props.presenter.onSearch}
        onPressEnter={(e) => props.presenter.onSearch(e.target.value)}/>
    </div>
}