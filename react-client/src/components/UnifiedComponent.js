import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';
import TextPlane from './TextPlane';
import RingTag from './RingTag';

export default props => {
  {/* Draft UnifiedComponent
  return ( 
    <Entity ref="RingTag123">
      <RingTag id="pyramidTag" 
        clickFunction={() => props.clickFunction()}
        position="-4.34 2.22 6.83"
        rotation="8.02 135.22 -1.15"
      >
        <Entity></Entity>
      </RingTag>
    </Entity>

    {self.state.showPyramidCard? 
      
      <TextPlane 
        planeClick={() => console.log('Current ref object id is:', self.refs)}
        id="pyramidTextPlane"
        hidePlane={() => self.setState({showPyramidCard: false})}

        position="-4.34 2.22 6.83"
        rotation="8.02 135.22 -1.15"

        scale='0 0 0'
        header={props. }
        wikiName='Louvre_Pyramid'
        headerAdjust='-1.5' // lower moves it to the left, higher to the right
        text={this.state.allParagraphs['Louvre_Pyramid']}
        textAdjust='0' //lower moves this down, higher moves this up
        imageSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg'
      />

      :

      null
    }
  );
*/}

  let greenAngleCalc = (position, commentID) => {
    console.log('Position in greenAngleCalc:', position, 'type of position:', typeof position);
    console.log('Comment ID in TextPlane equals:', commentID)
    position = cardCoordCalc(position);
    let coordinates = position.split(" ").map((element) => Number(element));
    let x = coordinates[0];
    let z = coordinates[2];
    if (z <= 0 && x <= 0){
      return `0 ${90 - Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    }
    if (z >= 0 && x >= 0) {
      return `0 ${-90 - Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    }
    if (z >= 0 && x <= 0){
      return `0 ${90 + Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    }
    if (z <= 0 && x >= 0) {
      return `0 ${Math.abs(Math.atan(z/x) * (180/Math.PI)) - 90} 0`
    }
  }

  let cardCoordCalc = (position) => {  //y=tx, x=tz
    let coordinates = position.split(" ").map((element) => Number(element));
    let tx = coordinates[0];
    let tz = coordinates[2];
    let s = Math.abs(tx/ tz); // s = slope
    let z = 3 / (Math.sqrt(Math.pow(s, 2) + 1));
    let x = s*z;
    x = Math.sign(tx) * x;
    z = Math.sign(tz) * z
    // let gAngle = greenAngleCalc(`${x} 0.5 ${z}`);
    // return {'x': x, 'z': z, 'gAngle': gAngle};
    return `${x.toString()} 0.5 ${z.toString()}`
  }

  if (props.displayedComments.includes(props.commentID)) {
    console.log('props.displayedComments are:', props.displayedComments)
    return ( 

    <Entity>
    
        <RingTag id="pyramidTag"
          clickFunction={props.clickFunction}
          position={props.position}
          rotation="8.02 135.22 -1.15"
        >
        </RingTag>

          
        <TextPlane 
          planeClick={() => console.log('in TextPlance, displayedComments is currentlyyyy:', props.displayedComments)}

          id="pyramidTextPlane"
          hidePlane={props.hidePlane}
          source={props.source}
          position={props.position}
          rotation="8.02 135.22 -1.15"

          // animation__rot={{property: 'rotation', dir: 'normal', dur: 500, loop: false, from: '0 0 0', to: greenAngleCalc(props.position, props.commentID)}}
          // animation__scale={{property: 'scale', dir: 'normal', dur: 500, loop: false, from: '.1 .1 .1', to: '1 1 1'}}

          scale={props.scale}
          header={props.header}
          wikiName={props.wikiName}
          headerAdjust={props.headerAdjust} // lower moves it to the left, higher to the right
          text={props.text}
          textAdjust={props.textAdjust} //lower moves this down, higher moves this up
          imageSrc={props.imageSrc}
          commentID={props.commentID}
          profilePic={props.profilePic}
          createdAt={props.createdAt}
        />

    </Entity>

    )

  } else {

    return ( 
    <Entity>

        <RingTag id="pyramidTag" 
          clickFunction={() => props.clickFunction()}
          position={props.position}
          rotation="8.02 135.22 -1.15"
        >
        </RingTag>
  </Entity>

    )
  }

{/*
return (
  <Entity geometry='primitive: box; height: 2; width: 2'
    position='0 2 -2'
    rotation='0 0 0'
  >
  </Entity>
  )
*/}
};
