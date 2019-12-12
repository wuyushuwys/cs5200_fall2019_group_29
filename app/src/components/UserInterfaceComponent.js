import React, {Component} from 'react';
import {MDBInput} from 'mdbreact';
import axios from "axios";


class UserInterfaceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            userId: '',
            userType: '',
            error: '',
            comment: '',
            photo_title: '',
            photo_src: '',
            photo_description: '',
            comments: [],
            showPhotoUrl: '',
        };
        this.dismissError = this.dismissError.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleUser = this.handleUser.bind(this)

        this.handlePhotoTitleChange = this.handlePhotoTitleChange.bind(this);
        this.handlePhotoSrcChange = this.handlePhotoSrcChange.bind(this);
        this.handlePhotoDescriptionChange = this.handlePhotoDescriptionChange.bind(this);

    }

    componentDidMount() {
        this.findUserByCredential(this.state.username, this.state.password)
    }

    findUserByCredential = (username, password) =>
        axios.get(`http://localhost:4000/users/${username}/${password}`)
            .then(res => {
                this.setState({
                    userId: res.data[0]._id,
                    userType: res.data[0].personType,
                });
            })
            .catch((error) => {
                console.log(error);
            })

    dismissError() {
        this.setState({error: ''});
    }

    // findCommentsByUserId = userId =>
    //     fetch(`http://localhost:4000/comments/user/${userId}`)
    //         .then(response => response.json())
    //
    // searchUserAllComments = () => {
    //     this.findCommentsByUserId(this.state.userId)
    //         .then(result => this.setState({
    //             comments: result,
    //         }))
    // }


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
            photo_title: '',
            photo_src: '',
            photo_description: '',
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

    findPhotoById = id =>
        fetch(`https://api.unsplash.com/photos/${id}?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())



    render() {

        // const allUserComments =
        //     <table>
        //         <tbody>
        //         <tr>
        //             <td>
        //                 {
        //                     this.state.comments.map(comment =>
        //                         <li key={comment._id}
        //                             style={{listStyleType: "none"}}>
        //                             {/*<img src={this.findPhotoById(comment.photoId).then(result => result.urls.small)}*/}
        //                             {/*     width="100" alt={comment.photoId}/>*/}
        //                             <p>{comment.photoId}-->{comment.content}</p>
        //                         </li>
        //                     )}
        //             </td>
        //         </tr>
        //         </tbody>
        //     </table>
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
                                    <li>Username: {this.state.username}</li>
                                    <li>User Type: {this.state.userType}</li>
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
                        {/*<tr>*/}
                        {/*    <td>*/}
                        {/*        {allUserComments}*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default UserInterfaceComponent;