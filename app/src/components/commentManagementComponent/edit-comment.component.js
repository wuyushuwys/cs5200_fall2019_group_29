import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditComment extends Component {
    constructor(props) {
        super(props)
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangePhotoId = this.onChangePhotoId.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            useId:'',
            photoId:'',
            content:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/comments/edit-comment/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    userId: res.data.userId,
                    photoId: res.data.photoId,
                    content: res.data.content,

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUserId(e){
        this.setState({ userId: e.target.value })
    }
    onChangePhotoId(e){
        this.setState({ photoId: e.target.value })
    }

    onChangeContent(e){
        this.setState({ content: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const commentObject = {
            userId: this.state.userId,
            photoId: this.state.photoId,
            content: this.state.content,
        };

        axios.put('http://localhost:4000/users/update-comment/' + this.props.match.params.id, commentObject)
            .then((res) => {
                console.log(res.data)
                console.log('Comment successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        this.props.history.push('/comment-list')

    }

    render(){
        return(
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="UserId">
                        <Form.Label>UserId</Form.Label>
                        <Form.Control type="text" value={this.state.userId} onChange={this.onChangeUserId} />
                    </Form.Group>

                    <Form.Group controlId="PhotoId">
                        <Form.Label>PhotoId</Form.Label>
                        <Form.Control type="text" value={this.state.photoId} onChange={this.onChangePhotoId} />
                    </Form.Group>

                    <Form.Group controlId="Comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" value={this.state.content} onChange={this.onChangeContent} />
                    </Form.Group>
                </Form>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Comment
                </Button>

            </div>

        )
    }



}