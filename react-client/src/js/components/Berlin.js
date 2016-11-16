import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import TextPlane from './Plane';

// var AFRAME = require("aframe-core");
// var draw = require("aframe-draw-component").component;
// var textwrap = require("aframe-textwrap-component").component;
// AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);
// let show = false;

class Berlin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      show: 'false',
      url: 'https://s3.amazonaws.com/vrpics/germany.jpg',
      backupUrl: 'https://s3.amazonaws.com/vrpics/germany.jpg',
      urlIndex: false,
      planeColor: ['red', 'blue', 'green', 'black'],
      colorIndex: 0
    };
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  componentWillMount() {
    console.log('Loading... Current state is:', this.state.show);
  }

  componentDidMount() {
    this.setState({show: 'true'});
    document.querySelector('Scene').enterVR();
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
      this.setState({url: this.state.backupUrl, urlIndex: !this.state.urlIndex});
    } else {
      this.setState({url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg', urlIndex: !this.state.urlIndex});
    }
  }

  render () {
    let self = this;
    return (
      <Scene auto-enter-vr>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>

        <a-assets>
          <img id="city-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
          <img id="cubes-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <img id="sechelt-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" />
        </a-assets>


          <Entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
            <Entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></Entity>
            <Entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></Entity>
            <Entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></Entity>
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{src: 'url(https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg)', opacity: 0.25}}
              position="-2 0.5 -8"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 3; height: 3"
              onClick={() => self.changeUrl()}
              material={{color: 'yellow', opacity: 0.25}}
              position="-10.54 2.38 1.17"
              rotation="0 80 0"
              visible="true">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              onClick={() => self.changePlaneColor()}
              material={{color: self.state.planeColor[self.state.colorIndex], opacity: 0.25}}
              position="2.5 -1 -4"
              rotation="-20 0 0">
          </Entity>

          <TextPlane />

        <a-sky id="image-360" radius="30" src={self.state.url}></a-sky>

        <Text
          text='Berlin!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Text
          text="Macy's"
          color='#DADADA'
          position="-10.54 2.22 2.22"
          rotation="0 80 0"/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
      </Scene>
    );
  }
}

export default withRouter(Berlin, { withRef: true });

