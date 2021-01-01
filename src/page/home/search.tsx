import { Presenter } from '@page/layout/presenter';
import { Input } from 'antd';
import * as React from 'react';
const _ = {
    debounce: require('lodash/debounce'),
};

interface IMySearch {
    presenter: Presenter;
}
export function MySearch(props: IMySearch) {

    const handleOnChange = React.useCallback(_.debounce((value: string) => {
        debugger
        props.presenter.onSearch(value);
    }, 600), []);

    return <div>
        <Input 
        placeholder="搜索"
        onChange={(e) => handleOnChange(e.target.value)}
        />
    </div>
}