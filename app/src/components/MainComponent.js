import React from 'react'
import PhotoSearchComponent from "./PhotoSearchComponent";
import UserInterfaceComponent from "./UserInterfaceComponent";

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
        userProfile: {
            username: '',
            password: '',
            adminKey: '',
            type: '',
        },
        registration: false,
    })

    userSignUp = () => {
        console.log(JSON.stringify(this.state))
    }


    renderHomepage() {
        const user_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== ''
        const admin_credential = this.state.userProfile.username !== '' && this.state.userProfile.password !== '' && this.state.userProfile.adminKey !== ''
        if (this.state.userProfile.type === "Guest" || user_credential || admin_credential) {
            return (
                <tr>
                    <th>
                        <PhotoSearchComponent/>
                    </th>
                    <th valign={"top"}>
                        <UserInterfaceComponent user={this.state.userProfile}/>
                    </th>
                    <th></th>
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
                                    <button onClick={this.setUserType}>Administrator</button>
                                </th>
                                <th>
                                    <button onClick={this.setUserType}>User</button>
                                </th>
                                <th>
                                    <button onClick={this.setUserType}>Guest</button>
                                </th>
                                <th>
                                    <button onClick={this.registerUser}>Register</button>
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
                                    <button onClick={this.dismissError}>✖</button>
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
                                <button onClick={this.userLogin}>Login</button>
                                <button onClick={this.dismissState}>Back</button>
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
                                    <button onClick={this.dismissError}>✖</button>
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
                                <button onClick={this.adminLogin}>Login</button>
                                <button onClick={this.dismissState}>Back</button>
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
                                    <button onClick={this.dismissError}>✖</button>
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
                                <button onClick={this.userSignUp}>Sign Up</button>
                                <button onClick={this.dismissState}>Back</button>
                            </fieldset>
                        </form>
                    </td>
                </tr>
            )
        }
    }


    render() {
        return (
            <div>
                <table border={"1"} width={"1000"}>
                    <thead>
                    <tr>
                        <td colSpan='3'>
                            <h1 align="center">Photo Share App</h1>
                            <p align={"center"}>
                                <button onClick={this.dismissState}>Back to Home</button>
                            </p>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderHomepage()}
                    </tbody>
                </table>
            </div>
        )
    }
    ;
}

export default MainComponent;