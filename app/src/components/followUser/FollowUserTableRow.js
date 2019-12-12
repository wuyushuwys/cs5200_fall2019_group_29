import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class FollowUserTableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            username: this.props.user.username,
            password: this.props.user.password,
        };
        this.followUser = this.followUser.bind(this);
        this.findUserByCredential = this.findUserByCredential.bind(this)
    }

    componentDidMount() {
        this.findUserByCredential(this.state.username, this.state.password).then()
    }

    findUserByCredential = (username, password) =>
        axios.get(`http://localhost:4000/users/${username}/${password}`)
            .then(res => {
                this.setState({
                    userId: res.data[0]._id,
                });
            })
            .catch((error) => {
                console.log(error);
            })

    followUser = async (e) => {

        e.preventDefault()
        const followObject = {
            follower: this.state.userId,
            followed: this.props.obj._id,
        }

        axios.post('http://localhost:4000/follows/create/', followObject)
            .then((res) => {
                console.log('Follow successfully!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.firstName}</td>
                <td>{this.props.obj.lastName}</td>
                <td>{this.props.obj.username}</td>
                <td>
                    <Button onClick={this.followUser} size="sm">Follow</Button>
                </td>
            </tr>
        )
    }
}

export default FollowUserTableRow