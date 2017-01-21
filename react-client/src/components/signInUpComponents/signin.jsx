import React from 'react';
import { Link, withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  fontFamily: 'Orbitron'
};

const backgroundStyle = {
  backgroundSize: 'cover',
  position: 'fixed',
  flex: 1,
  height: '100%',
  width: '100%',
}

export default props => (

  <div className="signin">

    <img 
      style={backgroundStyle}
      src={'http://i.imgur.com/1ZEHnrH.jpg'}
    />

    <div>
      <h1 className="centerText" style={{color: 'white', top: '15px', position: 'absolute', width:'100%', textAlign: 'center', fontSize: '100px'}}> Immerse </h1>

      <div className="centerButtons" style={{top: '100px', position: 'absolute', left: '25.5%'}}>
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
          <RaisedButton buttonStyle={style} label="Sign In" primary={true} onClick={props.submitFn} />
        </MuiThemeProvider>

        <br/>
        <br/>

        <div>
            <p className="fancyText"> No account yet? </p>
            <Link to="/signup" className="fancyText"> Sign up here</Link>
        </div>
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
