import { push } from "connected-react-router";
import { UI_NAVIGATE } from "../action";

export const navigateTo = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UI_NAVIGATE) {
        dispatch(push(action.payload));
    }
};

export default [navigateTo];