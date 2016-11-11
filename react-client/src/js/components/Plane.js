import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity 
    geometry="primitive: plane; width: 2; height: 2" 
    position="0 1 -3"
    rotation="-10 0 0" />
);

