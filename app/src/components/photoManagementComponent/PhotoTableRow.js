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
        axios.delete('http://localhost:4000/photos/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('Photo successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <tr>
                <td>{this.props.obj.ownerId}</td>
                <td>{this.props.obj.src}</td>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.src}</td>
                <td>
                    <Link className="edit-link" to={"/photo_edit/" + this.props.obj._id}>Edit</Link>
                    <Button onClick={this.deletePhoto} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }
}