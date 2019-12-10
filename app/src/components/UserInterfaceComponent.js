import React, {Component} from 'react';
import {MDBInput} from 'mdbreact';


class UserInterfaceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            error: '',
            comment: '',
            photo_title: '',
            photo_src: '',
            photo_description: '',
            photo: {
                title: '',
                src: '',
                description: '',
            },
        };

        this.dismissError = this.dismissError.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleUser = this.handleUser.bind(this)

        this.handlePhotoTitleChange = this.handlePhotoTitleChange.bind(this);
        this.handlePhotoSrcChange = this.handlePhotoSrcChange.bind(this);
        this.handlePhotoDescriptionChange = this.handlePhotoDescriptionChange.bind(this);

    }

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

    submitComment = () => console.log("Submit Comment: " + this.state.comment)


    handlePhotoTitleChange = event =>
        this.setState({photo_title: event.target.value})

    handlePhotoSrcChange = event =>
        this.setState({photo_src: event.target.value,})

    handlePhotoDescriptionChange = event =>
        this.setState({photo_description: event.target.value,})

    postPhoto = async () => {
        await this.setState({
            photo: {
                title: this.state.photo_title,
                src: this.state.photo_src,
                description: this.state.photo_description,
            },
            photo_title: '',
            photo_src: '',
            photo_description: '',
        })

    }


    render() {
        // console.log("read id" + JSON.stringify(this.state))
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
        if (this.props.user.type === "Guest") {
            return (
                <div>
                    <h1>You are a guest!</h1>
                </div>);
        } else {
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
                                <form onSubmit={this.handleUser}>
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
                                            <button onClick={this.postPhoto}>Post</button>
                                        </p>
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <form onSubmit={this.handleUser}>
                                    <fieldset>
                                        <legend align={'center'}>Comment</legend>
                                        <p align={'center'}>{this.props.selectedPhotoId}</p>
                                        <MDBInput type='textarea' value={this.state.comment} rows={'5'}
                                                  onChange={this.handleCommentChange} style={{width: "300px"}}/>
                                        <br/>
                                        <p align={'center'}>
                                            <button onClick={this.submitComment}>Submit</button>
                                        </p>
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default UserInterfaceComponent;