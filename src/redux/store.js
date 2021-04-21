import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import throttle from "lodash.throttle";
import customMiddleWares from './middleware';
import appReducers from "./reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'

export const history = createBrowserHistory();

const rootReducer = (state, action) => {
    if (action.type === "RESET_APP_STATE") {
        state = undefined;
    }
    return appReducers(history)(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
};

// add and aply the middleWares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

const persistedReducer = persistReducer(persistConfig, rootReducer);

//include redux logger if not in production
if (process.env.NODE_ENV !== "production") {
    middleWares.push(createLogger());
}

let parseMiddleware = applyMiddleware(...middleWares);

//include dev tools if not in production
if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    parseMiddleware = compose(
        parseMiddleware,
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("todo-nest-api");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};


//persist data to loadState
const persistedState = loadState();

// create the store
const store = createStore(persistedReducer, persistedState, parseMiddleware);

export const  persistor = persistStore(store);

//subscribe to store
store.subscribe(
    throttle(() => {
        saveState({ auth: store.getState().auth });
    }, 1000)
);

export default store;

const saveState = (state) => {
    try {
        localStorage.setItem("todo-nest-api", JSON.stringify(state));
    } catch (e) {
        console.log(e)
    }
};