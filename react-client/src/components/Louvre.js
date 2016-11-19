import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import 'aframe-bmfont-text-component';
import Iframe from 'react-iframe';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import TextPlane from './TextPlane';
import Bookmark from './Bookmark';

// var draw = require("aframe-draw-component").component;
// var textWrap = require('aframe-textwrap-component').component;
// AFRAME.registerComponent("draw", draw);
// AFRAME.registerComponent("textwrap", textwrap);
// let show = false;

/*
not sure how these 'dumb' components will handle the equivalent of 
state changes once imported into our smart component?
i.e onClick -> this.setState({louvrePyramid: true}) in order to
determine whether to render Louvre Pyramid etc. obv we can do it
differently but that's how I've always rendered new components in React before
*/

//temporary workaround for now
// let showPyramid = false;

// export default this.props => (
class Louvre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPyramid: false,
      showLeftWingPlane: false,
      allTitles: ['Louvre_Pyramid', 'Louvre']
    };
  }

  componentWillMount () {
    this.props.getParagraph(this.state.allTitles, allParagraphs => { 
      this.setState( {allParagraphs: allParagraphs} );
      console.log('🍊  this.state allParagraphs', this.state.allParagraphs);
    });
  }

  render () {
    let self = this;
    return (
      <Entity >
      
       <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 0" onClick={() => props.router.replace('/lobby')}></a-image>

        <Entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
          <Entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></Entity>
          <Entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></Entity>
          <Entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></Entity>
        </Entity>

        <Entity id="pyramidTag" 
            onClick={() => {
              self.setState({showPyramid: true});
            }}
            geometry="primitive: plane; width: 2; height: 2"
            material={{src: 'url(https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg)', opacity: 0.85}}
            position="-4.34 2.22 6.83"
            rotation="8.02 135.22 -1.15"
        >
        </Entity>

        {self.state.showPyramid ? 
          
            <TextPlane 
              id="pyramidTextPlane"
              hidePlane={() => self.setState({showPyramid: false})}

              position="-4.34 2.22 6.83"
              rotation="8.02 135.22 -1.15"
              
              scale='0 0 0'
              header='Louvre Pyramid'
              headerAdjust='-1.5' // lower moves it to the left, higher to the right
              text={this.state.allParagraphs['Louvre_Pyramid']}
              textAdjust='0' //lower moves this down, higher moves this up
              imageSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg'
            />

            :

            null
        }

{/*
        <TextPlane id="pyramidTextPlane"
        //replace two below lines with corresponding tag properties
          position="-4.34 2.22 6.83"
          rotation="8.02 135.22 -1.15"

          scale='0 0 0'
          header='Louvre Pyramid'
          headerAdjust='-1.5' // lower moves it to the left, higher to the right
          text='The Louvre Pyramid (Pyramide du Louvre) is a large glass and metal pyramid designed by Chinese-American architect I.M. Pei, surrounded by three smaller pyramids, in the main courtyard (Cour Napoléon) of the Louvre Palace (Palais du Louvre) in Paris. The large pyramid serves as the main entrance to the Louvre Museum. Completed in 1989, it has become a landmark of the city of Paris.'
          textAdjust='-1' //lower moves this down, higher moves this up
          imageSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg'
        />
*/}

        <Entity id="leftWingTag" 
          geometry="primitive: plane; width: 2; height: 2"
          onClick={() => {
            self.setState({showLeftWingPlane: true});
          }}
          material={{color: 'yellow', opacity: 0.35}}
          position="-8.02 2.97 -3.8"
          rotation="-2.86 53.86 2.86"
        >
        </Entity>

        {self.state.showLeftWingPlane ?

          <TextPlane 
            id="leftWingTagPlane"
            hidePlane={() => self.setState({showLeftWingPlane: false})}

            position="-8.02 2.97 -3.8"
            rotation="-2.86 53.86 2.86"
            
            scale='0 0 0'
            header='Louvre Museum'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text= {this.state.allParagraphs['Louvre']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
          />

          :

          null
        }

        <Entity id='courtyardTag' 
            geometry="primitive: plane; width: 5; height: 5"
            onClick={() => console.log('The Napoleonic Courtyard in Paris, France')}
            material={{color: 'yellow', opacity: 0.35}}
            position="6.4 -4 0.11"
            rotation="-89.46 -89.95 85">
        </Entity>

        <Entity id="richelieuWingTag" 
            geometry="primitive: plane; width: 2; height: 2"
            draw="text: Hello"
            onClick={() => this.props.changePlaneColor()}
            material={{color: this.props.planeColor[this.props.colorIndex], opacity: 0.25}}
            position="2.32 3.77 8.53"
            rotation="20.63 -170.74 -6.88"
            look-at="[camera]"
            // lookAt={[camera]}
        >
        </Entity>

    {/*Test TextPlane for Debugging (will display automatically in front of view upon rendering) */}
      {/*}
              <TextPlane id="museumTextPlane"
                //1.78 -1 1.95
                position="1.75 0.5 3"
                rotation='0 -177 0'
                scale='0 0 0'

                header='Louvre Museum'
                headerAdjust='-1.5' // lower moves it to the left, higher to the right
                text= {`The Louvre or the Louvre Museum (French: Musée du Louvre, pronounced: [myze dy luvʁ]) (French   ) is the world's largest museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement (district or ward). Nearly 35,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square metres (782,910 square feet). The Louvre is the world's second most visited museum after the Palace Museum in China, receiving more than 9.26 million visitors in 2014.`}
                textAdjust='-1' //lower moves this down, higher moves this up
                imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
              />
      */}

        <a-text color="white" text="Testing A Frame Tag" position="0 0 -3"/>

        <a-sky id="image-360" radius="10" src='#louvre'></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Entity>
      )
    }
  }

export default withRouter(Louvre, {withRef: true});
// );



// <TextPlane
  // x='0'
  // y='0'
  // z='-3'
  // rotation='0 0 0'
// />


// <TextPlane
//   planePosition='3 1.1 0.7'
//   planeRotation='0 90 0'
//   planeHeight='2'
//   planeWidth='2'
//   planeColor='black'

//   textWidth='540'
//   textColor= '#00601f'
//   textPosition="-3 1.1 0.7"
//   textRotation="0 90 0"
//   text='The Caffe Trieste became a favorite writing spot for Francis Ford Coppola'
//  />

// <Entity geometry="primitive: plane; width: 2; height: 2"
//     text={{text: 'Testing'}}
//     material={{color: "red", opacity: 0.25}}
//     position="0 0 -3"
//     rotation="0 0 0">
// </Entity>