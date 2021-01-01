import { EasySelect } from '@components/Easy-Select';
import { MarkList } from '@components/mark-list/list';
import SourceBar from '@components/source-bar';
import { ENUM_array_MarkType } from '@gen';
import { Presenter } from '@page/layout/presenter';
import { Observer, observer } from 'mobx-react';
import * as React from 'react';
import { Detail } from './detail';
import { MySearch } from './search';
import * as Style from './style.scss';

const TYPE_OPTIONS =  [
    {
        value: 'all',
        label: '全部分类',
    },
    ...ENUM_array_MarkType.map(type => ({label: type.description, value: type.value}))
];

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

    componentDidMount() {}

    handleTypeChange = (type: string, actionMeta: any) => {
        this.props.presenter.setType(type);
    };

    renderType = () => {
        return <SourceBar>
            <div className={Style.header}>
                <div className={Style.left}>
                    <EasySelect
                        value={this.props.presenter.filter.type}
                        onChange={this.handleTypeChange}
                        options={TYPE_OPTIONS}
                    />
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
                            <MarkList presenter={this.props.presenter} />
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
