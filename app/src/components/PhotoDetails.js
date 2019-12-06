import React from 'react'

class PhotoDetails extends React.Component{
    constructor(props) {
        super(props);
    }

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
        return(
            <div>
                <h1>Photo Details</h1>
                <h2>{this.props.photo.alt_description}</h2>
                {/*<button onClick={() => this.likeMovie(this.props.movie)}>Like</button>*/}
                <img src={this.props.photo.urls}/>
                <p>{"Created By " + this.props.photo.user}</p>
                <p>{"Created at " + this.props.photo.created_at}</p>
            </div>
        )
    }
}

export default PhotoDetails;