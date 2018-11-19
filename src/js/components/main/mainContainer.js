import React from 'react';
import { connect } from 'react-redux';
import Main from './main.js';

const MainContainer = connect()(Main);
export default MainContainer;
