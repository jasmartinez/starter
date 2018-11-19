import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render (){
      if(this.props.routeActive.pathname == '/'){
        return(
          <div>
              {/* <Breadcrumb tag="nav">
                { this.props.routeActive.pathname == '/'
                  ?  <BreadcrumbItem active >
                    Login 
                    </BreadcrumbItem>
                  : ""
                }
              </Breadcrumb> */}
          </div>
        )   
      }
      else {
          return(
            <div >
                <Breadcrumb tag="nav">
                  {this.props.routeActive.pathname == '/protected'
                    ?  <BreadcrumbItem active >
                        Home
                      </BreadcrumbItem>
                    : <BreadcrumbItem  >
                        <Link to='/protected'>Home</Link>
                      </BreadcrumbItem>
                  }
                  {this.props.routeActive.pathname == '/protected/link1'
                    ?  <BreadcrumbItem active >
                        Pagina1
                      </BreadcrumbItem>
                    : <BreadcrumbItem  >
                        <Link to='/protected/link1'>Pagina1</Link>
                      </BreadcrumbItem>
                  }
                </Breadcrumb>
            </div>
          );
     }
  }
}

export default Header;
