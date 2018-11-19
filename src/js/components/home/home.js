import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { removeReducer } from 'redux-injector';
import {
  Container,
  Row,
  Col,
  Button,
  Alert
} from 'reactstrap';
import {NewsletterService} from 'services';
import {Actions$} from 'services';

class Home extends Component {
  constructor(props,context) {
    super(props,context);
    this.logState = this.logState.bind(this);
    this.logReducers = this.logReducers.bind(this);
    this.subscriptions = [];

  }
  componentWillMount() {
    // this.context.store.subscribe((data) => {
    //   console.log(data);
    // });
  this.subscriptions.push(
    NewsletterService.subscribe((data)=>{
      console.log("Data Next");
      console.log(data);
    })
  );
  
  this.subscriptions.push(
    Actions$.subscribe((action) => {
    console.log("Acciones disparadas");
    console.log(action);
    })
  );
  
}
  logState(){
    console.log((this.context.store.getState()));
  }
  logReducers(){
    console.log((this.context));
  }
  componentWillUnmount() {
    this.subscriptions.forEach((subscription)=>{
        subscription.unsubscribe();
    });
    // this.props.removeCommentsOnUnmount();
    // removeReducer("home.comments");
  }
  render (){
    return(
        <Container>
          <Row>
            <Col xs="12">
              <div  value={this.props.value}>
                <div className="wrapperButton mb-4">
                  <Button color="primary" type="button" onClick={this.props.incrementOnClick}>Incremento</Button>
                  <Button color="secondary" type="button" onClick={this.props.decrementOnClick}>Decremento</Button>
                  <Button color="info" type="button" onClick={this.logState}>Log State</Button>
                  <Button color="success" type="button" onClick={this.logReducers}>Log Reducers</Button>
                  <Button color="warning" type="button" onClick={this.props.getCommentsOnClick}>Get Comments</Button>
                  <Button color="warning" type="button" onClick={()=>{NewsletterService.add("datos")}}>Llammada al servicio</Button>
                </div>

                <Alert color="info">
                  <h6>
                    Valor del reducer Counter
                  </h6>
                </Alert>

                <Alert color="dark">
                {
                  (this.props.value == 0)
                  ? <p>sin valor</p>
                  :
                  <ul className="list">
                    <li>{this.props.value}</li>
                  </ul>
                }
                </Alert>
                
                {  
                (Object.values(this.props.comments).length > 0)
                  ? <h6>Comments Normalizado de datos</h6>
                  : null
                }

                {
                (Object.values(this.props.comments).length > 0)
                ? Object.values(this.props.comments).map((item)=>{
                    return <Alert key={item.id} color="light">
                            {item.body}
                          </Alert>
                  })
                :null
              }
              </div>
            </Col>
          </Row>
        </Container>

    );
  }
};

Home.contextTypes = {
  store: PropTypes.shape()
};
export default Home;
