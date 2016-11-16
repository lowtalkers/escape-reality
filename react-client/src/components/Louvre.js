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

export default props => (
      <Entity >

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
            onClick={() => props.changePlaneColor()}
            material={{color: props.planeColor[props.colorIndex], opacity: 0.25}}
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

        <a-sky id="image-360" radius="10" src='#louvre'></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Entity>
);



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