import React, {Component} from 'react';
import {MDBInput} from 'mdbreact';


class UserInterfaceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            comment: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.dismissError = this.dismissError.bind(this);

        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleComment = this.handleComment.bind(this)

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

    userLogin = () =>
        console.log('username:' + this.state.username + " password:" + this.state.password)


    handleCommentChange = event =>
        this.setState({comment: event.target.value})


    handleComment(event) {
        event.preventDefault();

        if (!this.state.username || !this.state.password) {
            return this.setState({error: 'Must Login'});
        }
        return this.setState({error: ''});
    }

    submitComment = () => console.log("Submit Comment: " + this.state.comment)

    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
        if (this.props.user.type === "Guest") {
            return (
                <div>
                    <h1>You are a guest!</h1>
                </div>);
        } else {
            return (
                <div className="Login">
                    <table border={"1"} width={"300"}>
                        <tbody>
                        <tr>
                            <th height={"100"}><h1 align={"center"}>User Interface</h1></th>
                        </tr>
                        <tr>
                            <td align={"left"}>
                                <fieldset>
                                    <legend align={"center"}>Current User Profile</legend>
                                    <li>Username: {this.props.user.username}</li>
                                    <li>User Type: {this.props.user.type}</li>
                                </fieldset>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <form onSubmit={this.handleComment}>
                                    <fieldset>
                                        <legend>Comment</legend>
                                        <MDBInput type='textarea' value={this.state.comment} rows={'5'}
                                                  placeholder={'Write'}
                                                  onChange={this.handleCommentChange} style={{width: "300px"}}/>
                                        <br/>
                                        <button onClick={this.submitComment}>Submit</button>
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                        <tr align={"left"}>
                            <td>
                                <fieldset>
                                    <legend align={"center"}>Other User</legend>
                                    <li>User1</li>
                                    <li>User2</li>
                                </fieldset>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default UserInterfaceComponent;