 export const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return  new Number(state + 1).valueOf()
      break;
    case 'DECREMENT':
      return new Number(state - 1).valueOf()
      break;
    default:
      return state
      break;
  }
}

export const comments = (state = {},action) =>{
  switch (action.type) {
    case 'LOAD_COMMENTS_SUCCESS':
      return Object.assign({}, state,action.comments);
      break;
    case 'REMOVE_COMMENTS':
      return {}
      break;
    default:
      return state;
      break;
  }
}
