export const todoList =( state = {} ,action) => {
  switch (action.type) {
    case 'LOAD_TODOLIST_SUCCESS':
      return  Object.assign({}, state,action.todoList);
      break;
    case 'LOADING_TODOLIST_FAIL':
      return {}
      break;
    case 'LOADING_TODOLIST':
      return {}
      break;
    default:
      return state
      break;
  }
}

export const filtro =( state = "SHOW_ALL" ,action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
       return action.payload;
      break;
    default:
      return state;
  }
  return state
}
