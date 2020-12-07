import { IEntity } from '@domain/interface';
import { getEntityList } from '@services';
import { Select, Spin } from 'antd';
import { debug } from 'leancloud-storage';
import * as React from 'react';
const _ = {
    debounce: require('lodash/debounce'),
    get: require('lodash/get'),
}

const { Option } = Select;


interface IEasyRemoteSelect {
    entityName: string;
    value: string;
    disabled?: boolean;
    onChange?: (data: IEntity) => void;
}

type IOption = {
    value: string;
    text: string;
}

type SEasyRemoteSelect = {
    data: Array<IOption>;
    fetching: boolean;
}

export default class EasyRemoteSelect extends React.Component<IEasyRemoteSelect, SEasyRemoteSelect> {
    lastFetchId: number
    constructor(props: IEasyRemoteSelect) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = _.debounce(this.fetchUser, 800);
    }

    componentDidMount() {
        this.fetchUser();
    }

    state: SEasyRemoteSelect = {
        data: [],
        fetching: false,
    };

    fetchUser = (value?: string) => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });

        let filter = '';
        if (value) {
            filter = `name like %${value}% or label like %${value}%`;
        }

        getEntityList(this.props.entityName, {
            'page[limit]': 9999,
            filter,
        })
        .then(body => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                const data = body.data.map((item: any) => ({
                    text: `${item.name} ${item.label}`,
                    value: item.id,
                    data: item,
                }));
                this.setState({ data });
            }).finally(() => {
                this.setState({fetching: false})
            });
    };

    handleChange = (value: IOption) => {
        const temp = this.state.data.find(item => item.value === value);
        this.props.onChange && this.props.onChange(temp.data);
    };

    getValue = () => {
        if(typeof this.props.value === 'object') {
            return _.get(this.props.value, 'id');
        }
        return this.props.value;
    }

    render() {
        const { fetching, data } = this.state;
        if (data.length === 0) {
            return  <Spin size="small" />;
        }
        return (
            <Select
                // mode="multiple"
                size="small"
                value={this.getValue()}
                placeholder="请选择"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onSelect={this.handleChange}
                style={{ width: '100%' }}
                // loading={fetching}
                disabled={this.props.disabled}
            >
                {data.map(d => (
                    <Option key={d.value} value={d.value}>{d.text}</Option>
                ))}
            </Select>
        );
    }
}