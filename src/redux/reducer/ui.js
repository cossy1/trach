import {
    UI_LOADING,
    UI_ERROR
} from "../action";

const initialState = {
    errors: {},
    loading: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UI_LOADING.START:
            return getNewLoadingState(state, action, true);
        case UI_LOADING.END:
            return getNewLoadingState(state, action, false);
        case UI_ERROR:
            return Object.assign({}, state, {
                errors: { ...state.errors, [action.key]: action.value }
            });
        default:
            return state;
    }
};

const getNewLoadingState = (currentState = {}, action, value) => {
    const { key } = action;
    return Object.assign({}, currentState, {
        loading: { ...currentState.loading, [key]: value }
    });
};