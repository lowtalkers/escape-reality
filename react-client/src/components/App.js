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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      planeColor: ['red', 'blue', 'green', 'black'],
      colorIndex: 0,
      email: '',
      password: ''
    };
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  getParagraph(allTitles, setStateParagraph) {
    const result = {};
    const fetch = (title, idx, getNextParagraph) => {
      $.get({
        url: '/getWiki?exactWikiTitle=' + title,
        success: (data) => {
          console.log('Success fetch wiki paragraph', data);
          result[allTitles[idx]] = JSON.parse(data);
          getNextParagraph();
        },
        error: (error) => {
          console.error('error in fetch paragraph', error);
          $('.error').show();
        },
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

  componentWillMount() {
  }

  componentDidMount() {
  }

  showGenericPane() {
    return (
      <a-plane color="#CCC" height="20" width="20" ></a-plane>
    )
  }

  changePlaneColor() {
    console.log('Changing planeColor... colorIndex:', this.state.colorIndex, 'upcoming:', this.state.colorIndex + 1);
    if (this.state.colorIndex === 3) {
      this.setState({colorIndex: 0})
    } else {
      this.setState({colorIndex: this.state.colorIndex + 1})
    }
  }

  changeUrl() {
    if (this.state.urlIndex) {
      this.setState({url: this.state.url, urlIndex: !this.state.urlIndex});
    } else {
      this.props.router.push('/city');
    }
  }

  changeCity() {
    this.props.router.push('/sf/');
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
    // console.log(this.state.email)
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  submitFn() {
    /** Grab email and password values from fields */
    const email = this.state.email;
    const password = this.state.password;
    console.log(email)
    /** Submit email and password for verification */
    $.post({
      url: this.props.router.location.pathname,
      contentType: 'application/json',
      data: JSON.stringify({email: email, password: password}),
      success: (data) => {
        console.log('Success!!!!!', data);
        if (data.auth) {
          this.props.router.replace('/lobby');
        } else if (data === 'User exists!') {
          console.log('User exists!')
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

    if(this.props.router.location.pathname.indexOf('/signup') >= 0) {
      console.log(this.props.router.location.pathname.indexOf('/signup'))
      return (
        <SignUp
        onEmailChange={this.onEmailChange.bind(this)}
        onPasswordChange={this.onPasswordChange.bind(this)}
        submitFn={this.submitFn.bind(this)}
        />
      )
    } else if (this.props.router.location.pathname.indexOf('/signin') >= 0) {
        return (
          <SignIn
          onEmailChange={this.onEmailChange.bind(this)}
          onPasswordChange={this.onPasswordChange.bind(this)}
          submitFn={this.submitFn.bind(this)}
          />
        )

    } else {
        if(this.props.router.location.pathname.indexOf('/lobby') >= 0) {
          vrView = (
            <Lobby
            changePlaneColor={this.changePlaneColor.bind(this)}
            planeColor={self.state.planeColor}
            colorIndex={self.state.colorIndex}
            color={self.state.color}
            changeColor={this.changeColor.bind(this)}
            router={this.props.router}
            />
          )
        } else if (this.props.router.location.pathname.indexOf('/sf') >= 0) {
            vrView = (
              <SF
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}

              />
            )
        } else if (this.props.router.location.pathname.indexOf('/louvre') >= 0) {
            vrView = (
              <Louvre
              getParagraph={this.getParagraph.bind(this)}
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}
              />
            )
        } else if (this.props.router.location.pathname.indexOf('/berlin') >= 0) {
            vrView = (
              <Berlin
              getParagraph={this.getParagraph.bind(this)}
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}
              />
            )
        } else if (this.props.router.location.pathname.indexOf('/milan') >= 0) {
            vrView = (
              <Milan
              getParagraph={this.getParagraph.bind(this)}
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}
              />
            )
        } else if (this.props.router.location.pathname.indexOf('/rome') >= 0) {
            vrView = (
              <Rome
              getParagraph={this.getParagraph.bind(this)}
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}
              />
            )
        } else if (this.props.router.location.pathname.indexOf('/hr') >= 0) {
            vrView = (
              <Hack
              getParagraph={this.getParagraph.bind(this)}
              changePlaneColor={this.changePlaneColor.bind(this)}
              planeColor={self.state.planeColor}
              colorIndex={self.state.colorIndex}
              color={self.state.color}
              changeColor={this.changeColor.bind(this)}
              router={this.props.router}
              />
            )
        }
        return (
          <Scene >
            <Camera>
              <a-cursor
                fuse="true" fuseTimeout="800"
                animation__fuse="property: scale; easing: easeOutExpo; startEvents: stateadded; from: 7 7 7; to: 1 1 1; dur: 2000"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material="color: #61ffff; shader: flat"
              >
              </a-cursor>
            </Camera>


            <a-assets>
              <img id="city-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
              <img id="cubes-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
              <img id="sechelt-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" />
              <img id="lobby" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/test3.jpg" />
              <img id="sf" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/union-square-franco_4500.jpg" />
              <img id="louvre" crossOrigin="anonymous" src="https://c2.staticflickr.com/6/5688/21597873406_8f4021b4b4_k.jpg" />
              <img id="berlin" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/germany.jpg" />
              <img id="milan" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/milan360.jpg" />
              <img id="close" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/icon.png" />
              <img id="bookmark" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/plus-hi.png" />
              <img id="rome" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/italy-rome-piazza-navona_2000.jpg" />
              <img id="hr" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/hr.JPG" />
              <img id="hrlogo" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/HR.png" />

              <img id="paris" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Paris.jpg" />
              <img id="sf1" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/SanFrancisco.jpg" />
              <img id="berlin2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Berlin.jpg" />
              <img id="seattle" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/seattle.png" />
              <img id="milan2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Milan.jpg" />
              <img id="rome2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Rome.jpg" />



            </a-assets>
            {vrView}
          </Scene>
        )
    }
  }
}


export default withRouter(App, { withRef: true });


