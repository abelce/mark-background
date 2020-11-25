import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getTypesList, saveType } from '@domain/stypes/actions'
import Store from '@domain/stypes/store';


class Stype extends React.Component {

    state = {
        data: Store.getTypes(this.props.operatorID,this.props.type),
    }

    componentDidMount() {
        const { type, operatorID } = this.props;
        this.subscription = Store.addListener(this.onChange);
        getTypesList({
            filter: `type eq '${type}' and operatorID eq '${operatorID}'`,
            'page[offset]': 0,
            'page[limit]': 999
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
        this.subscription = null;
    }

    onChange = () => {
        const data = Store.getTypes(this.props.operatorID,this.props.type);
        this.setState({
            data,
        })
    }

    handleChange = (value = []) => {
        const {data} = this.state;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
        const newVal = value.find(val => !data.some(dt => dt.name === val));
        if (newVal) {
            this.createStype(newVal);
        }
    }

    createStype = (name) => {
        saveType({
            type: this.props.type,
            operatorID: this.props.operatorID,
            name
        })
    }

    render() {
        const { defaultValue = [], value = [] } = this.props;
        return <Select
            mode="tags"
            value={value}
            defaultValue={defaultValue}
            onChange={this.handleChange}
            style={{ width: '100%' }}
            placeholder="选择标签(回车自动添加标签)"
        >
            {
                this.state.data.map(tp => 
                    <Select.Option key={tp.id} value={tp.name}>
                        {tp.name}
                    </Select.Option>
                )
            }
        </Select>
    }
}


export default Stype;