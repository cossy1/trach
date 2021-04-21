import {lazy} from "react";

const InProgress = lazy(() => import('./index'));

const InProgressRoute = [
    {
        path: '/dashboard/todos/in-progress',
        name: 'in-progress-todos',
        exact: true,
        isPrivate: true,
        component: InProgress,
    },
];

export default InProgressRoute;