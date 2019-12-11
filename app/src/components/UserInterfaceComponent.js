import React, {Component} from 'react';
import {MDBInput} from 'mdbreact';
import axios from "axios";

const mongoose = require('mongoose')

class UserInterfaceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            userId: this.findUserByCredential(this.props.user.username, this.props.user.password),
            error: '',
            comment: '',
            photo_title: '',
            photo_src: '',
            photo_description: '',

        };

        this.dismissError = this.dismissError.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleUser = this.handleUser.bind(this)

        this.handlePhotoTitleChange = this.handlePhotoTitleChange.bind(this);
        this.handlePhotoSrcChange = this.handlePhotoSrcChange.bind(this);
        this.handlePhotoDescriptionChange = this.handlePhotoDescriptionChange.bind(this);

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

    dismissError() {
        this.setState({error: ''});
    }


    handleCommentChange = event =>
        this.setState({comment: event.target.value})


    handleUser(event) {
        event.preventDefault();

        if (!this.state.username || !this.state.password) {
            return this.setState({error: 'Must Login'});
        }
        return this.setState({error: ''});
    }

    getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return mm + '/' + dd + '/' + yyyy;

    }

    onSubmitPhoto = async e => {
        await e.preventDefault()

        await console.log(this.state.userId)
        const photoObject = {
            title: this.state.photo_title,
            description: this.state.photo_description,
            src: this.state.photo_src,
            ownerId: this.state.userId,
            ownerName: this.state.username,
            created: this.getCurrentDate(),
            updated: this.getCurrentDate(),
        };

        await axios.post('http://localhost:4000/photos/create', photoObject)
            .then(res => console.log(res.data));

        await this.setState({
            comment: ''
        });
    }


    onSubmitComment = async e => {
        await e.preventDefault()

        await console.log(this.state.userId)
        // console.log('this:',this)
        const commentObject = {
            userId: this.state.userId,
            photoId: this.props.selectedPhotoId,
            content: this.state.comment,
        };

        await axios.post('http://localhost:4000/comments/create', commentObject)
            .then(res => console.log(res.data));

        await this.setState({
            comment: ''
        });
    }

    // submitComment = () => console.log("Submit Comment: " + this.state.comment)


    handlePhotoTitleChange = event =>
        this.setState({photo_title: event.target.value})

    handlePhotoSrcChange = event =>
        this.setState({photo_src: event.target.value,})

    handlePhotoDescriptionChange = event =>
        this.setState({photo_description: event.target.value,})


    render() {

        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
        if (this.props.user.type === "Guest") {
            return (
                <div>
                    <h1>You are a guest!</h1>
                </div>);
        } else {
            const commentForm = this.props.selectedPhotoId === '' ? <td></td> :
                <td>
                    <form onSubmit={this.onSubmitComment}>
                        <fieldset>
                            <legend align={'center'}>Comment</legend>
                            <p align={'center'}>{this.props.selectedPhotoId}</p>
                            <MDBInput type='textarea' value={this.state.comment} rows={'5'}
                                      onChange={this.handleCommentChange} style={{width: "300px"}}/>
                            <br/>
                            <p align={'center'}>
                                <button type={"submit"}>Submit</button>
                            </p>
                        </fieldset>
                    </form>
                </td>
            return (
                <div className="Login">
                    <table border={"1"} width={"300"}>
                        <tbody>
                        <tr>
                            <th height={"100"}><h1 align={"center"}>User Interface</h1></th>
                        </tr>
                        <tr>
                            <td align={"left"}>
                                <fieldset>
                                    <legend align={"center"}>Current User Profile</legend>
                                    <li>Username: {this.props.user.username}</li>
                                    <li>User Type: {this.props.user.type}</li>
                                </fieldset>
                            </td>
                        </tr>
                        <tr align={"left"}>
                            <td>
                                <form onSubmit={this.onSubmitPhoto}>
                                    <fieldset>
                                        <legend align={'center'}>Post Your Photo</legend>
                                        <label>Title: </label>
                                        <input align={'center'} value={this.state.photo_title}
                                               onChange={this.handlePhotoTitleChange}
                                               style={{width: "200px"}}/>
                                        <br/>
                                        <label>Source: </label>
                                        <input align={'center'} value={this.state.photo_src}
                                               onChange={this.handlePhotoSrcChange}
                                               style={{width: "200px"}}/>
                                        <br/>
                                        <label>Description: </label>
                                        <input align={'center'} value={this.state.photo_description}
                                               onChange={this.handlePhotoDescriptionChange}
                                               style={{width: "200px"}}/>
                                        <br/>
                                        <p align={'center'}>
                                            <button type={"submit"}>Post</button>
                                        </p>
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            {commentForm}
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default UserInterfaceComponent;