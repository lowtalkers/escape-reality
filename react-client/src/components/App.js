/**
 * @file Manages the app component.
 */

import AFRAME from 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';


import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import Plane from './Plane';
import Lobby from './Lobby';
import SF from './SF';
import Louvre from './Louvre';
import Berlin from './Berlin';
import Milan from './Milan';
import Rome from './Rome';
import Hack from './Hack';
import TextPlane from './TextPlane';

import SignUp from './signInUpComponents/signup.jsx';
import SignIn from './signInUpComponents/signin.jsx';

import Dashboard from './Dashboard.js';
import Bookmarks from './Bookmarks.js';
import Home from './Home.js';
import Image from './Image.js';


/**
 * Creates a new App component.
 * @class
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      pics: []
    };
  }

   /**This function is used to enforce the board rules and changes the class of currently selected letters for UI.
    * @param {object} event click event object
    * @returns {boolean} true or false if rules are followed
    */

  getParagraph(allTitles, setStateParagraph) {
    const result = {};
    const fetch = (title, idx, getNextParagraph) => {
      $.get({
        url: '/getWiki?exactWikiTitle=' + title,
        success: (data) => {
          console.log('Success fetch wiki paragraph', data);
          result[allTitles[idx]] = data;
          getNextParagraph();
        },
        error: (error) => {
          console.error('error in fetch paragraph', error);
          $('.error').show();
        }
      });
    };

    const recurse = (titleIndex) => {
      if (titleIndex === allTitles.length) {
        setStateParagraph(result);
        return result;
      }
      fetch(allTitles[titleIndex], titleIndex, () => {
        recurse(titleIndex + 1);
      });
    };
    recurse(0);
  }


  onEmailChange(event) {
    this.setState({ email: event.target.value });
    // console.log(this.state.email)
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  getAllPhotos() {
    $.get({
      url: '/topPics',
      success: (data) => {
        console.log(data);
        this.setState({pics: data})
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      },
    });
  }

  componentDidMount () {
    this.getAllPhotos();
  }

  /** This function when invoked will submit email and password. */
  submitFn() {
    /** Grab email and password values from fields */
    const email = this.state.email;
    const password = this.state.password;
    console.log(email);
    /** Submit email and password for verification */
    $.post({
      url: this.props.router.location.pathname,
      contentType: 'application/json',
      data: JSON.stringify({email: email, password: password}),
      success: (data) => {
        console.log('Success!!!!!', data, data.auth);
        if (data.auth) {
          this.props.router.replace('/dashboard');
        } else if (data === 'User exists!') {
          console.log('User exists!');
        }
      },
      error: (error) => {
        console.error(error);
        $('.error').show();
      },
    });
  }

  render () {
    let self = this;
    var vrView;
    const images = this.state.pics.map((pic) => {
      var imageName = pic.title.split('.')[0]
      var resizedImageLink = 'https://s3.amazonaws.com/vrpics/resized-' + imageName
                    return (
                      <div>
                      <img id={imageName}
                      crossOrigin="anonymous" 
                      src={pic.imageLink} />
                      <img id={'resized-' + imageName}
                      crossOrigin="anonymous" 
                      src={resizedImageLink} />
                      </div>
                    )
                  });
    if (this.props.router.location.pathname.indexOf('/signup') >= 0) {
      return (
        <SignUp
        onEmailChange={this.onEmailChange.bind(this)}
        onPasswordChange={this.onPasswordChange.bind(this)}
        submitFn={this.submitFn.bind(this)}
        />
      );
    } else if (this.props.router.location.pathname.indexOf('/signin') >= 0) {
      return (
          <SignIn
          onEmailChange={this.onEmailChange.bind(this)}
          onPasswordChange={this.onPasswordChange.bind(this)}
          submitFn={this.submitFn.bind(this)}
          />
        );
    } else if (this.props.router.location.pathname.indexOf('/dashboard') >= 0) {
      return <Dashboard />

    } else {
      if (this.props.router.location.pathname.indexOf('/lobby') >= 0) {
        vrView = (
            <Home
            router={this.props.router}
            pics={this.state.pics} />
          );
      } else {
        vrView = <Image router={this.props.router} /> 
      } 
        /*
          For development, we turn off fusing cursor (too slow) to allow clicking
          For deployment, we turn on fusing cursor (so mobile phones can gaze to "click")

              <a-cursor
                fuse="true" fuseTimeout="800"
                animation__fuse="property: scale; easing: easeOutExpo; startEvents: stateadded; from: 7 7 7; to: 1 1 1; dur: 2000"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material="color: #61ffff; shader: flat"
              >
              </a-cursor>
         */

      return (
          <a-scene canvas="height: 100; width: 100">
            <Camera>
              <a-cursor
                animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material="color: #61ffff; shader: flat">
              </a-cursor>
            </Camera>


            <a-assets>

              {images}
              <img id="lobby-_1" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/lr2.jpg" />

              <img id="close" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/icon.png" />
              <img id="commentStart" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Nov24%2C2016start.png" />
              <img id="commentStop" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Nov24%2C2016stop.png" />
              <img id="like" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/resized-Nov27,2016like.png" />

              <img id="bookmark" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/plus-hi.png" />
              <img id="exit" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/exit.png" />

            </a-assets>
            {vrView}
          </a-scene>
        );
    }
  }
}


export default withRouter(App, { withRef: true });


