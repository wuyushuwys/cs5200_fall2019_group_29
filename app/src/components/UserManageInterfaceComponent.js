import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./UserManageInterfaceComponent.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import CreateUser from "./create-user.component";
import EditUser from "./edit-user.component";
import UserList from "./user-list.component";


class UserManageInterfaceComponent extends React.Component {

    render() {

        return (<Router>
            <div className="App">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                    Users Management Interface
                            </Navbar.Brand>

                            <Nav className="justify-content-end">
                                <Nav>
                                    <Link to={"/create-user"} className="nav-link">
                                        Create User
                                    </Link>
                                </Nav>
                                <Nav>
                                    <Link to={"/user-list"} className="nav-link">
                                        User List
                                    </Link>
                                </Nav>
                                <Nav>
                                  <Link to={"/"} className="nav-link">
                                    List Posted Photo
                                  </Link>
                                </Nav>
                                <Nav>
                                  <Link to={"/"} className="nav-link">
                                    List Comments
                                  </Link>
                                </Nav>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>

                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="wrapper">
                                <Switch>
                                    <Route exact path='/' component={UserList}/>
                                    <Route path="/create-user" component={CreateUser}/>
                                    <Route path="/edit-user/:id" component={EditUser}/>
                                    <Route path="/user-list" component={UserList}/>
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>);
    }
}

export default UserManageInterfaceComponent;