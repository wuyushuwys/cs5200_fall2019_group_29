import React from 'react'

class CollectionDetails extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    render() {
        return (
            <div>
                <table border={"1"} width={390}>
                    <tbody>
                    <tr align={'center'}>
                        <td><h2>Collection Details</h2></td>
                    </tr>

                    <tr>
                        <td>
                            <p>Title: <em>{this.props.collection.title}</em></p>
                            <p><strong>Published at:</strong>
                                <em>{String(this.props.collection.published_at).substr(0, 10)}</em>
                            </p>
                            <p><strong>Created by: </strong>{this.props.collection.user.name}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                this.props.collection.preview_photos.map(photo =>
                                <li onClick={() => this.props.selectPhoto(photo)}
                                    key={photo.id}
                                    style={{listStyleType: "none"}}>
                                    <img src={photo.urls.full} width="380" alt={photo.id}/>
                                </li>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CollectionDetails;