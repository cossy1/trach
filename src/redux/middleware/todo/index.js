import {
    apiRequest,
    CREATE_TASK,
    CREATE_TODO,
    DELETE,
    DELETE_TASK,
    DELETE_TODO,
    EDIT_TASK,
    FETCH_TODO,
    FETCH_TODOS,
    GET,
    navigateTo,
    POST,
    PUT,
    TODO_STATUS_UPDATE,
    UPDATE_TODO,
} from "../../action";
import { isFunction } from 'lodash';
import {URLS} from "../../../_shared/_urls";

const fetchTodos = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_TODOS.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `${URLS.TODOS}`,
                key: "fetchTodos",
                onSuccess: FETCH_TODOS.SUCCESS,
                metadata: true,
                ...action
            })
        );
    }
};

const fetchTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_TODO.START) {
        const id = action.meta.id;
        dispatch(
            apiRequest({
                method: GET,
                url: `${URLS.TODOS}/${id}`,
                key: "fetchTodo",
                onSuccess: data => {
                    dispatch({ type: FETCH_TODO.SUCCESS, payload: data });
                    dispatch(navigateTo(`/dashboard/todos/${data._id}`));
                },
                ...action
            })
        );
    }
};

const createTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_TODO.START) {
        const { onComplete, ...rest} = action.meta;
        dispatch(
            apiRequest({
                method: POST,
                url: `${URLS.TODOS}`,
                key: "createTodo",
                successMessage: 'Todo created successfully',
                onSuccess: data => {
                    dispatch({ type: CREATE_TODO.SUCCESS, payload: data });
                    if(isFunction(onComplete)){
                        onComplete();
                    }
                },
                ...rest
            })
        );
    }
};

const updateTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_TODO.START) {
        const {id, onComplete, ...rest} = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${URLS.TODOS}/${id}`,
                key: "updateTodo",
                successMessage: 'successfully updated',
                onSuccess: data => {
                    dispatch({ type: UPDATE_TODO.SUCCESS, payload: data });
                    if(isFunction(onComplete)){
                        onComplete();
                    }
                },
                ...rest
            })
        );
    }
};

const todoStatusUpdate = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === TODO_STATUS_UPDATE.START) {
        const { todoId, payload, onSuccess, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${URLS.TODOS}/${todoId}/${payload}`,
                key: "todoStatusUpdate",
                successMessage: 'Status updated successfully',
                onSuccess: data => {
                    dispatch({type: TODO_STATUS_UPDATE.SUCCESS, payload: data});
                    if(isFunction(onSuccess)){
                        onSuccess();
                    }
                },
                ...rest
            })
        );
    }
};

const createTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_TASK.START) {
        const { todoId, onComplete, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: POST,
                url: `${URLS.TODOS}/${todoId}/tasks`,
                key: "createTask",
                successMessage: 'Task added successfully',
                onSuccess: data => {
                    dispatch({type: CREATE_TASK.SUCCESS, payload: data});
                    if(isFunction(onComplete)){
                        onComplete();
                    }
                },
                ...rest
            })
        );
    }
};

const editTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === EDIT_TASK.START) {
        const { todoId, taskId, onComplete, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `${URLS.TODOS}/${todoId}/tasks/${taskId}`,
                key: "editTask",
                successMessage: 'Updated Successfully',
                onSuccess: data => {
                    dispatch({type: EDIT_TASK.SUCCESS, payload: data});
                    if(isFunction(onComplete)){
                        onComplete();
                    }
                },
                ...rest
            })
        );
    }
};

const deleteTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_TODO.START) {
        const { id, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `${URLS.TODOS}/${id}`,
                key: "deleteTodo",
                nextRoute: "/dashboard/todos",
                successMessage: 'successfully deleted todo',
                onSuccess: DELETE_TODO.SUCCESS,
                ...rest
            })
        );
    }
};

const deleteTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_TASK.START) {
        const { todoId, taskId, onComplete, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `${URLS.TODOS}/${todoId}/tasks/${taskId}`,
                key: "deleteTask",
                successMessage: 'Task Deleted Successfully',
                onSuccess: () => {
                    dispatch({type: DELETE_TASK.SUCCESS});
                    if(isFunction(onComplete))
                        onComplete();
                },
                ...rest
            })
        );
    }
};

export default [
    updateTodo,
    fetchTodos,
    fetchTodo,
    createTodo,
    todoStatusUpdate,
    createTask,
    editTask,
    deleteTodo,
    deleteTask,
];