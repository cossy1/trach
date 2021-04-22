import React, {Suspense, lazy, useState, useLayoutEffect} from "react";
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {Redirect, Route, Switch} from 'react-router';
import CustomRoute  from '../_shared/customRoute';
import '../App.css';
import DesktopBreakpoint from "../modules/responsive_utils/desktop_breakpoint";
import PhoneBreakpoint from "../modules/responsive_utils/mobile_breakpoint";
import TabletBreakpoint from "../modules/responsive_utils/tablet_breakpoint";

const Login = lazy(() => import('./auth/login/index'));
const SignUp = lazy(() => import('./auth/register'));
const Layout = lazy(() => import('../modules/components/index'));

const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateScreenSize() {
            setScreenSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
};


const Load = () => (
    <Segment>
        <Dimmer active>
            <Loader />
        </Dimmer>
    </Segment>
);

const App = () => {
    const [width] = useMediaQuery();
    return width < 767 ? (
        <PhoneBreakpoint>
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
                    <CustomRoute path="/:app" name="layout" isPrivate component={Layout} />
                    <Redirect
                        from={'/'}
                        to={{
                            pathname: '/login',
                        }}
                    />

                    <Route path="*" component={"404 Not Found"} />

                </Switch>
            </Suspense>
        </PhoneBreakpoint>
    ) : (width > 767 && width < 1024) ? (
        <TabletBreakpoint>
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
                    <CustomRoute path="/:app" name="layout" isPrivate component={Layout} />
                    <Redirect
                        from={'/'}
                        to={{
                            pathname: '/login',
                        }}
                    />

                    <Route path="*" component={"404 Not Found"} />

                </Switch>
            </Suspense>
        </TabletBreakpoint>
    ) : (
        <DesktopBreakpoint>
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
                    <CustomRoute path="/:app" name="layout" isPrivate component={Layout} />
                    <Redirect
                        from={'/'}
                        to={{
                            pathname: '/login',
                        }}
                    />

                    <Route path="*" component={"404 Not Found"} />

                </Switch>
            </Suspense>
        </DesktopBreakpoint>
    )
};

export default App;
