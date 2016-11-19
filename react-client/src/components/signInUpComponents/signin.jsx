import React from 'react';
import { Link, withRouter } from 'react-router';

export default props => (

  <div className="signin">
    <h1> Escape </h1>
    <div className="signintitle"> Signin </div>
    <label htmlFor="email"> Email </label>
    <input type="text" id="email" name="email" onChange={event => props.onEmailChange(event)} />
    <label htmlFor="password"> Password </label>
    <input type="password" id="password" name="password" onChange={event => props.onPasswordChange(event)} />
    <input type="button" id="signin" value="Signin" onClick={props.submitFn} />
    Don't have an account?
    <Link to="/signup"> Sign up here</Link>
  </div>
);
