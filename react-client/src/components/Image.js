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
  props.getComments();
  
  return ( <Entity>
    <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 -2" onClick={() => {props.router.replace('/lobby'); props.changeBigPic('')}}></a-image>

    <a-image id="commentStart" src="#commentStart" geometry="height: 0.3; width: 0.3" position="0 0.82 -3" onClick={()=> {if (annyang) {
                var commands = {
                'hello': function() { alert('Hello world!'); }
              };

                annyang.addCallback('result', function(phrases) {
                console.log(phrases, phrases[0]);
                alert(phrases[0]);
              });

                annyang.addCommands(commands);
                annyang.start();
              }}}></a-image>

    <a-image id="commentStop" src="#commentStop" geometry="height: 0.3; width: 0.3" position="0 0.42 -3" onClick={()=> {annyang.abort();}}></a-image>

    <a-image id="like" src="#like" geometry="height: 0.3; width: 0.3" position="0 0 -3" onClick={() => props.likeSubmitFn()}></a-image>

    <a-sky id="image-360" radius="10" src={'#'+props.bigPic.split('.')[0]}></a-sky>


    <Entity 
      rotation="0 180 0"
      position="0 0 0"
      material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} 
      geometry="height:5;primitive:sphere;radius:7.5;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0" 
      onRaycasterIntersected={(obj) => {commentCoords = obj.detail.intersection.point}}
      onClick={() => {
        console.log(commentCoords);
        // props.changeCommentMode();
        props.addComment(commentCoords);
      }} />

    <Entity light={{type: 'ambient', color: '#888'}}/>
    <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
    <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
  </Entity>
  );
};
