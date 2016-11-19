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

    <a-sky id="image-360" radius="30" src='#hr'></a-sky>

    <Text
      text="Hack Reactin'!"
      color='#1d3c54'
      rotation='0 43 0'
      position='-6 -0.28 1.41'/>

  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
  <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
  </Entity>
)
