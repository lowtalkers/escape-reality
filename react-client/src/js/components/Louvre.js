import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import 'aframe-bmfont-text-component';
import Iframe from 'react-iframe';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import TextPlane from './TextPlane';

// var draw = require("aframe-draw-component").component;
// var textWrap = require('aframe-textwrap-component').component;
// AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);
// let show = false;

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      show: 'false',
      url: 'https://c2.staticflickr.com/6/5688/21597873406_8f4021b4b4_k.jpg',
      // url: 'https://s3.amazonaws.com/vrpics/white-background.jpg',
      backupUrl: 'https://s3.amazonaws.com/vrpics/white-background.jpg',
      urlIndex: false,
      planeColor: ['green', 'blue', 'black', 'red'],
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
      this.props.router.push('/city');
      // this.setState({url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg', urlIndex: !this.state.urlIndex});
    }
  }

  render () {
    let self = this;
    return (
      <Scene >
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
            material={{src: 'url(https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg)', opacity: 0.85}}
            position="-4.34 2.22 6.83"
            rotation="8.02 135.22 -1.15">
        </Entity>

        <Entity geometry="primitive: plane; width: 2; height: 2"
            onClick={() => console.log('The Louvre Museum in Paris, France')}
            material={{color: 'yellow', opacity: 0.35}}
            position="-8.02 2.97 -3.8"
            rotation="-2.86 53.86 2.86">
        </Entity>

        <Entity geometry="primitive: plane; width: 5; height: 5"
            onClick={() => console.log('The Napoleonic Courtyard in Paris, France')}
            material={{color: 'yellow', opacity: 0.35}}
            position="6.4 -4 0.11"
            rotation="-89.46 -89.95 85">
        </Entity>

        <Entity geometry="primitive: plane; width: 2; height: 2"
            draw="text: Hello"
            onClick={() => self.changePlaneColor()}
            material={{color: self.state.planeColor[self.state.colorIndex], opacity: 0.25}}
            position="2.32 3.77 8.53"
            rotation="20.63 -170.74 -6.88">
        </Entity>

        <TextPlane 
          x='0'
          y='3'
          z='-3'
          rotation='0 0 0'
        />
          
        <Entity bmfont-text={{width: '500', color: 'yellow', text: 'HOLAAAA'}} position='-5 0 -3' rotation='0 0 0'/>

        <a-sky id="image-360" radius="10" src={self.state.url}></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Scene>
    );
  }
}



export default withRouter(Lobby, { withRef: true });

// <TextPlane 
  // x='0'
  // y='0'
  // z='-3'
  // rotation='0 0 0'
// />


// <TextPlane
//   planePosition='3 1.1 0.7'
//   planeRotation='0 90 0'
//   planeHeight='2'
//   planeWidth='2'
//   planeColor='black'

//   textWidth='540'
//   textColor= '#00601f'
//   textPosition="-3 1.1 0.7"
//   textRotation="0 90 0"
//   text='The Caffe Trieste became a favorite writing spot for Francis Ford Coppola'
//  />

// <Entity geometry="primitive: plane; width: 2; height: 2"
//     text={{text: 'Testing'}}
//     material={{color: "red", opacity: 0.25}}
//     position="0 0 -3"
//     rotation="0 0 0">
// </Entity>