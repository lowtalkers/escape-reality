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
      zCoordinate = '0.1';
    } else {
      zCoordinate = '-0.1';
    }
    xCoordinate = (xCoordinate).toString();
    //temporary
    yCoordinate = yCoordinate.toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }


  let adjustEntityCoordinates = (position) => {
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    return (`${xCoordinate} 0.5 -3`)
  }

  let adjustEntityRotation = (rotation) => {
    let rotations = rotation.split(" ").map((element) => Number(element));
    let xRotation = rotations[1];
    return (`0 ${xRotation} 0`)
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
    xCoordinate = (xCoordinate + (width/2.5)).toString(); //bigger modifier moves left
    //temporary
    console.log('adjustIconCoordinates height:', height)
    yCoordinate = (yCoordinate + (height/2.75)).toString(); //bigger modifier moves down
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  return <Entity>

      <Entity position={adjustEntityCoordinates(props.position)} rotation={adjustEntityRotation(props.rotation)} onClick={() => console.log('Textplane clicked!')}>

        {/* Assume that props.position === "0 1 -3" */}


        {/* Background Plane */}
        <Entity 
          geometry={`primitive: plane; width: ${props.width}; height: ${props.height}`}
          // position='0 0 0'
          rotation='0 0 0'
          material={{color: 'black'}}
        />

        {/* Main Image */}
        <Entity geometry={`primitive: plane; width: ${(props.width/8)*3}; height: ${(props.height/3)*2}`}
            material={{side: 'double', src: 'url(' + props.imageSrc + ')', opacity: 1}}
            // position={adjustImageCoordinates(props.position, props.width, (props.height/3)*2)}
            position={`${(props.width/-4)} ${(props.height/-10)} 0.1`}
            rotation='0 0 0'
        >
        </Entity>

        {/* Collapse Icon */}
        {/*}
        <Entity geometry="primitive: plane; width: 0.33; height: 0.33"
            material={{side: 'double', src: 'url(http://i.imgur.com/W4tbzxv.png)', opacity: 0.99}}
            position={adjustIconCoordinates(props.position, '6', '2')}
            rotation={props.rotation}
            onClick={() => console.log('Collapse icon clicked!')}
        >
        </Entity>
        */}

        {/* Header Text */}
        <Entity bmfont-text={{align: 'left', width: '750', color: 'yellow', text: props.header}} 
          // position={adjustHeaderTextCoordinates(props.position, props.width, props.height)}
          position={`${props.headerAdjust} 1 0.1`}
          rotation='0 0 0'
          scale='1.85 1.85 0'
        />

        {/* Main Body Text */}
        <Entity bmfont-text={{align: 'left', width: '750', color: 'white', text: props.text}} // Max character length = 500
          // position={adjustMainTextCoordinates(props.position, props.width, props.height)}
          position={`-0.1 ${props.textAdjust} 0.1`}
          rotation='0 0 0'
          scale='0.8 0.8 0'
        />

      </Entity>

      <Entity 
            onClick={() => console.log('Bookmark clicked!')}
            geometry={`primitive: plane; width: ${props.width/18}; height: ${props.height/9}`}
            material={{side: 'double', src: 'url(http://i.imgur.com/W4tbzxv.png)', opacity: 0.99}}
            position={adjustIconCoordinates(props.position, props.width, props.height)}
            rotation={adjustEntityRotation(props.rotation)}
            onClick={() => console.log('Collapse icon clicked!')}
            scale='1 1 0'
          >
      </Entity>

    </Entity>
};

// let adjustMainTextCoordinates = (position, width, height) => { 
//   let coordinates = position.split(" ").map((element) => Number(element));
//   let xCoordinate = coordinates[0];
//   let yCoordinate = coordinates[1];
//   let zCoordinate = coordinates[2];
//   if (zCoordinate < 0) {
//     zCoordinate = '0.1';
//   } else {
//     zCoordinate = '-0.1';
//   }
//   xCoordinate = (xCoordinate - 0.1 ).toString();
//   //temporary
//   yCoordinate = (yCoordinate - (height/1.75)).toString();
//   return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
// }

// let adjustHeaderTextCoordinates = (position, width, height) => { 
//   let coordinates = position.split(" ").map((element) => Number(element));
//   let xCoordinate = coordinates[0];
//   let yCoordinate = coordinates[1];
//   let zCoordinate = coordinates[2];
//   if (zCoordinate < 0) {
//     zCoordinate = '0.1';
//   } else {
//     zCoordinate = '-0.1';
//   }
//   xCoordinate = (xCoordinate - (width/3)).toString();
//   //temporary
//   yCoordinate = (yCoordinate + ((height/6))).toString();
//   return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
// }

// let adjustImageCoordinates = (position, width, height) => { 
//   let coordinates = position.split(" ").map((element) => Number(element));
//   let xCoordinate = coordinates[0];
//   let yCoordinate = coordinates[1];
//   let zCoordinate = coordinates[2];
//   if (zCoordinate < 0) {
//     zCoordinate = '0.1';
//   } else {
//     zCoordinate = '-0.1';
//   }
//   xCoordinate = (xCoordinate - (width / 4) ).toString();
//   //temporary
//   yCoordinate = (yCoordinate - (height / 3)).toString();
//   return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
// }

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