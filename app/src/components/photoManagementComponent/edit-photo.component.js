import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditPhoto extends Component {
    constructor(props) {
        super(props)

        this.onChangePhotoId = this.onChangePhotoId.bind(this);
        this.onChangeAuthorId = this.onChangeAuthorId.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            authorId:'',
            photoId:'',
            title:'',
            description:'',
            url:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/photos/edit-photo/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    authorId: res.data.authorId,
                    photoId: res.data.photoId,
                    title:res.data.title,
                    description: res.data.description,
                    url:res.data.url
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onChangePhotoId(e){
        this.setState({ photoId: e.target.value })
    }

    onChangeAuthorId(e){
        this.setState({ authorId: e.target.value })
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
            authorId: this.state.authorId,
            photoId: this.state.photoId,
            title: this.state.title,
            description:this.state.description,
            url:this.state.url,
        };

        axios.put('http://localhost:4000/photos/update-photo/' + this.props.match.params.id, photoObject)
            .then((res) => {
                console.log(res.data)
                console.log('Photo successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Student List
        this.props.history.push('/photo-list')
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="AuthorId">
                        <Form.Label>AuthorId</Form.Label>
                        <Form.Control type="text" value={this.state.authorId} onChange={this.onChangeAuthorId} />
                    </Form.Group>

                    <Form.Group controlId="PhotoId">
                        <Form.Label>PhotoId</Form.Label>
                        <Form.Control type="text" value={this.state.photoId} onChange={this.onChangePhotoId} />
                    </Form.Group>

                    <Form.Group controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
                    </Form.Group>

                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription} />
                    </Form.Group>

                    <Form.Group controlId="Url">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" value={this.state.url} onChange={this.onChangeUrl} />
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Update Photo
                    </Button>
                </Form>
            </div>
        );
    }


}