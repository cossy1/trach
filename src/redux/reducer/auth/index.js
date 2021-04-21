import {
    LOGIN,
    LOGOUT,
    UPDATE_SESSION_TOKEN,
    REGISTER
} from "../../action/auth";

const initialState = {
    user: {
        data: undefined,
        session: undefined
    },
    current: null,
    byId: {},
    byList: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER.SUCCESS: {
            return {
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        }
        case LOGIN.SUCCESS: {
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    data: action.payload,
                }
            });
        }

        case UPDATE_SESSION_TOKEN:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    session: action.payload
                }
            });
        case LOGOUT.START:
            return initialState;
        default:
            return state;
    }
};