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

if (props.displayedComments.includes(props.commentID)) {
  console.log('Yes', props.displayedComments)
  return ( 

  <Entity>



    <Entity ref="RingTag123">
      <RingTag id="pyramidTag"
        clickFunction={() => props.clickFunction()}
        position={props.position}
        rotation="8.02 135.22 -1.15"
      >
        <Entity></Entity>
      </RingTag>
    </Entity>

        
          <TextPlane 
            planeClick={() => console.log('displayedComments is currentlyyyy:', props.displayedComments)}

            id="pyramidTextPlane"
            hidePlane={props.hidePlane}

            position={props.position}
            rotation="8.02 135.22 -1.15"

            scale={props.scale}
            header={props.header}
            wikiName={props.wikiName}
            headerAdjust={props.headerAdjust} // lower moves it to the left, higher to the right
            text={props.text}
            textAdjust={props.textAdjust} //lower moves this down, higher moves this up
            imageSrc={props.imageSrc}
            commentID={props.commentID}
          />

  </Entity>

  )

  } else {

    return ( 
    <Entity>

      <Entity ref="RingTag123">
        <RingTag id="pyramidTag" 
          clickFunction={() => props.clickFunction()}
          position={props.position}
          rotation="8.02 135.22 -1.15"
        >
          <Entity></Entity>
        </RingTag>
      </Entity>
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
