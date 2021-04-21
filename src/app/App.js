import React, {Suspense, lazy} from "react";
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {Redirect, Route, Switch} from 'react-router';
import CustomRoute  from '../_shared/customRoute';
import '../App.css';

const Login = lazy(() => import('./auth/login/index'));
const SignUp = lazy(() => import('./auth/register'));
const Dashboard = lazy(() => import('../modules/components/index'));

const Load = () => (
    <Segment>
        <Dimmer active>
            <Loader />
        </Dimmer>
    </Segment>
);

const App = () => {
    return(
        <div>
            <Suspense fallback={<Load />}>
                <Switch>
                    <Route
                        path={'/login'}
                        component={Login}
                        exact={true}
                        name={'login'}
                    />,
                    <Route
                        path={'/signUp'}
                        component={SignUp}
                        exact={true}
                        name={'signUp'}
                    />,
                    <CustomRoute path="/:app" name="layout" isPrivate component={Dashboard} />
                    <Redirect
                        from={'/'}
                        to={{
                            pathname: '/login',
                        }}
                    />

                    <Route path="*" component={"404 Not Found"} />

                </Switch>
            </Suspense>
        </div>
    );
};

export default App;
