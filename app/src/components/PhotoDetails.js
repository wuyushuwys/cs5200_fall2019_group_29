import React from 'react'

class PhotoDetails extends React.Component {
    
    render() {
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PhotoDetails;