/*
 * File: index.tsx
 * Project: ant-design-pro
 * File Created: Monday, 23rd November 2020 1:05:00 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Monday, 23rd November 2020 1:05:00 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
import { ENUM_LOADING_FAILED, ENUM_LOADING_SENDING, ENUM_LOADING_SUCCESS, ENUM_MODE_CREATE, ENUM_MODE_UPDATE } from '@/domain/enums';
import { createEntity, updateEntity } from '@/services';
import { parseQuery } from '@/utils';
import { Button, message, Spin } from 'antd';
import { autobind } from 'core-decorators';
import { observable, computed, action } from 'mobx';
import * as React from 'react';
import { observer, Observer } from 'mobx-react';
import * as Style from './style.scss';

interface IBaseFormProps {
}
interface IBaseFormState {
    mode: string;
}

export interface IChildrenProps {
    entityName: string;
    mode: string;
    data: any;
    loading: string;
    onChange: (data: any) => void;
}

const BaseForm = (entityName: string) => {
    return (ChildrenComponent: React.ComponentClass | React.FC) => {
        return observer(class extends React.Component<IBaseFormProps, IBaseFormState>  {

            _ref = React.createRef();

            state = {
                data: {
                    label: '',
                    name: '',
                    fields: [],
                }
            }
            // @observable
            // protected mode: string;

            // @observable
            // protected entityName: string;

            // @observable
            // protected data: any;

            // @observable
            // protected loading: boolean;

            // @computed
            get childrenProps() {
                const res = {
                    ...this.props,
                    entityName: this.entityName,
                    data: this.state.data || [],
                    loading: this.state.loading,
                    mode: this.mode,
                    onChange: this.handleChange,
                }
                return res;
            }

            constructor(props: IBaseFormProps) {
                super(props);
                this.parseSearch();
                this.init(props);
            }

            parseSearch = () => {
                const obj = parseQuery();
                this.mode = (obj['mode'] as string) || ENUM_MODE_CREATE;
            }

            init = (props: IBaseFormProps) => {
                this.entityName = entityName;
            }

            componentDidMount() {
                console.log('componentDidMount...');
            }

            @action
            handleChange = (data: any) => {
                // this.data = [...data];
                this.setState({
                    data,
                })
            }

            handleCancel = () => {
                // history.push(`/${this.entityName}/list`);
            }

            handleSave = () => {
                try {
                    let beforeSave = this._ref.current.beforeSave;
                    if (typeof beforeSave !== 'function') {
                        beforeSave = () => Promise.resolve();
                    }
                    beforeSave().then(() => {
                        this.saveData()
                    })
                } catch (e) {
                    console.error(e);
                }
            }

            saveData = () => {
                switch (this.mode) {
                    case ENUM_MODE_CREATE:
                        this.createData();
                        break;
                    case ENUM_MODE_UPDATE:
                        this.updateData();
                        break;
                }
            }

            createData = () => {
                try {
                    // this.loading = ENUM_LOADING_SENDING;
                    this.setState({
                        loading: ENUM_LOADING_SENDING,
                    })
                    createEntity(this.entityName, this.data);
                    // this.loading = ENUM_LOADING_SUCCESS;
                    this.setState({
                        loading: ENUM_LOADING_SUCCESS,
                    })
                    message.success('保存成功');
                } catch (e) {
                    // this.loading = ENUM_LOADING_FAILED;
                    this.setState({
                        loading: ENUM_LOADING_FAILED,
                    })
                    message.error('保存失败');
                }
            }

            updateData = () => {
                try {
                    // this.loading = ENUM_LOADING_SENDING;
                    this.setState({
                        loading: ENUM_LOADING_SENDING,
                    })
                    updateEntity(this.entityName, this.data);
                    // this.loading = ENUM_LOADING_SUCCESS;
                    this.setState({
                        loading: ENUM_LOADING_SUCCESS,
                    })
                    message.success('保存成功');
                } catch (e) {
                    // this.loading = ENUM_LOADING_FAILED;
                    this.setState({
                        loading: ENUM_LOADING_FAILED,
                    })
                    message.error('保存失败');
                }
            }

            render() {
                return <Observer
                    render={
                        () => (
                            <Spin spinning={this.state.loading === ENUM_LOADING_SENDING} tip="Loading...">
                                <div className={Style.baseForm}>
                                    <div>
                                        <ChildrenComponent {...this.childrenProps} ref={this._ref} />
                                    </div>
                                    <div className={Style.footerContainer}>
                                        <Footer onSave={this.saveData} onCancel={this.handleCancel} />
                                    </div>
                                </div>
                            </Spin>
                        )
                    }>
                </Observer>
            }
        })
    }
}

interface IFooter {
    onSave: () => void;
    onCancel: () => void;
}
function Footer(props: IFooter) {
    return <div className={Style.footer}>
        <Button onClick={props.onCancel}>取消</Button>
        <Button type="primary" onClick={props.onSave}>提交</Button>
    </div>
}

export default BaseForm;