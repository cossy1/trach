import CompletedRoute  from "../completed/route";
import PendingRoute from "../pending/route";
import InProgressRoute from "../inProgress/route";
import SingleTodoRoute from "../singleTodo/route";
import AllTodoRoute from "../all-todos/route";

export const RoutesNavs = [
    ...CompletedRoute,
    ...PendingRoute,
    ...InProgressRoute,
    ...SingleTodoRoute,
    ...AllTodoRoute
];