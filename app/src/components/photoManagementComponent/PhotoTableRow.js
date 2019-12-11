import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class PhotoTableRow extends Component {
    constructor(props) {
        super(props);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    deletePhoto() {
        axios.delete('http://localhost:4000/photos/delete-photo/' + this.props.obj._id)
            .then((res) => {
                console.log('Photo successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <tr>
                <td>{this.props.obj.authorId}</td>
                <td>{this.props.obj.photoId}</td>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.url}</td>
                <td>
                    <Link className="edit-link" to={"/edit-user/" + this.props.obj._id}>Edit</Link>
                    <Button onClick={this.deleteUser} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }
}