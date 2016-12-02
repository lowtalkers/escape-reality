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
    console.log(pic.title, index, pic.imageLink)
    const rot = '0 ' + (index * -35) + ' 0';
    // var row;
    // if (index >18 && index <= 27) {
    //   row = -1.1;
    // } else if (index > 9 && index <= 18) {
    //   row = 0;
    // } else if (index > -1 && index <= 9) {
    //   row = 1.1;
    // }
    var imageName = pic.title.split('.')[0];
    return (
      <Entity
      rotation={rot}
      position={"0 "+ ((index*-0.15)+0.5) +" 0"}
      material={{src: ('#resized-'+imageName), color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
      geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0"
      onClick={() => {
        props.router.replace('/' + imageName)
        props.changeBigPic(pic.title)
      }} />
    );
  });
  return (
    <Entity>
        <Entity animation__rot={{property: 'rotation', dur: 200000, loop: 'repeat', to: '0 360 0', easing: 'linear'}} >
        {pics}
        </Entity>

        <a-image look-at="[camera]" id="exit-image" src="#exit" geometry="height: 0.3; width: 0.3" position="0.64 -2.5 2.36" onClick={() => props.router.replace('/dashboard')}></a-image>

        <Entity light={{type: 'ambient', color: '#fff'}}/>
        <Entity light={{type: 'directional', intensity: 0.2}} position='-1 2 1'/>

        <a-sky src='#lobby-_1' rotation='0 -90 0'></a-sky>
    </Entity>
  );
};


