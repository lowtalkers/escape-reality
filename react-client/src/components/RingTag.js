import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';

export default props => {
  return ( 
    <Entity id='RingTag' scale='.5 .5 .5'
      onClick={() => props.clickFunction()}
      position={props.position}
      rotation={props.rotation}
    >
      <Entity
        id='cube1RingTag'
        primitive='a-octahedron'
        animation__rot={{property: 'rotation', dir: 'alternate', dur: 6000, loop: 'repeat', to: '0 0 360'}}
        animation__opac={{property: 'opacity', dir: 'alternate', dur: 3000, loop: 'repeat', from: .2, to: .5}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 4000, loop: false, to: '4 4 4'}}
        position='0 0 0'
        rotation='45 0 45'
        easing='easeInOutQuad'
        material={{color: '#61ffff', opacity: 0.6}}
        >
      </Entity>
      <Entity
        id='cube2RingTag'
        primitive='a-octahedron'
        animation__rot={{property: 'rotation', dir: 'alternate', dur: 6000, loop: true, to: '0 360 0'}}
        animation__opac={{property: 'opacity', dir: 'alternate', dur: 5000, loop: 'repeat', from: .1, to: .7}}
        animation__scale={{property: 'scale', dir: 'alternate', dur: 4000, times: 2, loop: false, to: '4 4 4'}}
        position='0 0 0'
        rotation='45 45 0'
        easing='easeInOutQuad'
        material={{color: '#86ffff', opacity: 0.6}}
        >
      </Entity>
    </Entity>
  );
};
