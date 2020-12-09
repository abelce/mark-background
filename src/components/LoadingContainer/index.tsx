import { Spin } from 'antd';
import * as React from 'react';

interface ILoadingContainer {
    spinning: boolean,
    tip: string;
    // children?: React.Component | React.FC | JSX.Element;
}
export default class LoadingContainer extends React.Component<ILoadingContainer> {
    render() {
        if (this.props.spinning) {
            return <div>
                <Spin spinning={this.props.spinning} tip={this.props.tip}/>
            </div>
        }
        return this.props.children;
    }

}