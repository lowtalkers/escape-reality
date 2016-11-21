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

    <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 -2" onClick={() => {props.router.replace('/lobby') ;}}></a-image>

    <a-image id="hr-image" src="#hrlogo" geometry="height: 0.5; width: 0.5" position="-1.92 0.41 -1.34" rotation="18.334649444186343 58.44169510334397 -10.886198107485642" onClick={() => {props.router.replace('/hr') ;}}></a-image>

    <a-sky id="image-360" radius="30" src='#sf'></a-sky>

    <Text
      text='San Francisco!'
      color='#000000'
      rotation='0 100 0'
      position='-6 3.85 3.23'/>


  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
  <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
  </Entity>
)
