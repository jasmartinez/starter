import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from './actions';
import 'bootstrap/dist/css/bootstrap.css';
import {
  push
} from 'react-router-redux';

class Login extends Component {  
  constructor(props,context) {
    super(props,context);
    this.errorLoading = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const location = {
      pathname: '/protected',
      search: '',
      query: {},
      state: {},
    }
    this.context.store.dispatch(push(location));

//    dispatch(Actions.signIn(data));
  }
  render() {
    return (
      <div className="container mt-5">
        <form 
          className="form-horizontal jumbotron" 
          onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <div className="form-group">
              <label className="col-lg-2">Email</label>
              <div className="col-lg-12">
                <input 
                  className="form-control" 
                  ref="email" 
                  id="user_email" 
                  type="text" 
                  placeholder="email" required={true} />
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-2">Password</label>
              <div className="col-lg-12">
                <input 
                  className="form-control" 
                  ref="password" 
                  id="user_password" 
                  type="password" 
                  placeholder="password" required={true} />
              </div>
            </div>
            <br/>       
          <button type="submit" className="btn btn-default btn-info float-right" >Submit</button>
          </fieldset>
        </form>
    </div>
    );
  }
}

Login.contextTypes = {
  store: PropTypes.shape()
};

export default Login;