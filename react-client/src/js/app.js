import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';
import Plane from './components/Plane';

// let show = false;

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      show: 'false',
      // url: "https://s3.amazonaws.com/lowtalkerscarlos/union-square-franco_4500.jpg"
      //   + "?X-Amz-Date=20161111T193716Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature="
      //   + "bc7045c89df0afb64f17bc1aa75dabda86391f9e52c6e7c2d7e43e1263e2582f&X-Amz-Credential=ASIAJJAH2B7Y47MPCE7A/20161111/"
      //   + "us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token="
      //   + "FQoDYXdzEHsaDJQ2DbKoS/H0g7TdeSL6AZjLDvIjlNbsGE3UC%2BOObt/8XKXbataHltzx6%2Bz5X4Rmknssibb4r0"
      //   + "%2BLzLoxPhgUoc1TtJeXwvh6lJC2tqTN03sXnHSbIEyCLNN4GQCVxCE2KhZUUhm5TnF6dvu2FxlvcTDwwNrVNeJx2k6kA8oNqcpZ81YBdg"
      //   + "XVtQGJDAKZE7vPvGNudPOuRx%2BNH/BwV3lslmMJ0E1DQbbTmYMyYZjrt5ogIdqAwLlDIskg0qlQ/CraPPpn1B55Xvqe9MS331Ifbwn"
      //   + "ONPZuyMpQq7LcbI/kGYzWM0Gpdsd5MQ0odR85j%2BMI4QbvahYus6uLG%2B834ZbZTWv3WH1IciZKKoIorfqXwQU%3D",
      url: 'https://s3.amazonaws.com/lowtalkerscarlos/union-square-franco_4500.jpg?X-Amz-Date=20161112T004423Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=288043f3892a7ecbcf4846289d4c14f922fddcf7ac709d709fd4e9edf48410d3&X-Amz-Credential=ASIAJJAH2B7Y47MPCE7A/20161112/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEHsaDJQ2DbKoS/H0g7TdeSL6AZjLDvIjlNbsGE3UC%2BOObt/8XKXbataHltzx6%2Bz5X4Rmknssibb4r0%2BLzLoxPhgUoc1TtJeXwvh6lJC2tqTN03sXnHSbIEyCLNN4GQCVxCE2KhZUUhm5TnF6dvu2FxlvcTDwwNrVNeJx2k6kA8oNqcpZ81YBdgXVtQGJDAKZE7vPvGNudPOuRx%2BNH/BwV3lslmMJ0E1DQbbTmYMyYZjrt5ogIdqAwLlDIskg0qlQ/CraPPpn1B55Xvqe9MS331IfbwnONPZuyMpQq7LcbI/kGYzWM0Gpdsd5MQ0odR85j%2BMI4QbvahYus6uLG%2B834ZbZTWv3WH1IciZKKoIorfqXwQU%3D',
      backupUrl: 'https://s3.amazonaws.com/lowtalkerscarlos/union-square-franco_4500.jpg?X-Amz-Date=20161112T004423Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=288043f3892a7ecbcf4846289d4c14f922fddcf7ac709d709fd4e9edf48410d3&X-Amz-Credential=ASIAJJAH2B7Y47MPCE7A/20161112/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEHsaDJQ2DbKoS/H0g7TdeSL6AZjLDvIjlNbsGE3UC%2BOObt/8XKXbataHltzx6%2Bz5X4Rmknssibb4r0%2BLzLoxPhgUoc1TtJeXwvh6lJC2tqTN03sXnHSbIEyCLNN4GQCVxCE2KhZUUhm5TnF6dvu2FxlvcTDwwNrVNeJx2k6kA8oNqcpZ81YBdgXVtQGJDAKZE7vPvGNudPOuRx%2BNH/BwV3lslmMJ0E1DQbbTmYMyYZjrt5ogIdqAwLlDIskg0qlQ/CraPPpn1B55Xvqe9MS331IfbwnONPZuyMpQq7LcbI/kGYzWM0Gpdsd5MQ0odR85j%2BMI4QbvahYus6uLG%2B834ZbZTWv3WH1IciZKKoIorfqXwQU%3D',
      urlIndex: false,
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
      this.setState({url: this.state.backupUrl, urlIndex: !this.state.urlIndex});
    } else {
      this.setState({url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg', urlIndex: !this.state.urlIndex});
    }
  }

  render () {
    let self = this;
    return (
      <Scene >
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>

        <a-assets>
          <img id="city-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
          <img id="cubes-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <img id="sechelt-thumb" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" />
        </a-assets>


          <Entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
            <Entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></Entity>
            <Entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></Entity>
            <Entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></Entity>
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{src: 'url(https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg)', opacity: 0.25}}
              position="-2 0.5 -8"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              onClick={() => self.changeUrl()}
              material={{color: 'yellow', opacity: 0.25}}
              position="-2.5 -3 -5"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              onClick={() => self.changePlaneColor()}        
              material={{color: self.state.planeColor[self.state.colorIndex], opacity: 0.25}}
              position="2.5 -1 -4"
              rotation="-20 0 0">
          </Entity>

          <Entity geometry="primitive: plane; width: 2; height: 2"
              material={{color: 'green', opacity: 0.25}}
              position="3.5 -1 -2"
              rotation="-20 0 0">
          </Entity>

        <a-sky id="image-360" radius="10" src={self.state.url}></a-sky>


        <Text
          text='San Francisco!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

        <Entity
          animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          geometry='primitive: box'
          material={{color: this.state.color, opacity: 0.6}}
          position='0 -0.5 -3'
          onClick={this.changeColor.bind(this)}>
          <Entity
            animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
// <Sky src="url(http://i.imgur.com/u9dAMpj.jpg)"/>

