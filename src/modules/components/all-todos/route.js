import {lazy} from "react";

const AllTodo = lazy(() => import('./index'));

const AllTodoRoute = [
    {
        path: '/dashboard/todos',
        name: 'all-todo',
        exact: true,
        isPrivate: true,
        component: AllTodo,
    },
];

export default AllTodoRoute;