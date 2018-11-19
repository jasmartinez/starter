import {Actions$ } from 'services';

const ActionsMiddleware = (store) => (next) => (action) => {
  // Our middleware
   next(action);
   if(!(action instanceof Function)){
    Actions$.next(action);
   }

}
export default ActionsMiddleware;