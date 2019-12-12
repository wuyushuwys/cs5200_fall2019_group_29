import React, {Component} from 'react'
import axios from "axios";

class UserPostedAndComentedComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            userId: '',
            comments: [],
            photos: [],
        }
    }

    componentDidMount() {
        this.findUserByCredential(this.state.username, this.state.password)
            .then(() => this.findCommentsByUserId(this.state.userId))
            .then(() => this.searchUserAllComments())
            .then(() => this.searchUserAllPhotos())
    }


    findUserByCredential = (username, password) =>
        axios.get(`http://localhost:4000/users/${username}/${password}`)
            .then(res => {
                this.setState({
                    userId: res.data[0]._id,
                    // userType: res.data[0].personType,
                });
            })
            .catch((error) => {
                console.log(error);
            })

    findCommentsByUserId = userId =>
        fetch(`http://localhost:4000/comments/user/${userId}`)
            .then(response => response.json())

    searchUserAllComments = () => {
        this.findCommentsByUserId(this.state.userId)
            .then(result => this.setState({
                comments: result,
            }))
    }

    findPhotosByUserId = userId =>
        fetch(`http://localhost:4000/photos/user/${userId}`)
            .then(response => response.json())

    searchUserAllPhotos = () => {
        this.findPhotosByUserId(this.state.userId)
            .then(result => this.setState({
                photos: result,
            }))
    }


    render() {
        return (
            <table border={'1'}>
                <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td><h4>user's comments</h4></td>
                            </tr>
                            <tr>
                                <td>
                                    <ol>
                                        {
                                            this.state.comments.map(comment =>
                                                <li key={comment._id}>
                                                    <p>{comment.content}<br/>-->{comment.photoId}</p>
                                                </li>
                                            )}
                                    </ol>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td><h4>user posted photos</h4></td>
                            </tr>
                            <tr>
                                <td>
                                    <ol>
                                        {
                                            this.state.photos.map(photo =>
                                                <li key={photo._id}>
                                                    <table>
                                                        <tbody>
                                                        <tr>
                                                            <td>Title: {photo.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Description: {photo.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src={photo.src} width={200} alt={photo._id}/></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </li>
                                            )}
                                    </ol>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default UserPostedAndComentedComponent