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

  <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 2" onClick={() => {props.router.replace('/lobby/') ;}}></a-image>

    <Entity id="circle" geometry="primitive:circle;radius:1" material="color:red;opacity:0.75" position="-24.47 2.68 -16.46" rotation="0 50 0" visible="true">
    </Entity>

    <Entity id="circle2" geometry="primitive:circle;radius:1" material="color:red;opacity:0.75" position="-14.62 5.5 -2.76" rotation="20 80 0" visible="true">
    </Entity>

    <Entity id="circle3" geometry="primitive:circle;radius:1" material="color:red;opacity:0.75" position="-11.8 6.77 25.6" rotation="-20 150 0" visible="true">
    </Entity>

    <Entity id="circle4" geometry="primitive:circle;radius:1" material="color:red;opacity:0.75" position="20.05 3.7 11.37" rotation="160 60 0" visible="true">
    </Entity>

    <Entity id="circle5" geometry="primitive:circle;radius:1" material="color:red;opacity:0.75" position="3.52 3.46 19.33" rotation="180 0 0" visible="true">
    </Entity>

  <a-sky id="image-360" radius="30" src='#milan'></a-sky>

  <Text
    text='Milan!'
    color='#DADADA'
    position='-1.75 1 -3'/>

  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
  <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

  </Entity>
)

