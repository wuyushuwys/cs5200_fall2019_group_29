import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreatePhoto extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangePhotoId = this.onChangePhotoId.bind(this);
        this.onChangeAuthorId = this.onChangeAuthorId.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);

        // Setting up state
        this.state = {
            authorId:'',
            photoId:'',
            title:'',
            description:'',
            url:'',
        }
    }

    onChangeAuthorId(e){
        this.setState({ authorId: e.target.value })
    }

    onChangePhotoId(e){
        this.setState({ photoId: e.target.value })
    }

    onChangeTitle(e){
        this.setState({ title: e.target.value })
    }

    onChangeDescription(e){
        this.setState({ description: e.target.value })
    }

    onChangeUrl(e) {
        this.setState({ url: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        const photoObject = {
            authorId:this.state.authorId,
            photoId: this.state.photoId,
            title: this.state.title,
            description:this.state.description,
            url:this.state.url,
        };



        axios.post('http://localhost:4000/photos/create-photo', photoObject)
            .then(res => console.log(res.data));

        this.setState({
            authorId:'',
            photoId:'',
            title:'',
            description:'',
            url:''
        });
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="AuthorId">
                    <Form.Label>Author ID</Form.Label>
                    <Form.Control type="text" value={this.state.authorId} onChange={this.onChangeAuthorId} />
                </Form.Group>

                <Form.Group controlId="PhotoId">
                    <Form.Label>Photo ID</Form.Label>
                    <Form.Control type="text" value={this.state.photoId} onChange={this.onChangePhotoId} />
                </Form.Group>


                <Form.Group controlId="Title">
                    <Form.Label> Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription} />
                </Form.Group>

                <Form.Group controlId="URL">
                    <Form.Label> URL</Form.Label>
                    <Form.Control type="text" value= {this.state.url} onChange={this.onChangeUrl} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Create Photo
                </Button>
            </Form>
        </div>);
    }
}
