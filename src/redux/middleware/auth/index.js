import {
    apiRequest,
    navigateTo,
    POST,
    LOGOUT,
    LOGIN,
    REGISTER,
} from "../../action";
import {URLS} from "../../../_shared/_urls";

const login = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === LOGIN.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${URLS.LOGIN}`,
                key: "login",
                successMessage: 'Login Success',
                onSuccess: data => {
                    dispatch({ type: LOGIN.SUCCESS, payload: data });
                    dispatch(navigateTo("dashboard/todos"));
                },
                ...action.meta
            })
        );
    }
};

const register = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === REGISTER.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: `${URLS.SIGNUP}`,
                key: "register",
                onSuccess: data => {
                    dispatch({ type: REGISTER.SUCCESS, payload: data });
                    dispatch(navigateTo("/"));
                },
                ...action.meta
            })
        );
    }
};

const logOut = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === LOGOUT.START) {
        apiRequest({
            successMessage: 'Bye for now!!'
        });
        dispatch(navigateTo("/"));
    }
};

export default [
    login,
    register,
    logOut,
];