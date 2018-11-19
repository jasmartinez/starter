
class  Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {items :[]};
  }

  componentWillReceiveProps(nextProps){
  console.log("componente recibe propiedades nuevas")
  }

  shouldComponentUpdate(nextProps, nextState){
      return true;
  }

  componentDidUpdate(prevProps, prevState){
  console.log("componente wrapper actualizado");
  }


  render(){
    console.log("render del wrapper");
    return(
        <Container >
          <Row>
            <Col xs="12">
            app principal
            <ul>
               {this.props.items.map((item,key )=>{
                  return <li key={key}>{item}</li>;
                })}
            </ul>
            </Col>
          </Row>
        </Container>
      )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
     this.state ={items : []};
  }

  componentWillMount(){
    console.log("componente previo al render y antes de montar");
  }
  componentDidMount(){
    console.log("componente montado");
  }

   handleCallService(event){
    console.log("click");
    console.log(event);
    console.log(this);

     HttpApiService.commentsService().then((response)=>{

      //this.setState({items : response.result});
      console.log(this.items);
    });

  }

  handleCallMethod(){
    console.log("callMethod");
    this.setState({items:this.state.items.concat(1)});
    console.log(this.state.items);
    console.log(this);
  }
  render() {
    console.log("render");
    return(
      <div className="mojon">
        <button onClick={this.handleCallService.bind(this)} > boton</button>
        <button onClick={this.handleCallMethod.bind(this)} > metodo</button>
        <Wrapper items={this.state.items}></Wrapper>
      </div>
    )
  }
}
