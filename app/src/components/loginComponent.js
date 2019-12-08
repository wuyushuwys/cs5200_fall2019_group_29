import React, {Component} from 'react';

class loginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.dismissError = this.dismissError.bind(this);

    }

    dismissError() {
        this.setState({error: ''});
    }

    handleLogin(event) {
        event.preventDefault();

        if (!this.state.username) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }

        return this.setState({error: ''});
    }

    handleUserChange(event) {
        this.setState({
            username: event.target.value,
        });
    };

    handlePassChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    userLogin = () => {
        console.log('username:' + this.state.username + " password:" + this.state.password)

    }

    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)

        return (
            <div className="Login">
                <table border={"1"} width={"300"}>
                    <tbody>
                    <tr><th height={"100"}><h1 align={"center"}>User Interface</h1></th></tr>
                    <tr align={"left"}>
                        <td>
                            <form onSubmit={this.handleLogin}>
                                {
                                    this.state.error &&
                                    <h3 data-test="error" onClick={this.dismissError}>
                                        <button onClick={this.dismissError}>✖</button>
                                        {this.state.error}
                                    </h3>
                                }
                                <fieldset>
                                    <legend>Login</legend>
                                    <label>Username</label>
                                    <input type="text" data-test="username" value={this.state.username}
                                           onChange={this.handleUserChange}/>
                                    <label>Password</label>
                                    <input type="password" data-test="password" value={this.state.password}
                                           onChange={this.handlePassChange}/>
                                    <br/>
                                    <button onClick={this.userLogin}>Login</button>
                                </fieldset>
                            </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default loginComponent;