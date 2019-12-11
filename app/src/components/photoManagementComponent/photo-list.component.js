import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PhotoTableRow from "./PhotoTableRow";

export default class PhotoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            photos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/photos/')
            .then(res => {
                this.setState({
                    photos: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.photos.map((res, i) => {
            return <PhotoTableRow obj={res} key={i}/>;
        });
    }

    render() {
        return (<div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={100}><h2> Photos</h2></td>
                    </tr>
                    <tr>
                        <th>Author ID</th>
                        <th>Photo ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        )
    }

}