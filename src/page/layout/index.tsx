import * as React from 'react';
import * as Style from './style.scss';
// import Home from '@/page/home';
import HomeList from '@/page/home/list';
import Sidebar from './sidebar';
import { Presenter } from './presenter';
import { Observer } from 'mobx-react';

const presenter = new Presenter('Mark');

export default function Layout() {

    return <Observer render={
        () => (
            <div className={Style.layout}>
                <div className={Style.layout_sidebar}>
                    <Sidebar presenter={presenter} />
                </div>
                <div className={Style.layout_content}>
                    {/* <Home/> */}
                    <HomeList presenter={presenter} />
                </div>
            </div>
        )
    }></Observer>
}