import { EasySelect } from '@components/Easy-Select';
import { MarkList } from '@components/mark-list/list';
import SourceBar from '@components/source-bar';
import { IMark } from '@gen';
import { Presenter } from '@page/layout/presenter';
import { getStorage, setStorage } from '@services/storage';
import { Observer, observer } from 'mobx-react';
import * as React from 'react';
import { Detail } from './detail';
import { MySearch } from './search';
import * as Style from './style.scss';

const TYPE_OPTIONS = [
    {
        label: '全部',
        value: 'all',
    },
    {
        label: '最近一周',
        value: 'week',
    },
    {
        label: '最近一月',
        value: 'month',
    },
]

interface IList {
    presenter: Presenter;
}
@observer
export default class List extends React.Component<IList> {
    state = {
        data: [],
        total: 0,
        type: 'all',
        selectedItems: [],
    }
    componentDidMount() {
        // setStorage('data', [
        //     {
        //         id: + new Date(),
        //         title: 'python - Cannot install tensorflow on fresh ubuntu partition: tensorflow-0.8.0-cp34-cp34m-linux_x86_64.whl is not a supported wheel on this platform - Stack Overflow',
        //         url: 'https://stackoverflow.com/questions/37425579/cannot-install-tensorflow-on-fresh-ubuntu-partition-tensorflow-0-8-0-cp34-cp34m',
        //         isStar: false,
        //         createTime: + new Date(),
        //     },
        //     {
        //         id: (+ new Date()) * Math.random(),
        //         title: '【干货】Chrome插件(扩展)开发全攻略 - 我是小茗同学 - 博客园',
        //         url: 'https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#%E5%BC%80%E5%8F%91%E4%B8%8E%E8%B0%83%E8%AF%95',
        //         isStar: false,
        //         createTime: + new Date(),
        //     },
        // ])
    }

    handleTypeChange = (type: string, actionMeta: any) => {
        this.setState(
            { type },
        );
    };

    renderType = () => {
        return <SourceBar>
            <div className={Style.header}>
                <div className={Style.left}>
                    {/* <EasySelect
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                        options={TYPE_OPTIONS}
                    /> */}
                    <div className={Style.search}>
                        <MySearch presenter={this.props.presenter}/>
                    </div>
                </div>
                <div className={Style.add}>
                    <span className="iconfont iconadd" onClick={this.props.presenter.newCurrentItem}></span>
                </div>
            </div>
        </SourceBar>
    }

    render() {
        return (
            <Observer render={
                () => (<div className={Style.list_container}>
                    {this.renderType()}
                    <div className={Style.main}>
                        <div className={Style.list}>
                            <MarkList list={this.props.presenter.getRenderData() || []} presenter={this.props.presenter} />
                        </div>
                        {
                        this.props.presenter.currentItem && <Detail presenter={this.props.presenter}/>   
                        }
                    </div>
                </div>)
            }></Observer>
        )
    }
}
