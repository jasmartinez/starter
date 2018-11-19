import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Loadable from "react-loadable";
import PropTypes from 'prop-types';
import {namespaceReducerFactory} from 'utils'
import { injectReducer } from 'redux-injector';
import  Login  from '../login/login.js';


const LazyRoute = (props) => {
  const component = Loadable.Map({
    loader: {
      component :()=> props.component(),
      reducer: ()=> props.reducer(),
      domain : ()=> props.domain(),
      inject:  ()=> props.inject(),
      root:  ()=> props.root(),
    },
    loading:(props)=> {
      if (props.error) {
        return <div>Error! </div>;
      }
      else {
        return <div>Loading...</div>;
      }
    },
    render : (loaded,props)=>{
      var Component = loaded.component.default;
      var domainComponent = loaded.domain;
      
      processReducer(loaded.domain,loaded.root,loaded.inject,props.match.path,loaded.reducer)
      
      return <Component {...props} domain={domainComponent} />;
    }
  });
  return <Route {...props} component={component} />;
};

function processReducer(domain,root,inject,path,reducer){
 inject.forEach((itemInject, index) => {
   injectReducer([root, itemInject].join('.'), namespaceReducerFactory(domain, reducer[itemInject]));
 });
}

class Main extends Component {
  constructor(props,context) {
    super(props,context);
    this.errorLoading = false;
  }

  render (){
    return(
    <div>
        <Switch>
          <LazyRoute exact path='/protected'
                     domain={()=>new Promise((res, rej) => res('@@domain/home/'))}
                     inject={() => new Promise((res, rej) => res(['comments','counter']))}
                     reducer={()=>import(/* webpackChunkName: 'homeReducer'*/ ".././home/homeReducer")} 
                     component={() =>import(/* webpackChunkName:'home'*/ ".././home/homeContainer")}
                     root={() => new Promise((res, rej) => res('home'))}
                     error=""
                     key={Math.random()} />

          <LazyRoute path='/protected/link1'
                     domain={()=>new Promise((res, rej) => res('@@domain/pagina1/'))}
                     inject={()=> new Promise((res, rej) => res(['todoList','filtro']))}
                     reducer={() =>import(/* webpackChunkName: 'pagina1Reducer'*/ ".././pagina1/pagina1Reducer")}
                     component={()=>import(/* webpackChunkName: 'pagina1' */".././pagina1/pagina1Container")} 
                     root={() => new Promise((res, rej) => res('pagina1'))}
                     key={Math.random()} />
          <Route path='/' exact component={Login} />
        </Switch>
    </div>
    );
  }
};

Main.contextTypes = {
  store: PropTypes.shape()
};
export default Main;
