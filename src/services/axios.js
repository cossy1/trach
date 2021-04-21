import axios from 'axios';
import authService from './auth';
// Default config options
const defaultOptions = {
    baseURL: 'https://todo-nest-api.herokuapp.com',
    headers: {
        'x-api-key': 'todo-nest-api',
    },
};

// Update instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
    config => {
        config.headers['authorization'] = `Bearer ${authService.getUserSession()}`;
        return config;
    },
    error => {
        // Perform an action with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor
instance.interceptors.response.use(
    response => {
        // Do something with response data
        return response.data;
    },
    error => {
        // Do something with response error
        return Promise.reject(error.response);
    }
);
export default instance;

export const createAPIRequest = (config) => instance(config);