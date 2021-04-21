export const filterPendingTodos = (todos) => {
    return todos?.filter(todo => todo?.status === 'Pending')
};

export const filterInProgressTodos = (todos) => {
    return todos?.filter(todo => todo?.status === 'Progress')

};

export const filterCompletedTodos = (todos) => {
    return todos?.filter(todo => todo?.status === 'Completed')

};