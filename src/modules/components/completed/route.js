import {lazy} from "react";

const Completed = lazy(() => import('./index'));

const CompletedRoute = [
    {
        path: '/dashboard/todos/completed',
        name: 'completed-todos',
        exact: true,
        isPrivate: true,
        component: Completed,
    },
];

export default CompletedRoute;