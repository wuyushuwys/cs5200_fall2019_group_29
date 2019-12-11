import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./UserManageInterfaceComponent.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import CreateUser from "./userManagementComponent/create-user.component";
import EditUser from "./userManagementComponent/edit-user.component";
import UserList from "./userManagementComponent/user-list.component";

import CommentList from "./commentManagementComponent/comment-list.component";
import EditComment from "./commentManagementComponent/edit-comment.component";

import PhotoList from "./photoManagementComponent/photo-list.component";
import EditPhoto from "./photoManagementComponent/edit-photo.component";

import EmptyComponent from "./EmptyComponent";

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
                                    <Link to={"/user/create"} className="nav-link">
                                        Create User
                                    </Link>
                                </Nav>
                                <Nav>
                                    <Link to={"/user"} className="nav-link">
                                        User List
                                    </Link>
                                </Nav>
                                <Nav>
                                  <Link to={"/photo"} className="nav-link">
                                    Posted Photos
                                  </Link>
                                </Nav>
                                <Nav>
                                  <Link to={"/comment"} className="nav-link">
                                    Comments
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
                                    <Route exact path='/' component={EmptyComponent}/>

                                    <Route path="/user/create" component={CreateUser}/>
                                    <Route path="/user/edit/:id" component={EditUser}/>
                                    <Route path="/user" component={UserList}/>
                                    <Route path="/comment" component={CommentList}/>
                                    <Route path="/comment/edit/:id" component={EditComment}/>
                                    <Route path="/photo" component={PhotoList}/>
                                    <Route path="/photo/edit/:id" component={EditPhoto}/>


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