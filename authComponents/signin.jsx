/**
 * @file Manages the signin component.
 */

import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';


/**
 * Creates a new Signin Component.
 * @class
 */

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.submitFn = this.submitFn.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = {
      username: '',
      password: '',
    };
    //TODO: Remove token from local storage
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  /** componentDidMount() is invoked immediately after a component is mounted. This adds an event listener for the enter key on submit. If it records an enter, submit the form */

  componentDidMount() {

    /** Makes pressing enter on any input box click submit */
    $('input').each(function () {
      $(this).keypress((e) => {
        if (e.which === 13) {
          $('#signin').click();
        }
      });
    });
  }


  /** This function takes care of the submission process. It gets the values of the username/password and sends them to the server for verification and authentication */

  submitFn() {
    /** Grab username and password values from fields */
    const username = this.state.username;
    const password = this.state.password;

    this.setState({ username: '', password: '' });

    /** Submit username and password for verification */
    $.post({
      url: '',
      dataType: 'json',
      data: { username, password },
      success: (data) => {
        console.log('Success!!!!!', data);
        // TODO: Store data in local storage as session token
        this.props.router.push('/');
      },
      error: (error) => {
        console.error(error);
        $('.error').show();
      },
    });
  }

  render() {
    return (
      <div className="signin">
        <h1> Escape </h1>
        <div className="signintitle"> Signin </div>
        <label htmlFor="username"> Username </label>
        <input type="text" id="username" name="username" onChange={event => this.onUsernameChange(event)} />
        <label htmlFor="password"> Password </label>
        <input type="password" id="password" name="password" onChange={event => this.onPasswordChange(event)} />
        <input type="button" id="signin" value="Signin" onClick={this.submitFn} />
        Don't have an account?
        <Link to="/signup"> Sign up here</Link>
        <h2 className="error"> Invalid user or password! </h2>
      </div>
    );
  }
}
