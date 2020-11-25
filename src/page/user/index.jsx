import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import Menus from './menus';
import './style.scss';
import UserStore from '@domain/user/store';
import { USER_GET } from '@common/constants/user';
import Loading from '@page/common/loading';
const ChangePassword = React.lazy(() => import('./changePassword'));
const Info = React.lazy(() => import('./info'));
const ChangeAvatar = React.lazy(() => import('./changeAvatar'));

const COMPONENTS = {
    'info': Info,
    'changepassword': ChangePassword,
    'changeAvatar': ChangeAvatar,
}

function User({match}){
    const [state,setState] = useState(0);

    const onChange = () => {
        console.log('onChange', UserStore.user);
        setState(state + 1);
    }

    useEffect(() => {
        const subscription = UserStore.addListener(onChange);
        return () => {
            subscription.remove();
        }
    })

    return <div className="users">
        <div className="sidebar">
            <Menus/>
        </div>
        {
            UserStore.user
            ? <React.Suspense fallback={<Loading />}>
                <Route path={match.url} component={COMPONENTS[match.params.sublink]}/>
            </React.Suspense>
            : null
        }
    </div>
}


export default User;