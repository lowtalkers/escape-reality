import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';


import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const fecha = require('fecha');
const vex = require('vex-js');

vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = 'vex-theme-os';

let fileName = '';
let filePath = '';
let picDescrip = '';
let currentImgs = [];

const getAllPhotos = () => {
  // console.log('Trying to get topPics ...');
  $.get({
    url: '/topPics',
    success: (data) => {
      // console.log(data, data.length);
    },
    error: (error) => {
      console.error('error in get upload', error);
      $('.error').show();
    },
  });
};

const uploadFile = (props) => {
  $(function () {
    const imageIsLoaded = e => {
      $('#myImg').attr('src', e.target.result);
      filePath = e.target.result;

      if (!currentImgs.includes(fileName)) {
        currentImgs.push(fileName);
        props.uploadBar();
        $.post({
          url: '/upload',
          data: JSON.stringify({
            fileName: fileName,
            filePath: filePath,
            description: picDescrip
          }),
          contentType: 'application/json',
          success: data => {
            props.uploadBar();
            // console.log('Found user\'s uploaded photo from DB', data);
            $('#profilePicUp').val('');
            vex.dialog.alert('Uploaded!');
            $('button.vex-dialog-button-primary.vex-dialog-button.vex-first').click(() => window.location.reload());
          },
          error: error => {
            console.error('error in get upload', error);
            $('.error').show();
          },
        });
      }
    };

    $('#fileUp').change(function () {
      // console.log('file ATTEMPT');
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        picDescrip = $('#description').val();
        fileName = this.files[0].name;
        // console.log(fileName);
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });

    $('#profilePicUp').change(function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        // picDescrip = $('#description').val();
        fileName = this.files[0].name;
        // console.log(fileName);
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
};

const signOut = () => {
  // console.log('in sign out function');
  $.get({
    url: '/signOut',
    success: (data) => {
      // console.log(data);
      window.location.reload();
    },
    error: (error) => {
      console.error('error in get bookmarks', error);
      $('.error').show();
    },
  });
};

const styles = {
  button: {
    margin: 12,
    fontFamily: 'Orbitron !important',
    backgroundColor: '#e8e8e8',
    color: 'black !important'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  exploreButton: {
    fontFamily: 'Orbitron',
    color: 'white',
    top: '25%',
    left: '15%',
    // position: 'absolute'
  },
};

const style = {
  margin: 12,
};

const backgroundStyle = {
  // backgroundImage: 'url("http://i.imgur.com/uTYax11.jpg")',
  // backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  // backgroundPosition: '50% 50%',
  backgroundSize: 'cover',
  position: 'fixed',
  flex: 1,
  height: '100%',
  width: '100%',
}

const overlayStyle = {
  // position: 'fixed',
  top: '50%',
  left: '25%',
}

//     <div style={backgroundStyle}>

export default props => {
  uploadFile(props);

  return (
    <div>

      <img 
        style={backgroundStyle}
        src={'http://i.imgur.com/1ZEHnrH.jpg'}
      />

      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Toolbar >
          <ToolbarGroup>
            <Avatar src={props.profilePic} style={{right: '15%'}} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle className="fancyText" text={"Welcome, " + props.currentUser} style={{ top: '-10px', color: 'white'}}/>
          </ToolbarGroup>

        </Toolbar>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <LinearProgress color='#FF3D00' className={props.shouldHide ? 'hidden' : ''} mode="indeterminate" />
        </MuiThemeProvider>

        <h1 className="centerText" style={{color: 'white', top: '15px',  position: 'absolute', width:'100%', textAlign: 'center', fontSize: '100px'}}> Immerse</h1>

        <div className="centerButtons">
        <Link to="/lobby">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RaisedButton buttonStyle={styles.exploreButton} label="Explore" primary={true}  />
        </MuiThemeProvider>
        </Link>

        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RaisedButton
        label="Upload"
        labelPosition="before"
        style={styles.button}
        containerElement="label"
        buttonStyle={styles.exploreButton}>
        <input id="fileUp" type="file" style={styles.exampleImageInput} />
        </RaisedButton>
        </MuiThemeProvider>
        </div>

        <br/>
        <br/>
        <br/>
        <div className="centerButtons">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
          <FlatButton label="Sign Out" labelStyle={styles.exploreButton} onClick={() => { signOut(); }} />
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
};

/*
        <input type='file' id='profilePicUp' />
 */