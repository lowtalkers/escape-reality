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


export default props => (

  <Entity>

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
          onClick={() => props.router.replace('/')}
          material={{color: 'yellow', opacity: 0.25}}
          position="-10.54 2.38 1.17"
          rotation="0 80 0"
          visible="true">
      </Entity>

    <Entity geometry="primitive: plane; width: 2; height: 2"
        onClick={() => props.changePlaneColor()}
        material={{color: props.planeColor[props.colorIndex], opacity: 0.25}}
        position="2.5 -1 -4"
        rotation="-20 0 0">
    </Entity>

    <Entity geometry="primitive: plane; width: 2; height: 2"
        material={{color: 'red', opacity: 0.25}}
        position="3.5 -1 -2"
        rotation="-20 0 0">
    </Entity>

  <a-sky id="image-360" radius="30" src='#milan'></a-sky>

  <Text
    text='Milan!'
    color='#DADADA'
    position='-1.75 1 -3'/>

  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
  <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

  <Entity
    animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
    animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
    geometry='primitive: box'
    material={{color: props.color, opacity: 0.6}}
    position='0 -0.5 -3'
    onClick={props.changeColor}>
    <Entity
      animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
      geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
      material={{color: '#24CAFF'}}/>
  </Entity>
  </Entity>
)

