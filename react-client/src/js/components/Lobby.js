import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      show: 'false',
      url: 'https://s3.amazonaws.com/vrpics/test5.jpeg',
      backupUrl: 'https://s3.amazonaws.com/vrpics/test5.jpeg',
      urlIndex: false,
      planeColor: ['red', 'blue', 'green', 'black'],
      colorIndex: 0
    };
     AFRAME.registerComponent('auto-enter-vr', {
      init: function () {
        this.el.sceneEl.enterVR();
      }
    });
  }


  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  componentWillMount() {
    console.log('Loading... Current state is:', this.state.show);
  }

  componentDidMount() {
    this.setState({show: 'true'});
  }

  showGenericPane() {
    return (
      <a-plane color="#CCC" height="20" width="20" ></a-plane>
      )
  }

  changeUrl() {
    if (this.state.urlIndex) {
      this.setState({url: this.state.backupUrl, urlIndex: !this.state.urlIndex});
    } else {
      this.props.router.push('/city');
      this.setState({url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg', urlIndex: !this.state.urlIndex});
    }
  }

  render () {
    let self = this;
    return (
      <Scene auto-enter-vr>

        <Entity camera look-controls wasd-controls>
          <Entity position="0 0 -3" scale="0.2 0.2 0.2" geometry="primitive: ring; radiusOuter: 0.20; radiusInner: 0.13;" material="color: #ADD8E6; shader: flat" cursor="maxDistance: 50; fuse: true"/>
        </Entity>

        <Entity rotation="0 80 0" position="0 0 -2" material={{src: 'url(https://s3.amazonaws.com/vrpics/paris.png)', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => self.changeUrl()}/>

        <Entity rotation="0 130 0" position="0 0 -2" material={{src: 'url(https://s3.amazonaws.com/vrpics/sf+(1).png)', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => self.changeUrl()}/>

        <Entity rotation="0 180 0" position="0 0 -2" material={{src: 'url(https://s3.amazonaws.com/vrpics/toronto.png)', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => self.changeUrl()}/>

        <Entity rotation="0 230 0" position="0 0 -2" material={{src: 'url(https://s3.amazonaws.com/vrpics/seattle.png)', color: '#FFF', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}} geometry="height:1;primitive:cylinder;radius:2;segmentsRadial:48;thetaLength:30;openEnded:true;thetaStart:0" onClick={() => self.changeUrl()}/>


      <Entity light={{type: 'ambient', color: '#fff'}}/>
      <Entity light={{type: 'directional', intensity: 0.2}} position='-1 2 1'/>
      <a-sky color='#C0D1CE' opacity="0.5"></a-sky>

      </Scene>
    );
  }
}


export default withRouter(Lobby, { withRef: true });


