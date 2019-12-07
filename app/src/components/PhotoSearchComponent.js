import React from 'react'
import PhotoDetails from "./PhotoDetails";
// import LikedMovies from "./LikedMovies";

class PhotoSearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            photoDescription: 'Office',
            selectedPhoto: {},
        }
    }
    // http://www.omdbapi.com/?s=batman&apikey=4a249f8d
    componentDidMount() {
        // fetch("http://localhost:4000/api/photos")
        //     .then(response => response.json())
        //     .then(photos => this.setState({
        //         likedMovies: photos
        //     }))

        fetch(`https://api.unsplash.com/search/photos?query=office&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())
            .then(results => this.setState({
                photos: results.results
            }))

        // fetch(`https://api.unsplash.com/photos/random?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
        //     .then(response => response.json())
        //     .then(results => this.setState({
        //         selectedPhoto: results
        //     }))
    }

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

    findPhotoById = id =>
        fetch(`https://api.unsplash.com/photos/${id}?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    updateForm = event => {
        this.setState({
            photoDescription: event.target.value
        })
        this.setState({
            photoTags: event.target.value
        })
    }

    selectPhoto = photo => {
        // console.log(photo)
        return this.findPhotoById(photo.id)
            .then(photo => this.setState({
                selectedPhoto: photo
            }))
    }

    render() {
        console.log(this.state.selectedPhoto)
        if(Object.keys(this.state.selectedPhoto).length == 0){
                return (
                    <div>
                        <table width="600">
                            <tbody>
                            <tr>
                                <td valign="top" width="200">
                                    <h1 align={"center"}>Search</h1>
                                    <h2 align={"center"}>
                                        <input onChange={this.updateForm} value={this.state.photoDescription}/>
                                        <button align={"center"} onClick={this.searchPhoto}>Search</button>
                                    </h2>
                                    <ol>
                                        {
                                            this.state.photos.map(photo =>
                                                <li onClick={() => this.selectPhoto(photo)} key={photo.id}>
                                                    <br/>
                                                    <h3>
                                                        <img src={photo.urls.full} width={200}/>
                                                    </h3>
                                                    <h4 bold={"true"}>{"Description: "}</h4>
                                                    <em>{photo.alt_description}</em>
                                                    <br/>
                                                </li>
                                            )
                                        }
                                    </ol>
                                </td>
                                <td valign={"top"} width={"400"}>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        else{
            return(
                <div>
                    <table width="600">
                        <tbody>
                        <tr>
                            <td valign="top" width="200">
                                <h1 align={"center"}>Search</h1>
                                    <h2 align={"center"}>
                                        <input onChange={this.updateForm} value={this.state.photoDescription}/>
                                        <button align={"center"} onClick={this.searchPhoto}>Search</button>
                                    </h2>
                                <ol>
                                    {
                                        this.state.photos.map(photo =>
                                            <li onClick={() => this.selectPhoto(photo)} key={photo.id}>
                                                <br/>
                                                <h3>
                                                <img src={photo.urls.full} width={200}/>
                                                </h3>
                                                <h4 bold={"true"}>{"Description: "}</h4>
                                                <em>{photo.alt_description}</em>
                                                <br/>
                                            </li>
                                        )
                                    }
                                </ol>
                            </td>
                            <td valign={"top"} width={"400"}>
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
    };
}

export default PhotoSearchComponent;