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
  var hoverText;
  var sky = <a-sky id="image-360" radius="10" src={'#'+props.bigPic.split('.')[0]}></a-sky>
  var bigPic = props.bigPic.split('.')[0]
  // $('#' + bigPic).load(function() {
  //   sky = <a-sky id="image-360" radius="10" src={'#'+props.bigPic.split('.')[0]}></a-sky>
  // })
  console.log('likedPhotos is:', props.likedPhotos, 'and props.currentPic is:', props.currentPic)
  if(props.bigPic !== '' && props.comments.length === 0) {
    // console.log('getting comments!!!!!!')
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
        // console.log(commentCoords);
        // props.changeCommentMode();
        props.addComment(commentCoords);
      }} />)
  }

  if(props.typedCommentsOn) {
    hiddenSphere = (<Entity

      rotation="0 180 0"
      position="0 0 0"
      material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
      geometry="height:5;primitive:sphere;radius:7.5;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0"
      onRaycasterIntersected={(obj) => {commentCoords = obj.detail.intersection.point}}
      onClick={() => {
        // console.log('Within turnTypedCommentsOn, commentCoords:', commentCoords);
        // props.changeCommentMode();
        props.addTypedComment(commentCoords);
        // props.getComments();
      }} />)
  }

  if (props.self.state.hoverIcon) {
    hoverText = (
      <Text
        text="Hello olleH"
        material={{color: 'red'}}
        position="-1 2.5 -3.5"
        look-at="camera"
        scale="0.75 0.75 0"
        // onRaycasterIntersected={(obj) => console.log('Hovering over close image button')}
      />
    )
  }

  // if (props.self.hoverIcon) {
  //   console.log('hoverIcon is currently flagged')
  // }

  return ( <Entity>

    {hoverText}

    {/* Background Info Plane */}

    { props.self.state.infoPlane ? 

      <Entity
        geometry={`primitive: plane; width: 4; height: 2`}
        position='2.5 0.35 -4'
        rotation='0 0 0'
        material={{side: 'double', src: 'url(http://i.imgur.com/vJM4tTV.jpg)', opacity: 0.75, transparent: true, shader: 'flat'}}
        onClick={() => props.self.setState({infoPlane: false})}
        // onRaycasterIntersected={() => props.self.state.hoverIcon ? props.self.setState({hoverIcon: false}) : null}
        // onRaycasterIntersected={() => console.log('Intersectingg!')}
      />

      :

      null

    }

    <a-image
      look-at="[camera]"
      id="input-image"
      // src="#input"
      src={props.typedCommentsOn ? '#inputActivated' : '#input'}
      geometry="height: 0.5; width: 0.5"
      position="0 1.5 -3.5"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => {
        console.log('hoverIcon is:', props.self.state.hoverIcon)
        // let comment = prompt('Heyoo input form icon clicked, response?');
        // // console.log('User submitted comment:', comment);
        props.turnTypedCommentsOn();
      }
      }>
    </a-image>

    <a-image
      look-at="[camera]"
      id="mic-image"
      src={props.commentsOn ? "#micActivated" : "#mic"}
      geometry="height: 0.5; width: 0.5"
      position="0 0.75 -3.5"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => props.turnCommentsOn()}>
    </a-image>

    <a-image
      look-at="[camera]"
      id="like-image"
      // src="#like"
      src={props.likedPhotos.indexOf(props.currentPic) > -1 ? "#liked" : "#like"}
      geometry="height: 0.5; width: 0.5"
      position="0 0 -3.5"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => props.likeSubmitFn()}>
    </a-image>

    <a-image
      look-at="[camera]"
      id="close-image"
      src="#close"
      geometry="height: 0.5; width: 0.5"
      position="0 -0.75 -3.5"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => {props.router.replace('/lobby'); props.changeBigPic(''); props.clearComments();}}
    >
    </a-image>

    <a-image
      look-at="[camera]"
      id="info"
      src="#info"
      geometry="height: 0.25; width: 0.25"
      position="0 -1.35 -3.5"
      animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
      animation__clickOpacity="property: material.opacity; easing: easeOutQuad; startEvents: click; dir: alternate; from: 1; to: 0; dur: 200"
      onClick={() => props.self.setState({infoPlane: true})}
    >
    </a-image>

    {sky}

    {hiddenSphere}

    <Entity light={{type: 'ambient', color: '#888'}}/>
    <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
    <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>
  </Entity>
  );
};
