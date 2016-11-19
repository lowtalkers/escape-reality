import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import TextPlane from './TextPlane';
import Plane from './Plane';


/*  Wikipedia links
    Sant'Agnese in Agone | https://en.wikipedia.org/wiki/Sant%27Agnese_in_Agone
    Fontana dei Quattro Fiumi | https://en.wikipedia.org/wiki/Fontana_dei_Quattro_Fiumi
    Fontana del Moro | https://en.wikipedia.org/wiki/Fontana_del_Moro
*/

class Rome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChurch: false,
      show4RiversFountain: false,
      showMoorFountain: false,
      allTitles: ['Sant%27Agnese_in_Agone', 'Fontana_dei_Quattro_Fiumi', 'Fontana_del_Moro']
    };
  }

  componentWillMount () {
    this.props.getParagraph(this.state.allTitles, allParagraphs => { 
      this.setState( {allParagraphs: allParagraphs} );
      console.log('🍊  this.state allParagraphs', this.state.allParagraphs);
    });
  }

  render () {
    const self = this;
    return (
      <Entity>
          <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" rotation="0 20 0"position="1.68 0 0" onClick={() => props.router.replace('/lobby')}></a-image>

          <Entity
              id='sant-agnese-church-tag'
              onClick={() => {
                self.setState({showChurch: true});
              }}
              geometry="primitive: plane; width: 3; height: 3"
              material={{color: '#ff0000', opacity: 0.25}}
              position="-22.55 7.98 -14.11"
              rotation="0 80 0"
              visible="true">
          </Entity>

          {self.state.showChurch ? 
            <TextPlane 
              id="churchTextPlane"
              hidePlane={() => self.setState({showChurch: false})}

              position="-2. 1.96 -2.7"
              rotation="0 49.6 0"
              
              scale='0 0 0'
              header='Sant Agnese Church'
              wikiName='Sant%27Agnese_in_Agone'
              headerAdjust='-1.5' // lower moves it to the left, higher to the right
              text={this.state.allParagraphs['Sant%27Agnese_in_Agone']}
              textAdjust='0' //lower moves this down, higher moves this up
              imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sant%27Agnese_in_Agone_%28Piazza_Navona%29_September_2015-1.jpg/1024px-Sant%27Agnese_in_Agone_%28Piazza_Navona%29_September_2015-1.jpg'
            />
            : null
          }

        <Entity
            id='fountain-of-4-rivers-tag'
              onClick={() => {
                self.setState({show4RiversFountain: true});
              }}
            geometry="primitive: plane; width: 2; height: 2"
            material={{color: 'red', opacity: 0.25}}
            position="-2.74 4.84 -22.5"
            rotation="0 0 0">
        </Entity>

        {self.state.show4RiversFountain ? 
          <TextPlane 
            id="Fountain4RiversTextPlane"
            hidePlane={() => self.setState({show4RiversFountain: false})}

            position="-2. 1.96 -2.7"
            rotation="0 49.6 0"
            
            scale='0 0 0'
            header='Fountain of 4 Rivers'
            wikiName='Fontana_dei_Quattro_Fiumi'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Fontana_dei_Quattro_Fiumi']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Fontana_dei_Quattro_Fiumi_%28Piazza_Navona%29_September_2015-1.jpg/1024px-Fontana_dei_Quattro_Fiumi_%28Piazza_Navona%29_September_2015-1.jpg'
          />
          : null
        }

        <Entity
            id='moor-fountain-tag'
              onClick={() => {
                self.setState({showMoorFountain: true});
              }}
            geometry="primitive: plane; width: 2; height: 2"
            material={{color: 'red', opacity: 0.25}}
            position="0.53 2.76 20.73"
            rotation="0 -180 0">
        </Entity>

        {self.state.showMoorFountain ? 
          <TextPlane 
            id="MoorFountainTextPlane"
            hidePlane={() => self.setState({showMoorFountain: false})}

            position="-2. 1.96 -2.7"
            rotation="0 49.6 0"
            
            scale='0 0 0'
            header='Moor Fountain'
            wikiName='Fontana_del_Moro'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Fontana_del_Moro']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Moor_Fountain.jpg/1024px-Moor_Fountain.jpg'
          />
          : null
        }

        <a-sky id="image-360" radius="30" src='#rome'></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Entity>
    );
  }
}


export default withRouter(Rome, {withRef: true});