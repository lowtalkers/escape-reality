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
    Potsdamer Platz | https://en.wikipedia.org/wiki/Potsdamer_Platz
    Potsdamer Platz Station | https://en.wikipedia.org/wiki/Berlin_Potsdamer_Platz_station
    Deutsche Bahn | https://en.wikipedia.org/wiki/Deutsche_Bahn
*/

class Berlin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlatz: false,
      showStation: false,
      showBahn: false,
      allTitles: ['Potsdamer_Platz', 'Berlin_Potsdamer_Platz_station', 'Deutsche_Bahn']
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
          <a-image id="close-image" src="#close" geometry="height: 0.3; width: 0.3" position="3.81 0 2" rotation="0 -92.24620501606255 0" onClick={() => self.props.router.replace('/lobby')}></a-image>

          <RingTag
              id='potsdamer-platz-tag'
              clickFunction={() => {
                self.setState({showPlatz: true});
              }}
              geometry="primitive: plane; width: 3; height: 3"
              material={{color: '#ff0000', opacity: 0.25}}
              position="6.8 0.76 0.94"
              rotation="16.615776058793873 -105.99719209920231 0"
              visible="true">
          </RingTag>

          {self.state.showPlatz ?
            <TextPlane
              id="PlatzTextPlane"
              hidePlane={() => self.setState({showPlatz: false})}

              position="6.8 0.76 0.94"
              rotation="16.615776058793873 -105.99719209920231 0"

              scale='0 0 0'
              header='Potsdamer Platz'
              wikiName='Potsdamer_Platz'
              headerAdjust='-1.5' // lower moves it to the left, higher to the right
              text={this.state.allParagraphs['Potsdamer_Platz']}
              textAdjust='0' //lower moves this down, higher moves this up
              imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/PotsdamerPlatz_Vogelperspektive_2004_1.jpg/512px-PotsdamerPlatz_Vogelperspektive_2004_1.jpg'
            />
            : null
          }

        <RingTag
            id='station-tag'
              clickFunction={() => {
                self.setState({showStation: true});
              }}
            geometry="primitive: plane; width: 2; height: 2"
            material={{color: 'red', opacity: 0.25}}
            position="-5.76 4.25 15.59"
            rotation="-20.05352282957881 150.1149423242757 0">
        </RingTag>


        {self.state.showStation ?
          <TextPlane
            id="PotsdamerStationTextPlane"
            hidePlane={() => self.setState({showStation: false})}

            position="-5.76 4.25 15.59"
            rotation="-20.05352282957881 150.1149423242757 0"

            scale='0 0 0'
            header='Potsdamer Station'
            wikiName='Berlin_Potsdamer_Platz_station'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Berlin_Potsdamer_Platz_station']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Train_station_Berlin_Potsdamer_Platz.jpg/512px-Train_station_Berlin_Potsdamer_Platz.jpg'
          />
          : null
        }

        <RingTag
            id='deutsche-bahn-tag'
            clickFunction={() => {
                self.setState({showBahn: true});
            }}
            geometry="primitive: plane; width: 2; height: 2"
            material={{color: 'red', opacity: 0.25}}
            position="-9.91 5.08 -16.46"
            rotation="0 50 0">
        </RingTag>

        {self.state.showBahn ?
          <TextPlane
            id="DeutscheBahnTextPlane"
            hidePlane={() => self.setState({showBahn: false})}

            position="-9.91 5.08 -16.46"
            rotation="0 50 0"

            scale='0 0 0'
            header='Deutsche Bahn'
            wikiName='Deutsche_Bahn'
            headerAdjust='-1.5' // lower moves it to the left, higher to the right
            text={this.state.allParagraphs['Deutsche_Bahn']}
            textAdjust='0' //lower moves this down, higher moves this up
            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/16199_dbtower_duhanic.jpg/1024px-16199_dbtower_duhanic.jpg'
          />
          : null
        }

        <a-sky id="image-360" radius="30" src='#berlin'></a-sky>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Entity>
    );
  }
}


export default withRouter(Berlin, {withRef: true});