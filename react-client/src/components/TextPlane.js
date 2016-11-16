import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';

export default props => {
  const extraProps = AFRAME.utils.extend({}, props);
  delete extraProps.color;
  delete extraProps.text;

  let adjustCoordinates = (position, width) => { 
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
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


  let adjustMainTextCoordinates = (position, width, height) => { 
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.1).toString();
    } else {
      zCoordinate = (zCoordinate - 0.1).toString();
    }
    xCoordinate = (xCoordinate - 0.1 ).toString();
    //temporary
    yCoordinate = (yCoordinate - (height/2) + 0.25).toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  let adjustHeaderTextCoordinates = (position, width, height) => { 
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.1).toString();
    } else {
      zCoordinate = (zCoordinate - 0.1).toString();
    }
    xCoordinate = (xCoordinate - (width/3)).toString();
    //temporary
    yCoordinate = (yCoordinate + ((height/4) * 1.25)).toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  let adjustImageCoordinates = (position, width, height) => { 
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.1).toString();
    } else {
      zCoordinate = (zCoordinate - 0.1).toString();
    }
    xCoordinate = (xCoordinate - (width / 4) ).toString();
    //temporary
    yCoordinate = (yCoordinate - (height / 8)).toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

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
    xCoordinate = (xCoordinate + (width / 2.3)).toString();
    //temporary
    yCoordinate = (yCoordinate + (height / 1.75)).toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  return <Entity>

    {/* Assume that props.position === "0 1 -3" */}


    {/* Background Plane */}
    <Entity 
      geometry='primitive: plane; width: 6; height: 3'
      position={props.position}
      rotation={props.rotation}
      material={{color: 'black'}}
    />

    {/* Main Image */}
    <Entity geometry="primitive: plane; width: 2.25; height: 2" //height should be 3! 
        material={{side: 'double', src: 'url(' + props.imageSrc + ')', opacity: 1}}
        position={adjustImageCoordinates(props.position, '6', '2')}
        rotation={props.rotation}>
    </Entity>

    {/* Collapse Icon */}
    <Entity geometry="primitive: plane; width: 0.33; height: 0.33"
        material={{side: 'double', src: 'url(http://i.imgur.com/W4tbzxv.png)', opacity: 0.99}}
        position={adjustIconCoordinates(props.position, '6', '2')}
        rotation={props.rotation}
    >
    </Entity>

    {/* Header Text */}
    <Entity bmfont-text={{align: 'left', width: '750', color: 'yellow', text: props.header}} 
      position={adjustHeaderTextCoordinates(props.position, '6', '3')}
      rotation={props.rotation}
      scale='1.75 1.75 1.75'
    />

    {/* Main Body Text */}
    <Entity bmfont-text={{align: 'left', width: '750', color: 'white', text: props.text}} // Max character length = 500
      position={adjustMainTextCoordinates(props.position, '6', '3')}
      rotation={props.rotation}
      scale='0.75 0.75 0.75'
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