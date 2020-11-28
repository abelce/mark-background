import Loading from '@page/common/loading';
import { Spin } from 'antd';
import * as React from 'react';

interface ILoadingContainer {
    loading: boolean,
    tip: string;
    children?: React.Component | React.FC | null;
}
export default function LoadingContainer(props: ILoadingContainer) {
    if (props.loading) {
        return <div>
            <Spin spinning={props.loading} tip={props.tip}/>
        </div>
    }
    return props.children;
}