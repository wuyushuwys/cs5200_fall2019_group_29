import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CommentTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
    }
    deleteComment() {
        axios.delete('http://localhost:4000/comments/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('Comment successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {

        return(
            <tr>
                <td>{this.props.obj.userId}</td>
                <td>{this.props.obj.photoId}</td>
                <td>{this.props.obj.content}</td>
                <td>
                    <Link className="edit-link" to={"/comment_edit/" + this.props.obj._id}>Edit</Link>
                    <Button onClick={this.deleteComment} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }
}