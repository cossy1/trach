import React from "react";
import {Redirect, Route} from "react-router-dom";
import AuthService from '../../services/auth'

const CustomRoute = ({ component: Component, isPrivate, isAdmin, ...rest }) => {
    const isLoggedIn = AuthService.isLoggedIn();
    return (
        <Route
            {...rest}
            render={props => {
                if (isPrivate && !isLoggedIn) {
                    return (
                        <Redirect
                            to={{ pathname: "/login", state: { from: props.location } }}
                        />
                    );
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default CustomRoute;