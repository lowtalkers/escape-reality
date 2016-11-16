import AFRAME from 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import { Link, withRouter } from 'react-router';


import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import Plane from './Plane';



export default props => (
  <Entity>
      <Entity camera look-controls wasd-controls>
          <Entity position="0 0 -3" scale="0.2 0.2 0.2" geometry="primitive: ring; radiusOuter: 0.20; radiusInner: 0.13;" material="color: #ADD8E6; shader: flat" cursor="maxDistance: 50; fuse: true"/>
        </Entity>

        <Entity rotation="0 80 0" position="0 0 -2" material={{src: '#paris', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => props.router.push('/louvre/')}/>

        <Entity rotation="0 130 0" position="0 0 -2" material={{src: '#sf1', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => props.router.push('/sf/')}/>

        <Entity rotation="0 180 0" position="0 0 -2" material={{src: '#toronto', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0"/>

        <Entity rotation="0 230 0" position="0 0 -2" material={{src: '#seattle', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0"/>


      <Entity light={{type: 'ambient', color: '#fff'}}/>
      <Entity light={{type: 'directional', intensity: 0.2}} position='-1 2 1'/>

      <a-sky color='#C0D1CE' opacity="0.5"></a-sky>
  </Entity>
);

