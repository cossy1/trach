import { createActionType } from "../../../utils";

export const FETCH_TODOS = createActionType("FETCH_TODOS", "Todo");
export const FETCH_TODO = createActionType("FETCH_TODO", "Todo");
export const CREATE_TODO = createActionType("CREATE_TODO", "Todo");
export const UPDATE_TODO = createActionType("UPDATE_TODO", "Todo");
export const TODO_STATUS_UPDATE = createActionType(
    "TODO_STATUS_UPDATE",
    "Todo"
);
export const CREATE_TASK = createActionType("CREATE_TASK", "Todo");
export const EDIT_TASK = createActionType("EDIT_TASK", "Todo");
export const DELETE_TODO = createActionType("DELETE_TODO", "Todo");
export const DELETE_TASK = createActionType("DELETE_TASK", "Todo");

export const fetchTodos = () => ({
    type: FETCH_TODOS.START
});

export const fetchTodo = (id) => ({
    type: FETCH_TODO.START,
    meta: {id}
});

export const createTodo = (payload, onComplete) => ({
    type: CREATE_TODO.START,
    meta: {payload, onComplete}
});

export const updateTodo = (id, payload, onComplete) => ({
    type: UPDATE_TODO.START,
    meta: {id, payload, onComplete}
});

export const todoStatusUpdate = (payload, todoId, onSuccess) => ({
    type: TODO_STATUS_UPDATE.START,
    meta: {
        payload,
        todoId,
        onSuccess
    }
});

export const createTask = (payload, todoId, onComplete) => ({
    type: CREATE_TASK.START,
    meta: {
        payload,
        todoId,
        onComplete
    }
});

export const editTask = (payload, todoId, taskId, onComplete) => ({
    type: EDIT_TASK.START,
    meta: {
        payload,
        todoId,
        taskId,
        onComplete
    }
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO.START,
    meta: { id }
});

export const deleteTask = (todoId, taskId, onComplete) => ({
    type: DELETE_TASK.START,
    meta: { todoId, taskId, onComplete }
});