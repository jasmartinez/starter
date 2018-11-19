import React from 'react';
import { connect } from 'react-redux';
import { increment,
         decrement,
         getComments,
         removeComments,
         loadCommentsSuccess,
         loadingComments
       } from './homeActions';
import { HttpApiService } from "services";
import Home from './home.js';
import { namespaceActionFactory,
         namespaceAsyncActionFactory
       } from 'utils'

const mapStateToProps = (domain) => (state, ownProps) => {
  return {
    value: state.home.counter,
    comments: state.home.comments
  }
}

let optionsGetCommentsObj = {
  service : HttpApiService.commentsService,
  loadingAction : loadingComments,
  thenAction : loadCommentsSuccess,
  catchAction : loadingComments
}

const incrementActionCreatorInstance = (domain) => namespaceActionFactory(domain)(increment);
const decrementActionCreatorInstance = (domain) => namespaceActionFactory(domain)(decrement);
const getCommentsActionCreatorInstance = (domain) => namespaceAsyncActionFactory(domain)(optionsGetCommentsObj);
const removeCommentsActionCreatorInstance = (domain) => namespaceActionFactory(domain)(removeComments);


const mapDispatchToProps = (domain) => (dispatch, ownProps) => {
  return {
    incrementOnClick: () => {
      dispatch(incrementActionCreatorInstance(domain)());
    },
    decrementOnClick: () => {
      dispatch(decrementActionCreatorInstance(domain)());
    },
  /*  getCommentsOnClick : () =>{
      dispatch(getComments("@@domain/home/",namespaceActionFactory));
    },
  */
  getCommentsOnClick : () =>{
      dispatch(getCommentsActionCreatorInstance(domain)());
    },
    removeCommentsOnUnmount : () =>{
      dispatch(removeCommentsActionCreatorInstance(domain)());
    }

  }
}
/*
const HomeContainer = (domain) => connect(
  mapStateToProps(domain),
  mapDispatchToProps(domain)
)(Home);
*/
const HomeContainer = connect(
  mapStateToProps("@@domain/home/"),
  mapDispatchToProps("@@domain/home/")
)(Home);
export default HomeContainer
