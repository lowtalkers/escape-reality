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


/*  Wikipedia links
    Sant'Agnese in Agone | https://en.wikipedia.org/wiki/Sant%27Agnese_in_Agone
    Fontana dei Quattro Fiumi | https://en.wikipedia.org/wiki/Fontana_dei_Quattro_Fiumi
    Fontana del Moro | https://en.wikipedia.org/wiki/Fontana_del_Moro
*/

export default props => (

  <Entity>

      <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" rotation="0 20 0"position="1.68 0 0" onClick={() => props.router.replace('/lobby')}></a-image>

      <Entity
          id='sant-agnese-church-tag'
          geometry="primitive: plane; width: 3; height: 3"
          material={{color: '#ff0000', opacity: 0.25}}
          position="-22.55 7.98 -14.11"
          rotation="0 80 0"
          visible="true">
      </Entity>

    <Entity
        id='fountain-of-4-rivers-tag'
        geometry="primitive: plane; width: 2; height: 2"
        material={{color: 'red', opacity: 0.25}}
        position="-2.74 4.84 -22.5"
        rotation="0 0 0">
    </Entity>

    <Entity
        id='moor-fountain-tag'
        geometry="primitive: plane; width: 2; height: 2"
        material={{color: 'red', opacity: 0.25}}
        position="0.53 2.76 20.73"
        rotation="0 -180 0">
    </Entity>

  <a-sky id="image-360" radius="30" src='#rome'></a-sky>

  <Entity light={{type: 'ambient', color: '#888'}}/>
  <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
  <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

  </Entity>
);

