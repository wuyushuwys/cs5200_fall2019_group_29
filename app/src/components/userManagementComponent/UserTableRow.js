import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UserTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser = async (e) => {
        e.preventDefault()
        axios.delete('http://localhost:4000/users/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('User successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <tr>
                <td>{this.props.obj.firstName}</td>
                <td>{this.props.obj.lastName}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.gender}</td>
                <td>{String(this.props.obj.birthday).substr(0, 10)}</td>
                <td>{this.props.obj.personType}</td>
                <td>{this.props.obj.adminKey}</td>
                <td>{this.props.obj.password}</td>
                <td>
                    <Link className="edit-link" to={"/user_edit/" + this.props.obj._id}>Edit</Link>
                    <Button onClick={this.deleteUser} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }
}