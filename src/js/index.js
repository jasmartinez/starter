import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {App} from "components";
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { createInjectStore } from 'redux-injector';
import thunk from 'redux-thunk';
import ActionsMiddleware from './middleware/actions.middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const routerMiddlewareInstance = routerMiddleware(history)
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createInjectStore(
  {
    router: routerReducer,
  },
composeWithDevTools(applyMiddleware(ActionsMiddleware,thunk,routerMiddlewareInstance))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
