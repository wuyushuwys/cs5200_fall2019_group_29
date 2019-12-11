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
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ownerId:'',
            photoId:'',
            title:'',
            description:'',
            source:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/photos/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    ownerId: res.data.ownerId,
                    photoId: res.data._id,
                    title:res.data.title,
                    description: res.data.description,
                    source:res.data.src
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

    onChangeSource(e) {
        this.setState({ source: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const photoObject = {
            ownerId: this.state.ownerId,
            photoId: this.state.photoId,
            title: this.state.title,
            description:this.state.description,
            source:this.state.source,
        };

        axios.put('http://localhost:4000/photos/update/' + this.props.match.params.id, photoObject)
            .then((res) => {
                console.log(res.data)
                console.log('Photo successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Student List
        this.props.history.push('/photo')
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    {/*<Form.Group controlId="AuthorId">*/}
                    {/*    <Form.Label>OwnerId</Form.Label>*/}
                    {/*    <Form.Control type="text" value={this.state.ownerId} onChange={this.onChangeAuthorId} />*/}
                    {/*</Form.Group>*/}

                    {/*<Form.Group controlId="PhotoId">*/}
                    {/*    <Form.Label>PhotoId</Form.Label>*/}
                    {/*    <Form.Control type="text" value={this.state.photoId} onChange={this.onChangePhotoId} />*/}
                    {/*</Form.Group>*/}

                    <Form.Group controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
                    </Form.Group>

                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription} />
                    </Form.Group>

                    <Form.Group controlId="Source">
                        <Form.Label>Source</Form.Label>
                        <Form.Control type="text" value={this.state.source} onChange={this.onChangeSource} />
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Update Photo
                    </Button>
                </Form>
            </div>
        );
    }


}