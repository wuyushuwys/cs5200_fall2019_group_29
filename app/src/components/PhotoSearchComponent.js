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

        fetch(`https://api.unsplash.com/search/photos?per_page=5&query=office&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
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
        fetch(`https://api.unsplash.com/search/photos?per_page=5&query=${photoDescription}&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
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
        // console.log(this.state.selectedPhoto)
        const photoDetail = Object.keys(this.state.selectedPhoto).length === 0 ? <></> :
            < PhotoDetails photo={this.state.selectedPhoto}/>
        return (
            <div>
                <table width="600" border={"1"}>
                    <tbody>
                    <tr>
                        <th height={"100"}>
                            <h1 align={"center"}>Search</h1>
                            <input onChange={this.updateForm} value={this.state.photoDescription}/>
                            <button align={"center"} onClick={this.searchPhoto}>Search</button>
                        </th>
                        <th height={"100"}><h1 align={"center"}>Photo Details</h1></th>
                    </tr>
                    <tr align={"center"}>
                        <td width="200">
                            {/*<input onChange={this.updateForm} value={this.state.photoDescription}/>*/}
                            {/*<button align={"center"} onClick={this.searchPhoto}>Search</button>*/}
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <ul>
                                        {
                                            this.state.photos.map(photo =>
                                                <li onClick={() => this.selectPhoto(photo)} key={photo.id}>
                                                    {/*<br/>*/}
                                                    <h3>
                                                        <img src={photo.urls.full} width={200}
                                                             alt={photo.alt_description}/>
                                                    </h3>
                                                    {/*<h4 bold={"true"}>{"Description: "}</h4>*/}
                                                    {/*<em>{photo.alt_description}</em>*/}
                                                    {/*<br/>*/}
                                                </li>
                                            )
                                        }
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td valign={"top"} width={"400"}>
                            {photoDetail}
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

    };
}

export default PhotoSearchComponent;