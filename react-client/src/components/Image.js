import AFRAME from 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';


import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import Plane from './Plane';
//commentData



export default props => {
  var commentCoords;
  var hiddenSphere;
  var sky = <a-sky id="image-360" radius="10" src={'#'+props.bigPic.split('.')[0]}></a-sky>
  var bigPic = props.bigPic.split('.')[0]
  // $('#' + bigPic).load(function() {
  //   sky = <a-sky id="image-360" radius="10" src={'#'+props.bigPic.split('.')[0]}></a-sky>
  // })
  if(props.bigPic !== '' && props.comments.length === 0) {
    console.log('getting comments!!!!!!')
    props.getComments();
  }
  if(props.commentsOn) {
    hiddenSphere = (<Entity

      rotation="0 180 0"
      position="0 0 0"
      material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
      geometry="height:5;primitive:sphere;radius:7.5;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0"
      onRaycasterIntersected={(obj) => {commentCoords = obj.detail.intersection.point}}
      onClick={() => {
        console.log(commentCoords);
        // props.changeCommentMode();
        props.addComment(commentCoords);
      }} />)
  }
  return ( <Entity>
    <a-image 
      look-at="[camera]"
      id="close-image"
      src="#close"
      geometry="height: 0.3; width: 0.3"
      position="0 0 -2"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => {props.router.replace('/lobby'); props.changeBigPic(''); props.clearComments();}}>
    </a-image>

    <a-image 
      look-at="[camera]"
      id="like-image"
      src="#like"
      geometry="height: 0.3; width: 0.3"
      position="0 -0.50 -2"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => props.likeSubmitFn()}>
    </a-image>

    <a-image 
      look-at="[camera]"
      id="mic-image"
      src={props.commentsOn ? "#micActivated" : "#mic"}
      geometry="height: 0.3; width: 0.3"
      position="0 0.50 -2"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => props.turnCommentsOn()}>
    </a-image>

    {sky}

    {hiddenSphere}

    <Entity light={{type: 'ambient', color: '#888'}}/>
    <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
    <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
  </Entity>
  );
};
