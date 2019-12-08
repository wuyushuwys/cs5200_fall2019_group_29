import React from 'react'

class PhotoDetails extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // likeMovie = movie => {
    //     console.log(movie)
    //     return fetch("http://localhost:4000/api/movies", {
    //         method: 'post',
    //         body: JSON.stringify(movie),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(movies => this.setState({
    //
    //         }))
    // }

    render() {
        // console.log(this.props.photo.urls)
        return (
            <div>
                <table border={"1"}>
                    <tbody>
                    <tr>
                        <td>
                            <img src={this.props.photo.urls.regular} alt={this.props.photo.alt_description}
                                 width={"400"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Description </strong>{this.props.photo.alt_description}</p>
                            <p><strong>Created by </strong>{this.props.photo.user.name}</p>
                            <p><strong>Created at </strong><em>{String(this.props.photo.created_at).substr(0, 10)}</em>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PhotoDetails;