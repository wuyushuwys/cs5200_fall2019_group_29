import React from 'react'
import PhotoSearchComponent from "./PhotoSearchComponent";
import UserInterfaceComponent from "./UserInterfaceComponent";
import UserManageInterfaceComponent from "./UserManageInterfaceComponent";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Button} from 'react-bootstrap'


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
            error: '',
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

    userLogin = () => this.setState({
        userProfile: {
            username: this.state.tmp_username,
            password: this.state.tmp_password,
            type: this.state.userProfile.type,
        }
    })

    adminLogin = () => this.setState({
        userProfile: {
            username: this.state.tmp_username,
            password: this.state.tmp_password,
            type: this.state.userProfile.type,
            adminKey: this.state.tmp_adminKey,
        }
    })

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
    })

    userSignUp = () => {
        console.log(JSON.stringify(this.state))
    }


    renderHomepage() {
        const user_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== ''
        const admin_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== '' && this.state.userProfile.adminKey !== ''
        if (this.state.userProfile.type === "Guest") {
            return (
                <tr>
                    <td>
                        <PhotoSearchComponent/>
                    </td>
                    {/*<th valign={"top"}>*/}
                    {/*    <UserInterfaceComponent user={this.state.userProfile}/>*/}
                    {/*</th>*/}
                </tr>
            )
        } else if (this.state.userProfile.type === "User" && user_credential) {
            return (
                <tr>
                    <th>
                        <PhotoSearchComponent/>
                    </th>
                    <th valign={"top"}>
                        <UserInterfaceComponent user={this.state.userProfile}/>
                    </th>
                </tr>
            )
        } else if (this.state.userProfile.type === 'Administrator' && admin_credential) {
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
                                <label>Username: </label>
                                <input value={this.state.regUsername} onChange={this.regUsernameChange}/>
                                <br/>
                                <label>Password: </label>
                                <input value={this.state.regPassword} onChange={this.regPasswordChange}/>
                                <br/>
                                <label>First Name: </label>
                                <input value={this.state.regFirstName} onChange={this.regFirstNameChange}/>
                                <br/>
                                <label>Last Name: </label>
                                <input value={this.state.regLastName} onChange={this.regLastNameChange}/>
                                <br/>
                                <label>Gender: </label>
                                <input value={this.state.regGender} onChange={this.regGenderChange}/>
                                <br/>
                                <label>Date Of Birth: </label>
                                <input value={this.state.regDataOfBirth} onChange={this.regDataOfBirthChange}/>
                                <br/>
                                <label>Bio: </label>
                                <input value={this.state.regBio} onChange={this.regBioChange}/>
                                <br/>
                                <label>Administrate Key: </label>
                                <input value={this.state.regAdminKey} onChange={this.regAdminKeyChange}/>
                                <br/>
                                <Button onClick={this.userSignUp}>Sign Up</Button>
                                <Button onClick={this.dismissState}>Back</Button>
                            </fieldset>
                        </form>
                    </td>
                </tr>
            )
        }
    }


    render() {
        console.log(this.state)
        return (
            <Router>
                <div>
                    <table border={"1"} width={"1200"}>
                        <thead>
                        <tr>
                            <td colSpan='3'>
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