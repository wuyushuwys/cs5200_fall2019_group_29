import React from 'react'
import PhotoDetails from "./PhotoDetails";
import CollectionDetails from "./CollectionDetails";

// import LikedMovies from "./LikedMovies";

class PhotoSearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            photoDescription: 'database',
            selectedPhoto: {},
            selectedPhotoId: '',

            collections: [],
            collectionDescription: 'Boston',
            selectedCollection: {},

            userProfile: this.props.user,

        }
    }

    // http://www.omdbapi.com/?s=batman&apikey=4a249f8d
    componentDidMount() {
        // fetch("http://localhost:4000/api/photos")
        //     .then(response => response.json())
        //     .then(photos => this.setState({
        //         likedMovies: photos
        //     }))

        fetch(`https://api.unsplash.com/search/photos?per_page=12&query=database&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())
            .then(results => this.setState({
                photos: results.results
            }))

        fetch(`https://api.unsplash.com/search/collections?per_page=5&query=Boston&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())
            .then(results => this.setState({
                collections: results.results
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

    searchCollection = () => {
        console.log('search collection: ' + this.state.collectionDescription)
        this.findCollectionByDescription(this.state.collectionDescription)
            .then(results => this.setState({
                collections: results.results
            }))
    }


    findCollectionByDescription = collectionDescription =>
        fetch(`https://api.unsplash.com/search/collections?per_page=5&query=${collectionDescription}&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    findPhotoByDescription = photoDescription =>
        fetch(`https://api.unsplash.com/search/photos?per_page=12&query=${photoDescription}&client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    findPhotoById = id =>
        fetch(`https://api.unsplash.com/photos/${id}?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    findCollectionById = id =>
        fetch(`https://api.unsplash.com/collections/${id}?client_id=066cb3e68a925378879d54c9498d91848faacac1484529cc1759cf7dfe2a32b3`)
            .then(response => response.json())

    updatePhotoForm = event =>
        this.setState({photoDescription: event.target.value})


    updateCollectionForm = event =>
        this.setState({collectionDescription: event.target.value})


    selectPhoto = photo => {
        this.findPhotoById(photo.id)
            .then(photo => this.setState({
                selectedPhoto: photo,
            }))
        if (this.props.user.type !== 'Guest')
            this.props.handleSelectedPhotoId(photo.id)
    }


    selectCollection = collection =>
        this.findCollectionById(collection.id)
            .then(collection => this.setState({selectedCollection: collection}))

    render() {

        const photoDetail = Object.keys(this.state.selectedPhoto).length === 0 ? <></> :
            < PhotoDetails photo={this.state.selectedPhoto}/>;
        const collectionDetails = Object.keys(this.state.selectedCollection).length === 0 ? <></> :
            <CollectionDetails collection={this.state.selectedCollection} selectPhoto={this.selectPhoto}/>;

        return (
            <div>
                <table border={"1"}>
                    <tbody>
                    <tr>
                        <th height={"100"} width={"250"}>
                            <table align={'center'}>
                                <tbody>
                                <tr>
                                    <td>
                                        <h2>Search Photo</h2>
                                        <input onChange={this.updatePhotoForm} value={this.state.photoDescription}/>
                                        <button align={"center"} onClick={this.searchPhoto}>Search</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </th>
                        <th height={"100"}><h1 align={"center"}>Details</h1></th>
                        <th height={"100"} width={'250'}>
                            <table align={'center'}>
                                <tbody>
                                <tr>
                                    <td align={"center"}>
                                        <h2>Search Collection</h2>
                                        <input onChange={this.updateCollectionForm}
                                               value={this.state.collectionDescription}/>
                                        <button align={"center"} onClick={this.searchCollection}>Search</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr align={"center"} valign={'top'}>
                        <td>
                            <table border={'true'} valign={'top'}>
                                <tbody>
                                <tr align={"center"}>
                                    <td>Photo Key Words<br/><font color={"red"}>{this.state.photoDescription}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {
                                            this.state.photos.map(photo =>
                                                <li onClick={() => this.selectPhoto(photo)} key={photo.id}
                                                    style={{listStyleType: "none"}}>
                                                    <img src={photo.urls.small} width="250" alt={photo.alt_description}/>
                                                </li>
                                            )
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td valign={"top"}>
                            <table width={"400"}>
                                <tbody>
                                <tr>
                                    <td>{photoDetail}</td>
                                </tr>
                                <tr>
                                    <td>{collectionDetails}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table border={'true'} valign={'top'}>
                                <tbody>
                                <tr align={"center"}>
                                    <td>Collection Key Words<br/><font
                                        color={"red"}>{this.state.collectionDescription}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border={'true'}>
                                            <tbody>
                                            {
                                                this.state.collections.map(collection =>
                                                    <tr onClick={() => this.selectCollection(collection)}
                                                        key={collection.id} style={{listStyleType: "none"}}>
                                                        <td align={"center"}>
                                                            {collection.title}<br/>
                                                            <img src={collection.cover_photo.urls.small}
                                                                 width="250" alt={collection.title}/>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        {/*<td>*/}
                        {/*    <LikedMovies*/}
                        {/*        likedMovies={this.state.likedMovies}/>*/}
                        {/*</td>*/}
                    </tr>
                    </tbody>
                </table>
            </div>)

    };
}

export default PhotoSearchComponent;