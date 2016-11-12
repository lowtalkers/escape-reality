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
import Plane from './Plane';

// let show = false;

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      show: 'false',
      url: "https://s3.amazonaws.com/vrpics/union-square-franco_4500.jpg"
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

  render () {
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
              material={{src: 'url(https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg)', opacity: 0.25}}
              position="-2 0.5 -8"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{color: 'yellow', opacity: 0.25}}
              position="-5.5 -3 -5"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{color: 'blue', opacity: 0.25}}
              position="2.5 -1 -4"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{color: 'green', opacity: 0.25}}
              position="3.5 -1 -2"
              rotation="-20 0 0">
          </Entity>

        <a-sky id="image-360" radius="10" src="https://s3.amazonaws.com/vrpics/union-square-franco_4500.jpg "></a-sky>


        <Text
          text='Lobby!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

        <Entity
          animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          geometry='primitive: box'
          material={{color: this.state.color, opacity: 0.6}}
          position='0 -0.5 -3'
          onClick={this.changeColor.bind(this)}>
          <Entity
            animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}/>
        </Entity>
      </Scene>
    );
  }
}

// ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));

export default withRouter(Test, { withRef: true });

// <Sky src="url(http://i.imgur.com/u9dAMpj.jpg)"/>

