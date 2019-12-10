import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeUserFirstName = this.onChangeUserFirstName.bind(this);
        this.onChangeUserLastName = this.onChangeUserLastName.bind(this);
        this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
        this.onChangeUserGender = this.onChangeUserGender.bind(this);
        this.onChangeUserBirthday = this.onChangeUserBirthday.bind(this);
        this.onChangePersonType = this.onChangePersonType.bind(this);
        this.onChangeAdminKey = this.onChangeAdminKey.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            gender: '',
            birthday: '',
            personType: '',
            adminKey: '',
            password: '',
        }
    }

    onChangeUserFirstName(e) {
        this.setState({firstName: e.target.value})
    }

    onChangeUserLastName(e) {
        this.setState({lastName: e.target.value})
    }


    onChangeUserUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangeUserGender(e) {
        this.setState({gender: e.target.value})
    }

    onChangeUserBirthday(e) {
        this.setState({birthday: e.target.value})
    }

    onChangePersonType(e) {
        this.setState({personType: e.target.value})
    }

    onChangeAdminKey(e) {
        this.setState({adminKey: e.target.value})
    }

    onChangeUserPassword(e) {
        this.setState({password: e.target.value})
    }


    onSubmit = async e => {
        e.preventDefault()

        const userObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            gender: this.state.gender,
            birthday: String(this.state.birthday).substr(0, 10),
            personType: this.state.personType,
            adminKey: this.state.adminKey,
            password: this.state.password,

        };

        axios.post('http://localhost:4000/users/create', userObject)
            .then(res => console.log(res.data))


        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            gender: '',
            birthday: '',
            personType: '',
            adminKey: '',
            // type:'',
            password: ''
        });
        // Redirect to Student List
        await this.props.history.push('/')
        // await window.location.reload(false)
    }


    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="FirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" value={this.state.firstName} onChange={this.onChangeUserFirstName}/>
                </Form.Group>

                <Form.Group controlId="LastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" value={this.state.lastName} onChange={this.onChangeUserLastName}/>
                </Form.Group>


                <Form.Group controlId="UserName">
                    <Form.Label> UserName</Form.Label>
                    <Form.Control type="text" value={this.state.username} onChange={this.onChangeUserUsername}/>
                </Form.Group>

                <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" value={this.state.gender} onChange={this.onChangeUserGender}>
                        <option></option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Others">Others</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Birthday">
                    <Form.Label> Birthday</Form.Label>
                    <Form.Control type="text" value={this.state.birthday} onChange={this.onChangeUserBirthday}/>
                </Form.Group>

                <Form.Group controlId="PersonType">
                    <Form.Label> Type</Form.Label>
                    <Form.Control as="select" value={this.state.personType} onChange={this.onChangePersonType}>
                        <option></option>
                        <option value="Administrator">Administrator</option>
                        <option value="User">User</option>
                        {/*<option value="Uploader">Uploader</option>*/}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="AdminKey">
                    <Form.Label> Administration Key</Form.Label>
                    <Form.Control type="text" value={this.state.adminKey} onChange={this.onChangeAdminKey}/>
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value={this.state.password} onChange={this.onChangeUserPassword}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Create User
                </Button>
            </Form>
        </div>);
    }
}
