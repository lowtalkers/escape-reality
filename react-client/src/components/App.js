/**
 * @file Manages the app component.
 */

import AFRAME from 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import Plane from './Plane';
import Lobby from './Lobby';
import SF from './SF';
import Louvre from './Louvre';
import Berlin from './Berlin';
import Milan from './Milan';
import Rome from './Rome';
import Hack from './Hack';
import TextPlane from './TextPlane';
import RingTag from './RingTag';
import UnifiedComponent from './UnifiedComponent';

import SignUp from './signInUpComponents/signup.jsx';
import SignIn from './signInUpComponents/signin.jsx';

import Dashboard from './Dashboard.js';
import Bookmarks from './Bookmarks.js';
import Home from './Home.js';
import Image from './Image.js';

/**
 * Creates a new App component.
 * @class
 */

let counter = -1;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      profilePic: '',
      bigPic: '',
      pics: [],
      addCommentMode: false,
      comments: [], //[{x: 1.24324324, y: 2, z:3, id: 0, show: false }, {xyz, 1: false}]
      currentComment: {},
      commentCounter: 0,
      displayedComments: [],
      lastComment: ''

    };
  }

   /**This function is used to enforce the board rules and changes the class of currently selected letters for UI.
    * @param {object} event click event object
    * @returns {boolean} true or false if rules are followed
    */

  getParagraph(allTitles, setStateParagraph) {
    const result = {};
    const fetch = (title, idx, getNextParagraph) => {
      $.get({
        url: '/getWiki?exactWikiTitle=' + title,
        success: (data) => {
          console.log('Success fetch wiki paragraph', data);
          result[allTitles[idx]] = data;
          getNextParagraph();
        },
        error: (error) => {
          console.error('error in fetch paragraph', error);
          $('.error').show();
        }
      });
    };

    const recurse = (titleIndex) => {
      if (titleIndex === allTitles.length) {
        setStateParagraph(result);
        return result;
      }
      fetch(allTitles[titleIndex], titleIndex, () => {
        recurse(titleIndex + 1);
      });
    };
    recurse(0);
  }

  // getArticleName() {



  // }


  onEmailChange(event) {
    this.setState({ email: event.target.value });
    // console.log(this.state.email)
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  getAllPhotos() {
    $.get({
      url: '/topPics',
      success: (data) => {
        console.log('got topPics from server:', data);
        this.setState({pics: data});
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      },
    });
  }

  getComments() {
    $.get({
      url: '/commentData',
      data: {photoName: this.state.bigPic},
      success: (data) => {
        console.log('got comment data from server:', data);
        if (data.length > 0) {
          data = data.map(function(comment) {
            var coords = comment.coordinates.split(' ');
            return {x: coords[0], y: coords[1], z: coords[2], body: comment.body}
          });
          this.setState({comments: data})          
        }
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      }
    });
  }

  changeProfilePic() {
    $.get({
      url: '/getUserPic',
      success: (picUrl) => {
        if (picUrl) {
          this.setState({
            profilePic: picUrl
          });
        }
        if (!picUrl) { // picUrl is null on account creation, so give a default pic
          this.setState({
            profilePic: 'https://s3.amazonaws.com/vrpics/default-userpic_256x256.png'
          });
        }
        console.log('Got userpic from server:', this.state.profilePic);
      },
      error: (error) => {
        console.error('Error in get userPic', error);
        $('.error').show();
      },
    });
  }

  componentDidMount () {
    this.getAllPhotos();
    if (this.props.router.location.pathname === '/dashboard') {
      console.log('🍊  running changeProfilePic');
      this.changeProfilePic();
    }
  }

  componentDidUpdate () {
    console.log('After rendering, current comment mode:', this.state.addCommentMode)
  }

  /** This function when invoked will submit email and password. */
  submitFn() {
    /** Grab email and password values from fields */
    const email = this.state.email;
    const password = this.state.password;
    console.log('email address is', email);
    /** Submit email and password for verification */
    $.post({
      url: this.props.router.location.pathname,
      contentType: 'application/json',
      data: JSON.stringify({email: email, password: password}),
      success: (data) => {
        console.log('Sucessful authentication', data, data.auth);
        if (data.auth) {
          this.props.router.replace('/dashboard');
          // If authenticated, then get profile picture
          // from server to display it
          this.changeProfilePic();
        } else if (data === 'User exists!') {
          console.log('User exists!');
        }
      },
      error: (error) => {
        console.error(error);
        $('.error').show();
      },
    });
  }

  likeSubmitFn() {
    console.log('in like submit function');
    $.post({
      url: '/like',
      contentType: 'application/json',
      data: JSON.stringify({photoName: this.state.bigPic}),
      success: (data) => {
        console.log(data);
      },
      error: (error) => {
        $('.error').show();
      },
    });
  }

  commentSubmitFn() {
    console.log('in comment submit function');
    $.post({
      url: '/comment',
      contentType: 'application/json',
      data: JSON.stringify({photoName: this.state.bigPic, body: this.state.lastComment, coordinates: 'test'}),
      success: (data) => {
        console.log(data);
      },
      error: (error) => {
        $('.error').show();
      },
    });
  }

  voiceComment() {
    console.log('voice activated');
    var self = this;

    if (annyang) {
      console.log('in annyang!!!');
      annyang.start();
      annyang.addCallback('result', function(phrases) {
        console.log(phrases, phrases[0]);
        self.setState({
          lastComment: phrases[0]
        });
      });
    }
  }

  stopVoiceComment() {
    annyang.abort();
    this.commentSubmitFn();
  }


  changeBigPic (val) {
    this.setState({
      bigPic: val
    });
  }

  changeCommentMode () {
    this.setState({
      addCommentMode: !this.state.addCommentMode
    })
  }

  addComment (coordinates) {
    counter++;
    let commentObject = {
      id: counter,
      text: '(Placeholder text)',
    };
    let newObject = Object.assign(commentObject, coordinates);
    console.log('addComment newObject:', newObject)
    this.setState({
      // comments: (this.state.comments).push('New comment')
      comments: this.state.comments.concat([commentObject]),
      currentComment: coordinates
    });
    // console.log('comments:', this.state.comments)
  }

  showComment (commentID) {
    this.setState({
      displayedComments: this.state.displayedComments.concat([commentID])
    })
  }

  hideComment (commentID) {
    let indexToHide = this.state.displayedComments.indexOf(commentID);
    console.log('Inside hideComment function, before setting state our displayedComments array is:', this.state.displayedComments, 'our commentID is:', commentID, 'and our indexToHide is:', indexToHide, '. The new array after splicing will be:', this.state.displayedComments.splice(indexToHide, 1));
    this.setState({
      displayedComments: this.state.displayedComments.splice(indexToHide, 1)
    })
  }

  renderComments () {
    let self = this;
    return (
      self.state.comments.map((comment, idx) => {
        return (
        <UnifiedComponent
          clickFunction={() => {
            console.log('Onclick event is currently:', event)
            console.log('ID ')
            self.showComment(idx);
          }}
          commentID= {idx}
          position={`${comment.x} ${comment.y} ${comment.z}`}
          rotation="0 0 0"
          hidePlane={() => {
            // console.log('Hiding plane now... Data is:')
            // self.setState({showComment: false});
            self.hideComment(idx);
          }}
          scale='0 0 0'
          header='Louvre Pyramid'
          wikiName='Louvre_Pyramid'
          headerAdjust='-1.5' // lower moves it to the left, higher to the right
          text= {`'Cour Napolon', or Napoleon's Courtyard, is named after Napoleon III, under whose rule the Louvre Palace underwent several structural changes to its design. The nephew and heir of Napoleon I, he was the first President of France to be elected by a direct popular vote. He was blocked by the Constitution and Parliament from running for a second term, so he organized a coup d'état in 1851 and then took the throne as Napoleon III on 2 December 1852.`}
          textAdjust='0' //lower moves this down, higher moves this up
          imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
          displayedComments={self.state.displayedComments}
        />
      )})
    )
  }

  render () {
    let self = this;
    let vrView = '';
    let imageName = '';
    let resizedImageLink = '';

    const images = this.state.pics.map(pic => {
      imageName = pic.title.split('.')[0];
      resizedImageLink = 'https://s3.amazonaws.com/vrpics/resized-' + pic.title;
      return (
        <img id={'resized-' + imageName}
        crossOrigin="anonymous"
        src={resizedImageLink} />
      );
    });

    let bigPic = '';
    if (this.state.bigPic !== '') {
      bigPic = (<img id={this.state.bigPic.split('.')[0]} crossOrigin='anonymous' src={'https://s3.amazonaws.com/vrpics/' + this.state.bigPic} />);
    }
    if (this.props.router.location.pathname.indexOf('/signup') >= 0) {
      return (
        <SignUp
        onEmailChange={this.onEmailChange.bind(this)}
        onPasswordChange={this.onPasswordChange.bind(this)}
        submitFn={this.submitFn.bind(this)}
        />
      );
    } else if (this.props.router.location.pathname.indexOf('/signin') >= 0) {
      return (
          <SignIn
          onEmailChange={this.onEmailChange.bind(this)}
          onPasswordChange={this.onPasswordChange.bind(this)}
          submitFn={this.submitFn.bind(this)}
          />
        );
    } else if (this.props.router.location.pathname.indexOf('/dashboard') >= 0) {
      return (
              <Dashboard
                profilePic = {this.state.profilePic}
              />
      );

    } else {
      if (this.props.router.location.pathname.indexOf('/lobby') >= 0) {
        vrView = (
            <Home
            router={this.props.router}
            pics={this.state.pics}
            changeBigPic={this.changeBigPic.bind(this)} />
          );
      } else {
        console.log('*********rendering image')
        vrView = <Image
                    bigPic={this.state.bigPic}
                    commentSubmitFn={this.commentSubmitFn.bind(this)}
                    likeSubmitFn={this.likeSubmitFn.bind(this)}
                    changeBigPic={this.changeBigPic.bind(this)}
                    router={this.props.router}
                    changeCommentMode={this.changeCommentMode.bind(this)}
                    comments={this.state.comments}
                    getComments={this.getComments.bind(this)}
                    addComment={this.addComment.bind(this)}
                    voiceComment={this.voiceComment.bind(this)}
                    stopVoiceComment={this.stopVoiceComment.bind(this)}
                  />

      }

        /*
          For development, we turn off fusing cursor (too slow) to allow clicking
          For deployment, we turn on fusing cursor (so mobile phones can gaze to "click")

              <a-cursor
                fuse="true" fuseTimeout="800"
                animation__fuse="property: scale; easing: easeOutExpo; startEvents: stateadded; from: 7 7 7; to: 1 1 1; dur: 2000"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material="color: #61ffff; shader: flat"
              >
              </a-cursor>
         */

      return (
          <Scene>
            <Camera>
              <a-cursor
                animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material="color: #61ffff; shader: flat">
              </a-cursor>
            </Camera>


            <a-assets>
              {images}
              {bigPic}

              <img id="lobby-_1" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/lr2.jpg" />

              <img id="close" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/icon.png" />
              <img id="commentStart" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Nov24%2C2016start.png" />
              <img id="commentStop" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/Nov24%2C2016stop.png" />
              <img id="like" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/resized-Nov27,2016like.png" />

              <img id="bookmark" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/plus-hi.png" />
              <img id="exit" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/exit.png" />

            </a-assets>
            {vrView}

            {this.renderComments()}

{/*
            {self.state.showComment?

                      <TextPlane
                        id="courtyardCard"
                        hidePlane={() => self.setState({showComment: false})}

                        position={`${self.state.comments[0].x} ${self.state.comments[0].y} ${self.state.comments[0].z}`}
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
*/}

          </Scene>
        );
    }
  }
}


export default withRouter(App, { withRef: true });


