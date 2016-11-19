import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';

export default props => {
  return <Entity id="RingTag" scale='0.5 0.5 0.5'
    onClick={() => props.clickFunction()} 
    position={props.position}
    rotation={props.rotation}
    >
    <Entity
      geometry="primitive: ring;"
      position='0 0 0'
      rotation='0 0 0'
      material={{color: props.color}}
      >
    </Entity>
    <Entity id="transparentInnerRing"
      geometry="primitive: circle;"
      position='0 0 0'
      rotation='0 0 0'
      material={{opacity: 0}}
      >
    </Entity>
  </Entity>
}