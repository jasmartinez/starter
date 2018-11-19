import {HttpApiService} from "services";
import {namespaceActionFactory} from 'utils'
/*
 * action types
 */

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'


export function increment() {
  return { type: INCREMENT}
}

export function decrement() {
  return { type: DECREMENT}
}


export function loadCommentsSuccess(response) {
  let comments = response.entities.comments;
  return {type: 'LOAD_COMMENTS_SUCCESS',comments};
}

export function loadingComments() {
  return {type: 'LOADING_COMMENTS'};
}

export function removeComments() {
  return {type: 'REMOVE_COMMENTS'};
}

export function getComments(domain,dispatch){
  const loadCommentsSuccessInstance = namespaceActionFactory(domain)(loadCommentsSuccess);
 return (dispatch)=>(
           HttpApiService.commentsService()
            .then(response => {
              dispatch(loadCommentsSuccessInstance(response.entities.comments));
              })
            .catch(error => {
              dispatch(loadCommentsSuccessInstance(response.entities.comments));
          })
      );
  }
