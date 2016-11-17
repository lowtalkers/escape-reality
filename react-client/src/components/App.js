import AFRAME from 'aframe';
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
import Lobby from './Lobby';
import SF from './SF';
import Louvre from './Louvre';
import Berlin from './Berlin';
import Milan from './Milan';
import Rome from './Rome';
import TextPlane from './Plane';


// let show = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      planeColor: ['red', 'blue', 'green', 'black'],
      colorIndex: 0
    };
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

  changePlaneColor() {
    console.log('Changing planeColor... colorIndex:', this.state.colorIndex, 'upcoming:', this.state.colorIndex + 1);
    if (this.state.colorIndex === 3) {
      this.setState({colorIndex: 0})
    } else {
      this.setState({colorIndex: this.state.colorIndex + 1})
    }
  }

  changeUrl() {
    if (this.state.urlIndex) {
      this.setState({url: this.state.url, urlIndex: !this.state.urlIndex});
    } else {
      this.props.router.push('/city');
    }
  }

  changeCity() {
    this.props.router.push('/sf/');
  }

  render () {
    let self = this;
    console.log(this.props.router)
    var view;
     if(this.props.router.location.pathname === '/lobby/' || this.props.router.location.pathname === '/') {
      view = (
        <Lobby
        changePlaneColor={this.changePlaneColor.bind(this)}
        planeColor={self.state.planeColor}
        colorIndex={self.state.colorIndex}
        url={self.state.url}
        color={self.state.color}
        changeColor={this.changeColor.bind(this)}
        changeCity={this.changeCity.bind(this)}
        router={this.props.router}
        />
      )
     } else if (this.props.router.location.pathname === '/sf/') {
        view = (
          <SF
          changePlaneColor={this.changePlaneColor.bind(this)}
          planeColor={self.state.planeColor}
          colorIndex={self.state.colorIndex}
          url={self.state.url}
          color={self.state.color}
          changeColor={this.changeColor.bind(this)}
          changeCity={this.changeCity.bind(this)}
          router={this.props.router}

          />
        )
     } else if (this.props.router.location.pathname === '/louvre/') {
        view = (
          <Louvre
          changePlaneColor={this.changePlaneColor.bind(this)}
          planeColor={self.state.planeColor}
          colorIndex={self.state.colorIndex}
          url={self.state.url}
          color={self.state.color}
          changeColor={this.changeColor.bind(this)}
          changeCity={this.changeCity.bind(this)}
          router={this.props.router}
          />
        )
     } else if (this.props.router.location.pathname === '/berlin/') {
        view = (
          <Berlin
          changePlaneColor={this.changePlaneColor.bind(this)}
          planeColor={self.state.planeColor}
          colorIndex={self.state.colorIndex}
          url={self.state.url}
          color={self.state.color}
          changeColor={this.changeColor.bind(this)}
          changeCity={this.changeCity.bind(this)}
          router={this.props.router}
          />
        )
     } else if (this.props.router.location.pathname === '/milan/') {
        view = (
          <Milan
          changePlaneColor={this.changePlaneColor.bind(this)}
          planeColor={self.state.planeColor}
          colorIndex={self.state.colorIndex}
          url={self.state.url}
          color={self.state.color}
          changeColor={this.changeColor.bind(this)}
          changeCity={this.changeCity.bind(this)}
          router={this.props.router}
          />
        )
     } else if (this.props.router.location.pathname === '/rome/') {
        view = (
          <Rome
          changePlaneColor={this.changePlaneColor.bind(this)}
          planeColor={self.state.planeColor}
          colorIndex={self.state.colorIndex}
          url={self.state.url}
          color={self.state.color}
          changeColor={this.changeColor.bind(this)}
          changeCity={this.changeCity.bind(this)}
          router={this.props.router}
          />
        )
     }

    return (
      <Scene >
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150" geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64" material="color: #f72222; shader: flat" raycaster="" cursor="">
          </a-cursor>
        </Camera>

        <a-assets>
          <img id="city-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
          <img id="cubes-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <img id="sechelt-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" />
          <img id="lobby" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/test3.jpg" />
          <img id="sf" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/union-square-franco_4500.jpg" />
          <img id="louvre" crossOrigin="anonymous" src="https://c2.staticflickr.com/6/5688/21597873406_8f4021b4b4_k.jpg" />
          <img id="berlin" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/germany.jpg" />
          <img id="milan" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/milan360.jpg" />
          <img id="close" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/icon.png" />
          <img id="rome" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/italy-rome-piazza-navona_4000.jpg" />

          <img id="paris" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/paris.png" />
          <img id="sf1" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/sf+(1).png" />
          <img id="berlin2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/berlin2.png" />
          <img id="seattle" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/seattle.png" />
          <img id="milan2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/milan.png" />
          <img id="rome2" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/colorome.png" />

        </a-assets>
        {view}
      </Scene>
    );
  }
}


export default withRouter(App, { withRef: true });


