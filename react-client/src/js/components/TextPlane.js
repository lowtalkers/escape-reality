import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';

export default props => {
  const extraProps = AFRAME.utils.extend({}, props);
  delete extraProps.color;
  delete extraProps.text;

  let adjustCoordinates = (x, y, z, width) => { 
    let xCoordinate = Number(x);
    let yCoordinate = Number(y);
    let zCoordinate = Number(z);

    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.05).toString();
    } else {
      zCoordinate = (zCoordinate - 0.05).toString();
    }

    xCoordinate = (xCoordinate).toString();
    //temporary
    yCoordinate = yCoordinate.toString();

    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  let adjustCoordinatesImage = (x, y, z, width) => { 
    let xCoordinate = Number(x);
    let yCoordinate = Number(y);
    let zCoordinate = Number(z);

    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.05).toString();
    } else {
      zCoordinate = (zCoordinate - 0.05).toString();
    }

    xCoordinate = (xCoordinate - (width / 2) + 1.25).toString();
    //temporary
    yCoordinate = yCoordinate.toString();

    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  return <Entity>

    //Background Plane
    <Entity 
      geometry='primitive: plane; width: 6; height: 3'
      position={`${props.x} ${props.y} ${props.z}`}
      rotation={props.rotation}
      material={{color: 'black'}}
    />

    //Image
    <Entity geometry="primitive: plane; width: 2; height: 2"
        material={{side: 'double', src: 'url(https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg)', opacity: 0.85}}
        position={adjustCoordinatesImage(props.x, props.y, props.z, '6')}
        rotation={props.rotation}>
    </Entity>

    //Main Body Text
    <Entity bmfont-text={{align: 'left', width: '500', color: 'white', text: 'The Caffe Trieste became a favorite writing spot for Francis Ford Coppola, who wrote much of the screenplay for The Godfather while sitting there.'}} 
      position={adjustCoordinates(props.x, props.y, props.z, '6')}
      rotation={props.rotation}
      //scale='0.5 0.5 0.5'
    />

  </Entity>
};

// <Entity 
  // geometry='primitive: plane; width: 3; height: 3'
  // position='0 0 -3'
  // rotation='0 0 0'
  // material={{color: 'black'}}
// />

// <Entity
 // bmfont-text={{width: 3, color: 'white', text: 'TESTING B&W'}} position='0 0 -2' rotation='0 0 0'
 // {...extraProps}/>

// <Entity
 // bmfont-text={{width: props.textWidth, color: props.textColor, text: props.text}} position={props.textPosition} rotation={props.textRotation}
 // {...extraProps}/>


// <Entity 
//   geometry={`primitive: plane; width: ${props.planeWidth}; height: ${props.planeHeight}; color: ${props.planeColor}`}
//   position={props.planePosition}
//   rotation={props.planeRotation} />