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
import RingTag from './RingTag';


/*  Wikipedia links
    Milan Cathedral | https://en.wikipedia.org/wiki/Milan_Cathedral
    Galleria Vittorio Emanuele II | https://en.wikipedia.org/wiki/Galleria_Vittorio_Emanuele_II
    Royal Palace of Milan | https://en.wikipedia.org/wiki/Royal_Palace_of_Milan
*/

class Milan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCathedral: false,
      showGalleria: false,
      showPalace: false,
      allTitles: ['Milan_Cathedral', 'Galleria_Vittorio_Emanuele_II', 'Royal_Palace_of_Milan']
    };
  }

  componentWillMount () {
    this.props.getParagraph(this.state.allTitles, allParagraphs => {
      this.setState( {allParagraphs: allParagraphs} );
      // console.log('🍊  this.state allParagraphs', this.state.allParagraphs);
    });
  }


  render () {
    const self = this;
    return (
      <Entity>
          <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="0 0 -2" onClick={() => self.props.router.replace('/lobby')}></a-image>

          <RingTag id="milan-cathedral-tag"
            clickFunction={() => {
              self.setState({showCathedral: true});
            }}
              position="-14.62 5.5 -2.76"
              rotation="20 80 0"
          />

          {self.state.showCathedral ?
            <TextPlane
              id="cathedralTextPlane"
              hidePlane={() => self.setState({showCathedral: false})}

              position="-14.62 5.5 -2.76"
              rotation="20 80 0"

              scale='0 0 0'
              header='Milan Cathedral'
              wikiName='Milan_Cathedral'
              headerAdjust='-1.5' // lower moves it to the left, higher to the right
              text={this.state.allParagraphs['Milan_Cathedral']}
              textAdjust='0' //lower moves this down, higher moves this up
              imageSrc='https://upload.wikimedia.org/wikipedia/commons/e/ec/876MilanoDuomo.JPG'
            />
            : null
          }


        <RingTag id="galleria-tag"
          clickFunction={() => {
            self.setState({showGalleria: true});
          }}
            position="-11.8 6.77 25.6"
            rotation="-20 150 0">
        </RingTag>


        {self.state.showGalleria ?
          <TextPlane
            id="GalleriaVittorioEmanueleIITextPlane"
            hidePlane={() => self.setState({showGalleria: false})}

            position="-11.8 6.77 25.6"
            rotation="-20 150 0"

            scale='0 0 0'
            header='Galleria Vittorio'
            wikiName='Galleria_Vittorio_Emanuele_II'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Galleria_Vittorio_Emanuele_II']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Galleria_Vittorio_Emanuele_II_%28Milan%29_E1.jpg/1024px-Galleria_Vittorio_Emanuele_II_%28Milan%29_E1.jpg'
          />
          : null
        }


        <RingTag id="royal-palace-tag"
          clickFunction={() => {
            self.setState({showPalace: true});
          }}
            position="-24.47 2.68 -16.46"
            rotation="0 50 0">
        </RingTag>

        {self.state.showPalace ?
          <TextPlane
            id="RoyalPalaceTextPlane"
            hidePlane={() => self.setState({showPalace: false})}

            position="-24.47 2.68 -16.46"
            rotation="0 50 0"

            scale='0 0 0'
            header='Royal Palace'
            wikiName='Royal_Palace_of_Milan'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Royal_Palace_of_Milan']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/0/0e/860MilanoPalazzoReale.JPG.jpg'
          />
          : null
        }

        <a-sky id="image-360" radius="30" src='#milan'></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Entity>
    );
  }
}


export default withRouter(Milan, {withRef: true});