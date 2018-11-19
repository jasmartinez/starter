import React, { Component } from 'react';
import {TodoListService} from "services";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {NewsletterService} from 'services';

class Pagina1 extends Component {
  constructor(props,context){
    super(props,context)
    console.log("props del componente pagina 1");
    console.log(this.props);
  }
  componentWillMount() {
  this.subscription =  NewsletterService.subscribe((data)=>{
      console.log("Data Next");
      console.log(data);
    });
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
    // this.props.removeCommentsOnUnmount();
    // removeReducer("home.comments");
  }
  render (){
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12">
              <div className="wrapperButton margin_bottom_20">
                <Button color="primary" type="button" onClick={this.props.incrementOnClick}>Test dispatch Incremento</Button>
                <Button color="secondary" type="button" onClick={this.props.decrementOnClick}>Test dispatch Decremento</Button>
                <Button color="info" type="button" onClick={this.props.loadTodoListFn}>Cargar elementos de la lista</Button>
                <Button color="warning" type="button" onClick={()=>{NewsletterService.add("datos")}}>Llammada al servicio</Button>
              </div>
              <div className="margin_bottom_20">
             <div>

             </div>
                <ListGroup >
                  {
                   this.props.filtro ===  'SHOW_ALL' ?
                    Object.values(this.props.todoList).map((item,index)=>(
                      <ListGroupItem key={index}> 
                        <span> {item.title} </span> 
                        <span> - </span> 
                        <span> {item.category}</span>
                      </ListGroupItem>
                    ))
                    :
                    Object.values(this.props.todoList)
                        .filter((item)=>{ 
                            return item.category === this.props.filtro;
                        })    
                        .map((item,index)=>(
                          <ListGroupItem key={index}>
                            <span> {item.title} </span> 
                            <span> - </span> 
                            <span> {item.category}</span>
                          </ListGroupItem>
                          ))
                      }  
                </ListGroup>
              </div>
            </Col>
          {
            Object.values(this.props.todoList).length > 0
                    ?  
            <Col xs="12">
                <ButtonGroup>
                  <Button onClick={()=>this.props.setVisibilityFilterOnClick("categoryA")}>Filtro Categoria A</Button>
                  <Button onClick={()=>this.props.setVisibilityFilterOnClick("categoryB")}>Filtro Categoria B</Button>
                  <Button onClick={()=>this.props.setVisibilityFilterOnClick("SHOW_ALL")}>Ver todos</Button>
                </ButtonGroup>
            </Col>
            :""
          }
          </Row>
        </Container>

      </div>
    );
  }
}

Pagina1.contextTypes = {
  store: PropTypes.shape(),
};


export default Pagina1;
