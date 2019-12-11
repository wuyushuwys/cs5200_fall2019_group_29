import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CommentTableRow from "./CommentTableRow";
export default class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/comments/')
            .then(res => {
                this.setState({
                    comments: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.comments.map((res, i) => {
            return <CommentTableRow obj={res} key={i}/>;
        });
    }

    render() {
        return (<div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={100}><h2> Comments</h2></td>
                    </tr>
                    <tr>
                        <th>User ID</th>
                        <th>Photo ID</th>
                        <th>Content</th>
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
