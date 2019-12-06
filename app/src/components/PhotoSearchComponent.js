import React from 'react'
import PhotoDetails from "./PhotoDetails";
// import LikedMovies from "./LikedMovies";

class PhotoSearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            photoDescription: 'Office',
            selectedPhoto: {}
        }
    }
    // http://www.omdbapi.com/?s=batman&apikey=4a249f8d
    // componentDidMount() {
    //     fetch("http://localhost:4000/api/photos")
    //         .then(response => response.json())
    //         .then(photos => this.setState({
    //             likedMovies: photos
    //         }))
    //
    //     fetch("https://api.unsplash.com/search/photos?query=office&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3")
    //         .then(response => response.json())
    //         .then(results => this.setState({
    //             photos: results.results
    //         }))
    //
    //
    // }

    searchPhoto = () => {
        console.log('search photo: ' + this.state.photoDescription)
        this.findPhotoByDescription(this.state.photoDescription)
            .then(results => this.setState({
                photos: results.results
            }))
    }

    findPhotoByDescription = photoDescription =>
        fetch(`https://api.unsplash.com/search/photos?query=${photoDescription}&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    findPhotoById = Id =>
        fetch(`https://api.unsplash.com/photos/${Id}?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    updateForm = event => {
        this.setState({
            photoDescription: event.target.value
        })
    }

    selectPhoto = photo => {
        // console.log(photo)
        this.findPhotoById(photo.Id)
            .then(photo => this.setState({
                selectedPhoto: photo
            }))
    }

    render() {
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td valign="top">
                            <h1>Movie Search Component</h1>
                            <input
                                onChange={this.updateForm}
                                value={this.state.photoDescription}/>
                            <button onClick={this.searchPhoto}>Search</button>
                            <ol>
                                {
                                    this.state.photos.map(photo =>
                                        <li onClick={() => this.selectPhoto(photo)} key={photo.Id}>
                                            {photo.alt_description}
                                            <br/>
                                            <img src={photo.urls.regular}/>

                                        </li>
                                    )
                                }
                            </ol>
                        </td>
                        <td>
                            <PhotoDetails photo={this.state.selectedPhoto}/>
                        </td>
                        {/*<td>*/}
                        {/*    <LikedMovies*/}
                        {/*        likedMovies={this.state.likedMovies}/>*/}
                        {/*</td>*/}
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default PhotoSearchComponent;