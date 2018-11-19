import React, { Component } from 'react';
import {HeaderContainer} from "components";
import {MainContainer} from "components";
import {Main} from "components";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  componentWillMount() {
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render (){
    return (
      <div>
        <HeaderContainer />
        <Main />
      </div>
    );
  }
}

export default App;
