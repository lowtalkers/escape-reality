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
import RingTag from './RingTag';

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
// let showPyramidCard = false;

// export default this.props => (
class Louvre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPyramidCard: false,
      showLeftWingCard: false,
      showMuseumCard: false,
      showCourtyardCard: false,
      allTitles: ['Louvre', 'Louvre_Pyramid']
    }
  }

  componentWillMount () {
    this.props.getParagraph(this.state.allTitles, allParagraphs => {
      this.setState( {allParagraphs: allParagraphs} );
      console.log('🍊 this.state allParagraphs', this.state.allParagraphs);
    })
  }

  render () {
    let self = this;
    return (
      <Entity id="refstest123" ref="pyramidTag">

       <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 -2" onClick={() => self.props.router.replace('/lobby')}></a-image>

        <Entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
          <Entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></Entity>
          <Entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></Entity>
          <Entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></Entity>
        </Entity>

{/*
        <a-ring
          radius-inner='3'
          radius-outer='3'
          color="white"
          position='0 0 -3'
          rotation='0 0 0'
        ></a-ring>
*/}

{/*
        <RingTag 
          position='0 0 -3'
          rotation='0 0 0'
          color='white'
        />
*/}


{/* Draft UnifiedComponent
  <UnifiedComponent
    id="pyramidComponent"
    tag="Louvre Pyramid"
    clickFunction={() => {
      self.setState({showPyramidCard: true});
    }}
    position="-4.34 2.22 6.83"
    rotation="8.02 135.22 -1.15"
    //Use tag string to find first Wiki Article Name
    //Use Article Name to populate infocard article data
    //Use Article Name to pull first image for respective page

    //no ternary required in City View for showing info card; pass along ternary function as prop to Unified Component
  />
*/}

  <UnifiedComponent 
    clickFunction={() => {
      self.setState({showPyramidCard: true});
    }}
    position="-4.34 2.22 6.83"
    rotation="8.02 135.22 -1.15"
    hidePlane={() => self.setState({showPyramidCard: false})}
    scale='0 0 0'
    header='Louvre Pyramid'
    wikiName='Louvre_Pyramid'
    headerAdjust='-1.5' // lower moves it to the left, higher to the right
    text={this.state.allParagraphs['Louvre_Pyramid']}
    textAdjust='0' //lower moves this down, higher moves this up
    imageSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg'
    ternary={self.state.showPyramidCard}
  />


{/*Pyramid*/}
{/*
    <Entity ref="RingTag123">
      <RingTag id="pyramidTag" 
        clickFunction={() => {
          self.setState({showPyramidCard: true});
        }}
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
            header='Louvre Pyramid'
            wikiName='Louvre_Pyramid'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Louvre_Pyramid']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/1024px-Louvre_Pyramid.jpg'
          />

          :

          null
      }
*/}
{/*`https://en.wikipedia.org/w/api.php?action=opensearch&search=${}&limit=1&namespace=0&format=jsonfm`*/}

{/*Richelieu Wing*/}

        <RingTag id="richelieuWingTag" 
          clickFunction={() => {
            self.setState({showLeftWingCard: true});
          }}
          position="-8.02 2.97 -3.8"
          rotation="-2.86 53.86 2.86"
        />

        {self.state.showLeftWingCard?

          <TextPlane 
            id="richelieuWingCard"
            hidePlane={() => self.setState({showLeftWingCard: false})}

            position="-8.02 2.97 -3.8"
            rotation="-2.86 53.86 2.86"

            scale='0 0 0'
            header='Richelieu Wing'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text= "The Richelieu Wing of the Louvre Museum in Paris France is home to many famous French, German and Dutch paintings (third floor) and historical treasures from the Renaissance (second floor). French sculptures are located on the main floor. Although he never actually lived here, the apartments reflect Napoleon III's architectural style, and is home to numerous Cour Marly and Cour Puget sculptures. The Building served previously as The Ministry of Finance."
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
          />

          :

          null
        }

{/*Napoleon Courtyard*/}

        <RingTag id="courtyardTag" 
          clickFunction={() => self.setState({showCourtyardCard: true})}
          position="6.4 -4 0.11"
          rotation="-89.46 -89.95 85"
        />

        {self.state.showCourtyardCard?

          <TextPlane 
            id="courtyardCard"
            hidePlane={() => self.setState({showCourtyardCard: false})}

            position="6.4 -4 0.11"
            rotation="-2.86 53.86 2.86"
            
            scale='0 0 0'
            header='Napoleon Courtyard'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text= {`'Cour Napolon', or Napoleon's Courtyard, is named after Napoleon III, under whose rule the Louvre Palace underwent several structural changes to its design. The nephew and heir of Napoleon I, he was the first President of France to be elected by a direct popular vote. He was blocked by the Constitution and Parliament from running for a second term, so he organized a coup d'état in 1851 and then took the throne as Napoleon III on 2 December 1852.`}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
          />

          :

          null
        }

{/*Louvre Museum*/}

        <RingTag id="museumTag" 
          clickFunction={() => self.setState({showMuseumCard: true})}
          position="7 3 -5.42"
          rotation="18.91 -52.14 0"
        />

        {self.state.showMuseumCard?

          <TextPlane 
            id="museumCard"
            hidePlane={() => self.setState({showMuseumCard: false})}

            position="7 3 -5.42"
            rotation="18.91 -52.14 0"
            
            wikiName='Louvre'
            scale='0 0 0'
            header='Louvre Museum'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text= {this.state.allParagraphs['Louvre']}
            // text= {`The Louvre or the Louvre Museum (French: Musée du Louvre, pronounced: [myze dy luvʁ]) (French   ) is the world's largest museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement (district or ward). Nearly 35,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square metres (782,910 square feet). The Louvre is the world's second most visited museum after the Palace Museum in China, receiving more than 9.26 million visitors in 2014.`}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Vista_exterior_del_Museo_del_Louvre.JPG/1280px-Vista_exterior_del_Museo_del_Louvre.JPG'
          />

          :

          null
        }

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