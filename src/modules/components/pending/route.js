import {lazy} from "react";

const Pending = lazy(() => import('./index'));

const PendingRoute = [
    {
        path: '/dashboard/todos/pending',
        name: 'pending-todos',
        exact: true,
        isPrivate: true,
        component: Pending,
    },
];

export default PendingRoute;