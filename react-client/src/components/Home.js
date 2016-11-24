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


export default props => {
  let pics = props.pics.map((pic, index) => {
    const picId = pic.imageLink.split('/').reverse()[0];
    const rot = '0' + (index * 30) + '0';
    return (
      <Entity 
      rotation={rot} 
      position="0 0 -2" 
      material={{src: {picId}, color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} 
      geometry="height:1;primitive:sphere;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" 
      onClick={() => props.router.replace('/' + picId)} />
    )
  });
  return (
    <Entity>

         {pics}
          <a-image id="exit-image" src="#exit" geometry="height: 0.3; width: 0.3" position="0 -1 -2" onClick={() => props.router.replace('/dashboard')}></a-image>

        <Entity light={{type: 'ambient', color: '#fff'}}/>
        <Entity light={{type: 'directional', intensity: 0.2}} position='-1 2 1'/>

        <a-sky src='#lobby1' rotation='0 -90 0'></a-sky>
    </Entity>
  );
};


