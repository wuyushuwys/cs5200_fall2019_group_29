import React from 'react'
import PhotoSearchComponent from "./PhotoSearchComponent";
import UserInterfaceComponent from "./UserInterfaceComponent";
import UserManageInterfaceComponent from "./UserManageInterfaceComponent";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Button} from 'react-bootstrap'
import axios from "axios";
import Form from 'react-bootstrap/Form'


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tmp_username: '',
            tmp_password: '',
            tmp_adminKey: '',
            registration: false,
            userProfile: {
                username: '',
                password: '',
                adminKey: '',
                type: '',
            },
            regFirstName: '',
            regLastName: '',
            regUsername: '',
            regPassword: '',
            regGender: '',
            regDataOfBirth: '',
            regType: '',
            regAdminKey: '',
            regBio: '',
            regUserType: '',
            error: '',
            selectedPhotoId: '',
            getUser: {},
            loginPrompt: false,
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleAdminKeyChange = this.handleAdminKeyChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.dismissError = this.dismissError.bind(this);

        this.regFirstNameChange = this.regFirstNameChange.bind(this);
        this.regLastNameChange = this.regLastNameChange.bind(this);
        this.regUsernameChange = this.regUsernameChange.bind(this);
        this.regPasswordChange = this.regPasswordChange.bind(this);
        this.regGenderChange = this.regGenderChange.bind(this);
        this.regDataOfBirthChange = this.regDataOfBirthChange.bind(this);
        this.regTypeChange = this.regTypeChange.bind(this);
        this.regAdminKeyChange = this.regAdminKeyChange.bind(this);
        this.regBioChange = this.regBioChange.bind(this);
        this.regUserTypeChange = this.regUserTypeChange.bind(this);

        this.handleSelectedPhotoId = this.handleSelectedPhotoId.bind(this);
    }

    regFirstNameChange = event =>
        this.setState({
            regFirstName: event.target.value,
        })

    regLastNameChange = event =>
        this.setState({
            regLastName: event.target.value,
        })

    regUsernameChange = event =>
        this.setState({
            regUsername: event.target.value,
        })

    regPasswordChange = event =>
        this.setState({
            regPassword: event.target.value,
        })

    regGenderChange = event =>
        this.setState({
            regGender: event.target.value,
        })

    regDataOfBirthChange = event =>
        this.setState({
            regDataOfBirth: event.target.value,
        })

    regTypeChange = event =>
        this.setState({
            regType: event.target.value,
        })

    regAdminKeyChange = event =>
        this.setState({
            regAdminKey: event.target.value,
        })

    regBioChange = event =>
        this.setState({
            regBio: event.target.value,
        })
    regUserTypeChange = event =>
        this.setState({
            regUserType: event.target.value,
        })

    dismissError() {
        this.setState({error: ''});
    }

    handleLogin(event) {
        event.preventDefault();

        if (!this.state.tmp_username) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.tmp_password) {
            return this.setState({error: 'Password is required'});
        }

        return this.setState({error: ''});
    }


    handleUsernameChange(event) {
        this.setState({
            tmp_username: event.target.value,
        });
    };

    handlePasswordChange(event) {
        this.setState({
            tmp_password: event.target.value,
        });
    }

    handleAdminKeyChange(event) {
        this.setState({
            tmp_adminKey: event.target.value,
        });
    }

    userLogin = async (e) => {
        e.preventDefault()
        await this.setState({
            userProfile: {
                username: this.state.tmp_username,
                password: this.state.tmp_password,
                type: this.state.userProfile.type,
            }
        })
        await axios.get(`http://localhost:4000/users/${this.state.userProfile.username}/${this.state.userProfile.password}`)
            .then(res => {
                this.setState({
                    getUser: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
        if (await this.state.getUser.length === 1) {
            return this.setState({
                loginPrompt: true,
            })
        } else
            return this.dismissState()
    }


    adminLogin = async () => {
        await this.setState({
            userProfile: {
                username: this.state.tmp_username,
                password: this.state.tmp_password,
                type: this.state.userProfile.type,
                adminKey: this.state.tmp_adminKey,
            },
        })
        await axios.get(`http://localhost:4000/users/${this.state.userProfile.username}/${this.state.userProfile.password}/${this.state.userProfile.adminKey}`)
            .then(res => {
                this.setState({
                    getUser: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
        if (await this.state.getUser.length === 1) {
            console.log(this.state.getUser[0])
            if (this.state.getUser[0].personType === 'Administrator')
                return this.setState({
                    loginPrompt: true,
                })
        } else
            return this.dismissState()
    }


    setUserType = event => {
        const type = event.target.innerHTML
        console.log(type)
        this.setState({
            userProfile: {
                username: '',
                password: '',
                type: type,
            },
        })
    }

    registerUser = event => {
        this.setState({
            registration: !this.state.registration,
        })
    }

    dismissState = () => this.setState({
        getUser: {},
        tmp_username: '',
        tmp_password: '',
        tmp_adminKey: '',
        registration: false,
        userProfile: {
            username: '',
            password: '',
            adminKey: '',
            type: '',
        },
        regFirstName: '',
        regLastName: '',
        regUsername: '',
        regPassword: '',
        regGender: '',
        regDataOfBirth: '',
        regType: '',
        regAdminKey: '',
        regBio: '',
        error: '',
        selectedPhotoId: '',
        loginPrompt: false,
    })

    userSignUp = async (e) => {
        e.preventDefault()
        const userObject = {
            firstName: this.state.regFirstName,
            lastName: this.state.regLastName,
            username: this.state.regUsername,
            gender: this.state.regGender,
            birthday: this.state.regDataOfBirth,
            personType: this.state.regUserType,
            adminKey: this.state.adminKey,
            password: this.state.regPassword,
        };

        await axios.post('http://localhost:4000/users/create', userObject)
            .then(res => console.log(res.data))
        await this.dismissState()

    }

    handleSelectedPhotoId = Id => this.setState({
        selectedPhotoId: Id,
    })


    renderHomepage() {
        // const user_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== ''
        // const admin_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== '' && this.state.userProfile.adminKey !== ''
        if (this.state.userProfile.type === "Guest") {
            return (
                <tr>
                    <th>
                        <PhotoSearchComponent user={this.state.userProfile}/>
                    </th>
                    <th valign={'top'}>
                        <h3 align={'center'}>Welcome Guest!</h3>
                        <h4>If you want to comment others photo or post you own, please sign in!</h4>
                    </th>
                </tr>

            )
        } else if (this.state.userProfile.type === "User" && this.state.loginPrompt) {
            return (
                <tr>
                    <th>
                        <PhotoSearchComponent handleSelectedPhotoId={this.handleSelectedPhotoId}
                                              user={this.state.userProfile}/>
                    </th>
                    <th valign={"top"}>
                        <UserInterfaceComponent user={this.state.userProfile}
                                                selectedPhotoId={this.state.selectedPhotoId}/>
                    </th>
                </tr>
            )
        } else if (this.state.userProfile.type === 'Administrator' && this.state.loginPrompt) {
            return (
                <tr>
                    <td height={100}>
                        <UserManageInterfaceComponent/>
                    </td>
                </tr>
            )
        }
        if (this.state.userProfile.type === "" && !this.state.registration) {
            return (
                <tr>
                    <td>
                        <table align={"center"}>
                            <tbody>
                            <tr align={"center"}>
                                <td colSpan={"4"}>Select Your User Type
                                    to <strong><em>Sign-In</em></strong> or <strong><em>Sign-Up</em></strong></td>
                            </tr>
                            <tr>
                                <th>
                                    <Button onClick={this.setUserType}>Administrator</Button>
                                </th>
                                <th>
                                    <Button onClick={this.setUserType}>User</Button>
                                </th>
                                <th>
                                    <Button onClick={this.setUserType}>Guest</Button>
                                </th>
                                <th>
                                    <Button onClick={this.registerUser}>Register</Button>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        } else if (this.state.userProfile.type === 'User') {
            return (
                <tr>
                    <td align={"center"}>
                        <form>
                            {
                                this.state.error &&
                                <h3 data-test="error" onClick={this.dismissError}>
                                    <Button onClick={this.dismissError}>✖</Button>
                                    {this.state.error}
                                </h3>
                            }
                            <fieldset>
                                <legend align={"center"}>Login</legend>
                                <label>Username:</label>
                                <input value={this.state.tmp_username} onChange={this.handleUsernameChange}/>
                                <br/>
                                <label>Password:</label>
                                <input value={this.state.tmp_password} onChange={this.handlePasswordChange}/>
                                <br/>
                                <Button onClick={this.userLogin}>Login</Button>
                                <Button onClick={this.dismissState}>Back</Button>
                            </fieldset>
                        </form>
                    </td>
                </tr>
            )
        } else if (this.state.userProfile.type === 'Administrator') {
            return (
                <tr>
                    <td align={"center"}>
                        <form>
                            {
                                this.state.error &&
                                <h3 data-test="error" onClick={this.dismissError}>
                                    <Button onClick={this.dismissError}>✖</Button>
                                    {this.state.error}
                                </h3>
                            }
                            <fieldset>
                                <legend align={"center"}>Login</legend>
                                <label>Username:</label>
                                <input value={this.state.tmp_username} onChange={this.handleUsernameChange}/>
                                <br/>
                                <label>Password:</label>
                                <input value={this.state.tmp_password} onChange={this.handlePasswordChange}/>
                                <br/>
                                <label>AdminKey:</label>
                                <input value={this.state.adminKey} onChange={this.handleAdminKeyChange}/>
                                <br/>
                                <Button onClick={this.adminLogin}>Login</Button>
                                <Button onClick={this.dismissState}>Back</Button>
                            </fieldset>
                        </form>
                    </td>
                </tr>
            )
        } else if (this.state.registration) {
            return (
                <tr>
                    <td align={"center"}>
                        <table width={300}>
                            <tbody>
                            <tr>
                                <td>
                                    <Form>
                                        {/*{*/}
                                        {/*    this.state.error &&*/}
                                        {/*    <h3 data-test="error" onClick={this.dismissError}>*/}
                                        {/*        <Button onClick={this.dismissError}>✖</Button>*/}
                                        {/*        {this.state.error}*/}
                                        {/*    </h3>*/}
                                        {/*}*/}

                                        <fieldset>
                                            <legend align={"center"}>Sign-Up</legend>
                                            <Form.Label>Username: </Form.Label>
                                            <Form.Control type="text" value={this.state.regUsername}
                                                          onChange={this.regUsernameChange}/>
                                            <Form.Label>Password: </Form.Label>
                                            <Form.Control type="text" value={this.state.regPassword}
                                                          onChange={this.regPasswordChange}/>
                                            <Form.Label>First Name: </Form.Label>
                                            <Form.Control type="text" value={this.state.regFirstName}
                                                          onChange={this.regFirstNameChange}/>
                                            <Form.Label>Last Name: </Form.Label>
                                            <Form.Control type="text" value={this.state.regLastName}
                                                          onChange={this.regLastNameChange}/>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control as="select" value={this.state.regGender}
                                                          onChange={this.regGenderChange}>
                                                <option></option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Others">Others</option>
                                            </Form.Control>
                                            <Form.Label>Date Of Birth: </Form.Label>
                                            <Form.Control type="text" value={this.state.regDataOfBirth}
                                                          onChange={this.regDataOfBirthChange}/>
                                            {/*<Form.Label>Bio: </Form.Label>*/}
                                            {/*<Form.Control type="text" value={this.state.regBio} onChange={this.regBioChange}/>*/}
                                            <Form.Label>Administrate Key: </Form.Label>
                                            <Form.Control type="text" value={this.state.regAdminKey}
                                                          onChange={this.regAdminKeyChange}/>
                                            <Form.Label> Type</Form.Label>
                                            <Form.Control as="select" value={this.state.regUserType}
                                                          onChange={this.regUserTypeChange}>
                                                <option></option>
                                                <option value="Administrator">Administrator</option>
                                                <option value="User">User</option>
                                                {/*<option value="Uploader">Uploader</option>*/}
                                            </Form.Control>
											<div>
                                            <Button onClick={this.userSignUp}>Sign Up</Button>
                                            <Button onClick={this.dismissState}>Back</Button>
											</div>
                                        </fieldset>
                                    </Form>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        }
    }

    render() {
        console.log(this.state.getUser[0])
        return (
            <Router>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td colSpan='100'>
                                <h1 align="center">Photo Share App</h1>
                                <p align={"center"}>
                                    <Link to={"/"} onClick={this.dismissState}>
                                        <Button onClick={this.dismissState}>Back to Home</Button>
                                    </Link>
                                </p>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderHomepage()}
                        </tbody>
                    </table>
                </div>
            </Router>
        )
    }
    ;
}

export default MainComponent;