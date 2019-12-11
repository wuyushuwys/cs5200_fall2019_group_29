import React from 'react'

class PhotoDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }


    findCommentsByPhotoId = photoId =>
        fetch(`http://localhost:4000/comments/photo/${photoId}`)
            .then(response => response.json())

    searchUserAllComments = () => {
        this.findCommentsByPhotoId(this.props.photo.id)
            .then(result => this.setState({
                comments: result,
            }))
    }

    render() {
        this.searchUserAllComments()
        return (
            <div>
                <table border={"1"}>
                    <tbody>
                    <tr align={'center'}>
                        <td><h2>Photo Details</h2></td>
                    </tr>
                    <tr>
                        <td>
                            <img src={this.props.photo.urls.full} width={"380"} alt={this.props.photo.alt_description}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Photo Id: </strong>{this.props.photo.id}</p>
                            <p><strong>Description: </strong>{this.props.photo.alt_description}</p>
                            <p><strong>Created by: </strong>{this.props.photo.user.name}</p>
                            <p><strong>Created at: </strong><em>{String(this.props.photo.created_at).substr(0, 10)}</em>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Comments</p>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        {
                                            this.state.comments.map(comment =>
                                                <li key={comment._id}
                                                    style={{listStyleType: "none"}}>
                                                    <p>{comment.userId}-->{comment.content}</p>
                                                </li>
                                            )}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PhotoDetails;