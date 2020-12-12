import { Tabs } from 'antd';
import React from 'react';
import { CodeEditor } from './CodeEditor';
import { getFormString } from '../Main/formString';
import { cssString } from '../Main/cssString';

const { TabPane } = Tabs;

export const CodeTabs = (props: any) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="javascript" key="1">
            <CodeEditor value={getFormString(props.presenter)}/>
        </TabPane>
        <TabPane tab="scss" key="2">
            <CodeEditor  language={"scss"} value={cssString}/>
        </TabPane>
    </Tabs>
);
