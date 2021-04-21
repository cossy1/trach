import React from "react";
import { isEmpty } from "lodash";
import { createAPIRequest } from "../../services/axios";
import { message } from 'antd';
import {
    API_REQUEST,
    startUILoading,
    stopUILoading,
    updateUIError,
    updateSessionToken,
    navigateTo
} from "../action";

export const alertSuccess = (successMessage, key) => {
    message.success({ content: successMessage, key,  duration: 4});
};


export const alertError = (errorMessage, key) => {
    message.error({ content: errorMessage, key, duration: 4 });
};


function formatMessagesFromError(error) {
    return (
        <span>
     <i className="ri-error-warning-line"/> {error || (error && error.message)}
    </span>
    );
}

const apiRequest = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST.START) {
        const {
            method,
            url,
            key,
            payload,
            onError,
            successMessage,
            params,
            nextRoute,
            onSuccess,
            errorMessage,
            noErrorToast
        } = action.meta;
        const config = { method, url };

        if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
            config.data = payload;
        }
        if (params && !isEmpty(params)) {
            config.params = params;
        }
        dispatch(updateUIError(key, null));
        dispatch(startUILoading(key));
        createAPIRequest(config)
            .then(response => {
                console.log("RESPONSE:::::: ", response);
                const { data, meta } = response;

                if (meta && meta.token) {
                    dispatch(updateSessionToken(meta.token));
                }
                if (onSuccess) {
                    if (typeof onSuccess === "function") {
                        onSuccess(data);
                    } else {
                        dispatch({ type: onSuccess, payload: data });
                    }
                }
                if (nextRoute) {
                    dispatch(navigateTo(nextRoute));
                }
                dispatch(stopUILoading(key));
                const toastMessage = successMessage || (meta && meta.message);
                if (toastMessage) {
                    alertSuccess(toastMessage, key || '');
                }
            })
            .catch(e => {
                const err = e && e.data && e.data.message;
                console.log("ERR:::::: ", e);
                const showErrorMessage = message => {
                    if (!noErrorToast && method.toLowerCase() !== "get" && message) {
                        alertError('error', key);
                    }
                };
                if (onError) {
                    if (typeof onError === "function") {
                        onError(err);
                    } else {
                        const message = formatMessagesFromError(err);
                        dispatch(updateUIError(key, message));
                        showErrorMessage(message);
                    }
                } else {
                    const error = (err && err.statusText) || err;
                    const message = errorMessage || formatMessagesFromError(error);
                    dispatch(updateUIError(key, message));
                    showErrorMessage(message);
                }
                dispatch(stopUILoading(key));
            });
    }
    return next(action);
};

export default [apiRequest];