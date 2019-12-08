import React from 'react'
import PhotoSearchComponent from "./PhotoSearchComponent";
import UserInterfaceComponent from "./UserInterfaceComponent";

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount() {
        // fetch("http://localhost:4000/api/photos")
        //     .then(response => response.json())
        //     .then(photos => this.setState({
        //         likedMovies: photos
        //     }))

    }


    render() {


        return (
            <div>
                <table border={"1"}>
                    <thead>
                    <tr>
                        <td colSpan='3'>
                            <h1 align="center">Photo Share App</h1>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>

                            <PhotoSearchComponent width={"600"}/>
                        </th>
                        <th valign={"top"}>
                            <UserInterfaceComponent/>
                        </th>
                        <th></th>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    };
}

export default MainComponent;