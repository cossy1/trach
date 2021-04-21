import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";
import ui from "./ui";
import auth from "./auth";
import todo from "./todo";

const appReducers = history =>
    combineReducers({
        form: formReducer,
        toastr: toastrReducer,
        router: connectRouter(history),
        ui,
        auth,
        todo
    });

export default appReducers;