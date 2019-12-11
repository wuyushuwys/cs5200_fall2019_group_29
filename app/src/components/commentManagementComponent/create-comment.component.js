import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateComment extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangePhotoId = this.onChangePhotoId.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        // Setting up state
        this.state = {
            userId:'',
            photoId:'',
            content:'',
        }
    }

    onChangeUserId(e){
        this.setState({ userId: e.target.value})
    }
    onChangePhotoId(e){
        this.setState({ photoId: e.target.value})
    }

    onChangeContent(e){
        this.setState({ content: e.target.value})
    }


    onSubmit(e) {
        e.preventDefault()

        console.log('this:',this)
        const commentObject = {
            userId: this.state.userId,
            photoId: this.state.photoId,
            content: this.state.content,
        };

        axios.post('http://localhost:4000/comments/create', commentObject)
            .then(res => console.log(res.data));

        this.setState({
            userId:'',
            photoId:'',
            content:''
        });
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="UserId">
                    <Form.Label>UserID</Form.Label>
                    <Form.Control type="text" value={this.state.useId} onChange={this.onChangeUserId} />
                </Form.Group>

                <Form.Group controlId="PhotoId">
                    <Form.Label>PhotoID</Form.Label>
                    <Form.Control type="text" value={this.state.photoId} onChange={this.onChangePhotoId} />
                </Form.Group>


                <Form.Group controlId="Content">
                    <Form.Label> Content</Form.Label>
                    <Form.Control type="text" value={this.state.content} onChange={this.onChangeContent} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Create Comment
                </Button>
            </Form>
        </div>);
    }
}
