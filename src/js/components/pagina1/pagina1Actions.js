export const loadTodoListSuccess = response => {
  let todoList = response.entities.todoItemList;
  return {
    type: 'LOAD_TODOLIST_SUCCESS',
    'todoList':todoList
  };
}

export const loadingTodoList = () => {
  return {
    type: 'LOADING_TODOLIST'
  };
}

export const loadTodoListFail = () => {
  return {
    type: 'LOADING_TODOLIST_FAIL'
  };
}
export const setVisibilityFilter = (payload) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    payload
  }
}
