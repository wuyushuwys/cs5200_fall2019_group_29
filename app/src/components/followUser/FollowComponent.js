import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FollowUserTableRow from "./FollowUserTableRow";
import FollowedUserTableRow from "./FollowedUserTableRow";

export default class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            follows: [],
            userId: '',
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
        this.findUserByCredential(this.props.user.username, this.props.user.password)
            .then(() => axios.get('http://localhost:4000/follows'))
            .then(res => this.setState({
                follows: res.data,
            }))
    }

    findUserByCredential = (username, password) =>
        axios.get(`http://localhost:4000/users/${username}/${password}`)
            .then(res => {
                this.setState({
                    userId: res.data[0]._id,
                });
            })
            .catch((error) => {
                console.log(error);
            })

    UsersTable() {
        return this.state.users.map((res, i) => {
            if (res.username !== this.props.user.username)
                return <FollowUserTableRow obj={res} user={this.props.user} key={i}/>;
        });
    }

    FollowedTable() {
        return this.state.follows.map((res, i) => {
            if (res.follower === this.state.userId)
                return <FollowedUserTableRow obj={res} user={this.props.user} key={i}/>;
        });
    }



    render() {
        console.log(this.state.null)
        return (<div>
                <div className="table-wrapper">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <td colSpan={100} align={'center'}><h2>Follow Users</h2></td>
                        </tr>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.UsersTable()}
                        </tbody>

                    </Table>
                </div>
                <div className="table-wrapper">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <td colSpan={100} align={'center'}><h2>Followed</h2></td>
                        </tr>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.FollowedTable()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

}