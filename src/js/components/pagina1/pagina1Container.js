import React from 'react';
import { connect } from 'react-redux';
import Pagina1 from './pagina1.js';
import {TodoListService} from "services";
import {
         namespaceActionFactory,
         namespaceAsyncActionFactory
       } from 'utils'
import {
         increment,
         decrement
       } from '.././home/homeActions';
import {
        loadingTodoList,
        loadTodoListSuccess,
        loadTodoListFail,
        setVisibilityFilter
      } from './pagina1Actions'


let optionsGetTodoListObj = {
  service : TodoListService.getTodoListService,
  loadingAction : loadingTodoList,
  thenAction : loadTodoListSuccess,
  catchAction : loadTodoListFail
}

const mapStateToProps  = (state, ownProps) => {
  return {
    todoList : state.pagina1.todoList,
    filtro: state.pagina1.filtro,
    domain : "@@domain/pagina1/"
  }
}

const incrementActionCreatorInstance = namespaceActionFactory("@@domain/pagina1/")(increment);
const decrementActionCreatorInstance = namespaceActionFactory("@@domain/pagina1/")(decrement);
const setVisibilityFilterActionCreatorInstance = namespaceActionFactory("@@domain/pagina1/")(setVisibilityFilter);
const getTodoListActionCreatorInstance = namespaceAsyncActionFactory("@@domain/pagina1/")(optionsGetTodoListObj);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementOnClick: () => {
      dispatch(incrementActionCreatorInstance());
    },
    decrementOnClick: () => {
      dispatch(decrementActionCreatorInstance());
    },
    loadTodoListFn: () => {
      dispatch(getTodoListActionCreatorInstance());
    },
    setVisibilityFilterOnClick: (filter) => {
      dispatch(setVisibilityFilterActionCreatorInstance(filter));
    }
  }
}
const Pagina1Container = connect(mapStateToProps,mapDispatchToProps)(Pagina1);
export default Pagina1Container;
