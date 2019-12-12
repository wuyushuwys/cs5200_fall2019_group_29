import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UserTableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: {},
        }
        this.deleteFollowed = this.deleteFollowed.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/users/${this.props.obj.followed}`)
            .then(res => {
                this.setState({
                    followed: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }




    deleteFollowed = async (e) => {

        e.preventDefault()

        axios.delete('http://localhost:4000/follows/delete/'+this.props.obj._id)
            .then((res) => {
                console.log('Follow Delete!')
            }).catch((error) => {
            console.log(error)
        })
    }


    render() {
        return (
            <tr>
                <td>{this.state.followed.firstName}</td>
                <td>{this.state.followed.lastName}</td>
                <td>{this.state.followed.username}</td>
                <td>
                    <Button onClick={this.deleteFollowed} size="sm" variant="danger">Unfollow</Button>
                </td>
            </tr>
        )
    }
}