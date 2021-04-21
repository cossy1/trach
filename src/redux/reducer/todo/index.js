import {
    FETCH_TODOS,
    FETCH_TODO,
    CREATE_TODO,
    TODO_STATUS_UPDATE,
    DELETE_TODO,
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK, UPDATE_TODO
} from "../../action/todo";

const initialState = {
    current: [],
    byList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TODO.SUCCESS:{
            const current = state.current
                ? { ...state.current, ...action.payload }
                : action.payload;
            const update = [current];

            if (state.byId[current._id]) {
                update.byId = { ...state.byId, [current._id]: current };
                update.byList = Object.values(update.byId);
            }
            return Object.assign({}, state, update);
        }

        case FETCH_TODOS.SUCCESS:{
            return {
                ...state,
                byList: action.payload
            }
        }
        case TODO_STATUS_UPDATE.SUCCESS:
            return {
                ...state,
            };
        case DELETE_TASK.SUCCESS:
        case EDIT_TASK.SUCCESS:
        case CREATE_TASK.SUCCESS:{
            return {
                ...state,
                current: action.payload,
                byList: [action.payload, ...state.byList]
            }
        }
        case FETCH_TODO.SUCCESS:
            return {
                ...state,
                current: action.payload
            };
        case CREATE_TODO.SUCCESS:
            return {
                ...state,
                current: action.payload,
                byList: [action.payload, ...state.byList]
            };
        case DELETE_TODO.SUCCESS:
            return {
                ...state,
                current: null,
                byList: state.byList.filter(todo => todo._id !== action.payload)
            };
        default:
            return state;
    }
};