import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './style';
import Loading from './common/loading';
import Header from './layout/header';
import Footer from './layout/footer';
import {getAuthInfo} from '@utils';
import {getUser} from '@domain/user/action.js'
const Login = React.lazy(() => import('./login'));
const Home = React.lazy(() => import('./home'));
const Entity = React.lazy(() => import('./Entity'));
const TemplateEditor = React.lazy(() => import('./Template/Editor'));

class Routes extends React.Component {

    componentDidMount() {
        const user = getAuthInfo();
        if (user) {
            getUser(user.id);
        }
    }

    render() {
        return <React.Suspense fallback={<Loading />}>
            <Switch>
                <Route exact={true} path="/login" component={Login}/>
                {/* <Route exact={true} path="/registry" component={Registry}/> */}
                <Route>
                    <div id="layout" className="layout">
                        <div className="layout_header">
                            <Header />
                        </div>
                        <div className="layout_content">
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact={true} path="/entity/form" component={Entity}/>
                                    <Route exact={true} path="/template/editor" component={TemplateEditor}/>
                                    <Route exact={true} path="/" component={TemplateEditor} />

                                </Switch>
                            </React.Suspense>
                        </div>
                        <div className="layout_footer">
                            <Footer/>
                        </div>
                    </div>
                </Route>
            </Switch>
        </React.Suspense>
    }
}

export default process.env.NODE_ENV === 'development' 
                ? hot(module)(Routes)
                : Routes;