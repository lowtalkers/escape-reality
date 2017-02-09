import React from 'react';
import { Link, withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  fontFamily: 'Orbitron'
};

const style2 = {
  fontFamily: 'Orbitron',
  color: 'white'
};

const backgroundStyle = {
  backgroundSize: 'cover',
  position: 'fixed',
  flex: 1,
  height: '100%',
  width: '100%',
};

export default props => (

  <div className="signin">

    <img
      style={backgroundStyle}
      src={'http://i.imgur.com/1ZEHnrH.jpg'}
    />

    {/* Preload (but don't display) the browser cache with UI images so that the follow-up VR scene loads faster */}
    <img src="https://s3.amazonaws.com/vrpics/lr2.jpg" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="https://s3.amazonaws.com/vrpics/ui-icons/icon-dashboard_512x512.png" style={{display: 'none'}} crossOrigin="anonymous"/>

    <img src="https://s3.amazonaws.com/vrpics/ui-icons/icon-home_512x512.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="https://s3.amazonaws.com/vrpics/ui-icons/icon-favorite_512x512.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="http://i.imgur.com/XTLYqU3.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="https://s3.amazonaws.com/vrpics/ui-icons/icon-mic_512x512.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="https://s3.amazonaws.com/vrpics/ui-icons/icon-mic-activated_512x512.png" style={{display: 'none'}} crossOrigin="anonymous"/>

    <img src="https://s3.amazonaws.com/vrpics/plus-hi.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="http://i.imgur.com/jRdxNpi.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img src="http://i.imgur.com/JmLIjXY.png" style={{display: 'none'}} crossOrigin="anonymous"/>


    <div>
      <h1 className="centerText" style={{color: 'white', top: '15px', position: 'absolute', width: '100%', textAlign: 'center', fontSize: '100px'}}> ImmerseVR</h1>

      <div className="centerButtons" style={{top: '100px', position: 'absolute', left: '25.5%'}}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          style={{color: 'white !important'}}
          onChange={event => props.onEmailChange(event)}
        />
        </MuiThemeProvider>
        <br />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          style={{color: 'white !important'}}
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
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <RaisedButton buttonStyle={style} label="Login As Guest" primary={true} onClick={() => props.toggleGuestLogin(props.submitFn)} />
            </MuiThemeProvider>
        </div>

        <br/>

        <div>
            <Link to="/signup" className="fancyText" style={{color: 'white'}}> Create an Account </Link>
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
