import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';

export default props => {
  const extraProps = AFRAME.utils.extend({}, props);
  delete extraProps.color;
  delete extraProps.text;

  let adjustIconCoordinates = (position, width, height) => { 
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.1).toString();
    } else {
      zCoordinate = (zCoordinate - 0.1).toString();
    }
    xCoordinate = (xCoordinate + (width/2.5)).toString(); //bigger modifier moves left
    //temporary
    console.log('adjustIconCoordinates height:', height)
    yCoordinate = (yCoordinate + (height/2.75)).toString(); //bigger modifier moves down
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  let adjustEntityRotation = (rotation) => {
    let rotations = rotation.split(" ").map((element) => Number(element));
    let xRotation = rotations[1];
    return (`0 ${xRotation} 0`)
  }

  return <Entity 
      geometry={`primitive: plane; width: ${props.width/18}; height: ${props.height/9}`}
      material={{side: 'double', src: 'url(http://i.imgur.com/W4tbzxv.png)', opacity: 0.99}}
      position={adjustIconCoordinates(props.position, props.width, props.height)}
      rotation={adjustEntityRotation(props.rotation)}
      onClick={() => console.log('Collapse icon clicked!')}
      scale='1 1 0'
    >
    </Entity>
}
