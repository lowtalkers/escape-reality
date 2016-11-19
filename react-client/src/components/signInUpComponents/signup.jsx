import React from 'react';
import { Link, withRouter } from 'react-router';

export default props => (

  <div className="signup">
    <h1> Escape </h1>
    <div className="signintitle"> Signup </div>
    <label htmlFor="email"> Email </label>
    <input type="text" id="email" name="email" onChange={event => props.onEmailChange(event)} />
    <label htmlFor="password"> Password </label>
    <input type="password" id="password" name="password" onChange={event => props.onPasswordChange(event)} />
    <input type="button" id="signup" value="Signup" onClick={props.submitFn} />
    Already have an account?
    <Link to="/signin"> Sign in here</Link>
  </div>
);
