import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';

export default class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/users/')
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.users.map((res, i) => {
            return <UserTableRow obj={res} key={i} />;
        });
    }

    render() {
        return(<div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Username</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>UserType</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        )
    }

}