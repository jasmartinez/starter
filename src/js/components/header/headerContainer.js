import React from 'react';
import { connect } from 'react-redux';
import Header from './header.js';

const mapStateToProps = (state, ownProps) => {
  return {
    routeActive: state.router.location
  }
}

const HeaderContainer = connect(
  mapStateToProps
)(Header);
export default HeaderContainer
