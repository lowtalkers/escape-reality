import React from 'react';
import { Link, withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  fontFamily: 'Orbitron'
};

export default props => (

  <div className="signup">
    <h1 className="centerText"> ImmerseVR </h1>

    <div className="centerButtons">
    <MuiThemeProvider muiTheme={getMuiTheme()}>
     <TextField
      hintText="First Name Field"
      floatingLabelText="First Name"
      onChange={event => props.onFirstChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <TextField
      hintText="Last Name Field"
      floatingLabelText="Last Name"
      onChange={event => props.onLastChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
   
    <TextField
      hintText="Email Field"
      floatingLabelText="Email"
      onChange={event => props.onEmailChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      onChange={event => props.onPasswordChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <br/>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <RaisedButton buttonStyle={style} label="Sign Up" primary={true} onClick={props.submitFn} />
    </MuiThemeProvider>

    <br/>
    <br/>

    <div>
        <p className="fancyText"> Already have an account? </p>
        <Link to="/signin" className="fancyText"> Sign in here</Link>
    </div>
    </div>


    {/*}
    <label htmlFor="email"> Email </label>
    <input type="text" id="email" name="email" onChange={event => props.onEmailChange(event)} />
    <label htmlFor="password"> Password </label>
    <input type="password" id="password" name="password" onChange={event => props.onPasswordChange(event)} />
    <input type="button" id="signin" value="Signin" onClick={props.submitFn} />
    Don't have an account?

    */}

  </div>
);

