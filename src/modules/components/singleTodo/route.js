import {lazy} from "react";

const SingleTodo = lazy(() => import('./index'));

const SingleTodoRoute = [
    {
        path: '/dashboard/todos/:todoId',
        name: 'single-todo',
        exact: true,
        isPrivate: true,
        component: SingleTodo,
    },
];

export default SingleTodoRoute;