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
import isEmail from 'validator/lib/isEmail';

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
import InputForm from './InputForm';

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
let gCoordinates = '';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'carlos@carlos.com',
      password: '',
      firstName: '',
      lastName: '',
      profilePic: '',
      bigPic: '',
      currentPic: false,
      pics: [],
      likedPhotos: [],
      addCommentMode: false,
      comments: [], //[{x: 1.24324324, y: 2, z:3, id: 0, show: false }, {xyz, 1: false}]
      currentComment: {},
      commentCounter: 0,
      displayedComments: [],
      lastComment: '',
      isUploading: true,
      commentsOn: false,
      commentPics:[],
      recording: false,
      typedCommentsOn: false,
      typedCommentBox: true,
      guestLogin: false,
      flag: false,
      micHover: false,
      textHover: false,
      homeHover: false,
      likeHover: false,
      hoverIcon: false
		};
  }

   /**This function is used to enforce the board rules and changes the class of currently selected letters for UI.
    * @param {object} event click event object
    * @returns {boolean} true or false if rules are followed
    */

  closeHoverText() {
    let self = this;
    let currentState = self.state.hoverIcon;
    if (self.state.hoverIcon) {
      setTimeout(()=> {
        if (self.state.hoverIcon === currentState) {
          self.setState({hoverIcon: false})
        }
      }, 500)
    }
  }

  getParagraph(allTitles, setStateParagraph) {
    const result = {};
    const fetch = (title, idx, getNextParagraph) => {
      $.get({
        url: '/getWiki?exactWikiTitle=' + title,
        success: (data) => {
          // console.log('Success fetch wiki paragraph', data);
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
    // // console.log(this.state.email)
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onFirstChange(event) {
    this.setState({ firstName: event.target.value });
  }

  onLastChange(event) {
    this.setState({ lastName: event.target.value });
  }

  getAllPhotos() {
    let self = this;
    console.log('RUNNING getAllPhotos !!!')
    $.get({
      url: '/topPics',
      success: (data) => {
        // console.log('got topPics from server:', data);
        self.setState({pics: data});
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      },
    });
  }

  getComments() {
    let self = this;
    $.get({
      url: '/commentData',
      data: {photoName: this.state.bigPic},
      success: (data) => {
        // console.log('got comment data from server:', data);
        if (data.comments.length > 0) {
          data.comments = data.comments.map(function(comment) {
            var coords = comment.coordinates.split(' ');
            return {x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2]), body: comment.body, firstName: comment.firstName, createdAt: new Date(comment.createdAt), src: '#'+comment.email.split('@')[0]}
          });
          self.setState({
            comments: data.comments,
            commentPics: data.profilePics
          });
        }
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      }
    });
  }

  getCreatedAt(newObject) {
    let self = this;
    let output;
    $.get({
      url: '/commentData',
      data: {photoName: this.state.bigPic},
      success: (data) => {
        let finalElement = data.comments[data.comments.length - 1];
        // console.log('got comment data from server:', data, 'final element:', finalElement);
        if (data.comments.length > 0) {
          output = new Date(finalElement.createdAt);
          // console.log('Boi stop getCreatedAt actually ran and its output isss:', output);
          // return output;

          // console.log('Bzzz output is:', output);
          newObject['createdAt'] = output;
          // console.log('99999 newObject is:', newObject);
          self.setState({
            comments: self.state.comments.concat([newObject])
          });

        }
        setTimeout(() => self.setState({flag: !self.state.flag}), 500);
      },
      error: (error) => {
        console.error('error in get upload', error);
        $('.error').show();
      }
    });



  }

  changeProfilePic(cb) {
    let self = this;
    $.get({
      url: '/getUserPic',
      success: (data) => {
        
        if (data) {
          self.setState({
            profilePic: data.pic,
            currentUser: data.currentUser
          });          
        }
        if (!data) { // picUrl is null on account creation, so give a default pic
          self.setState({
            profilePic: 'https://s3.amazonaws.com/vrpics/default-userpic_256x256.png'
          });
        }
        // console.log('Got userpic from server:', self.state.profilePic);
        if (cb) {
          cb()
        }
      },
      error: (error) => {
        console.error('Error in get userPic', error);
        $('.error').show();
      },
    });
  }

  componentDidMount () {
    console.log('componentDidMount')
    if (this.props.router.location.pathname.indexOf('/sign') < 0) {
      // console.log('🍊  running changeProfilePic');
      this.getAllPhotos();
      this.changeProfilePic();
    }
  }

  componentDidUpdate () {
    // console.log('After rendering, current comment mode:', this.state.addCommentMode, 'and comments are:', this.state.comments)
  }

  /** This function when invoked will submit email and password. */
  submitFn() {
    /** Grab email and password values from fields */
    let self = this;
    const email = this.state.email;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    /** Submit email and password for verification */
    if (isEmail(email) && !self.state.guestLogin) {
      // console.log('Guest login is false')
      $.post({
        url: this.props.router.location.pathname,
        contentType: 'application/json',
        data: JSON.stringify({email: email, password: password, firstName: firstName, lastName: lastName}),
        success: (data) => {
          // console.log('Sucessful authentication', data, data.auth);
          if (data.auth) {
            self.props.router.replace('/dashboard');
            // If authenticated, then get profile picture
            // from server to display it
            self.changeProfilePic(() => {
              console.log('Running within the changeProfilePic')
              self.getAllPhotos();
              // self.getLikes();
            });
          } else if (data === 'User exists!') {
            // console.log('User exists!');
          }
        },
        error: (error) => {
          console.error(error);
          $('.error').show();
        },
      });
    } else if (self.state.guestLogin) {
      // console.log("Guest login c'est True")
      $.post({
        url: '/guestLogin',
        contentType: 'application/json',
        data: JSON.stringify({email: 'guest@guest.com', password: 'guest', firstName: 'Guest', lastName: ''}),
        success: (data) => {
          // console.log('Sucessful GUEST authentication', data, data.auth);
          if (data.auth) {
            self.props.router.replace('/dashboard');
            // If authenticated, then get profile picture
            // from server to display it
            self.changeProfilePic(() => {
              self.getAllPhotos();
              // self.getLikes();
            });
          } else if (data === 'User exists!') {
            // console.log('User exists!');
          }
        },
        error: (error) => {
          console.error(error);
          $('.error').show();
        },
      });
      // self.clearGuestComments();
    } else {
      // console.log('Not a valid email')
    }
  }

  likeSubmitFn() {
    let self = this;
    // console.log('in like submit function');
    $.post({
      url: '/like',
      contentType: 'application/json',
      data: JSON.stringify({photoName: this.state.bigPic}),
      success: (data) => {
        let array = [data[0].photo_id];
        console.log('like result is:', array[0]);
        self.setState({likedPhotos: self.state.likedPhotos.concat(array)})
      },
      error: (error) => {
        $('.error').show();
      },
    });
  }

  // getComments() {
  //   let self = this;
  //   $.get({
  //     url: '/commentData',
  //     data: {photoName: this.state.bigPic},
  //     success: (data) => {
  //       // console.log('got comment data from server:', data);
  //       if (data.comments.length > 0) {
  //         data.comments = data.comments.map(function(comment) {
  //           var coords = comment.coordinates.split(' ');
  //           return {x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2]), body: comment.body, firstName: comment.firstName, createdAt: new Date(comment.createdAt), src: '#'+comment.email.split('@')[0]}
  //         });
  //         self.setState({
  //           comments: data.comments,
  //           commentPics: data.profilePics
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       console.error('error in get upload', error);
  //       $('.error').show();
  //     }
  //   });
  // }

  getLikes() {
    let self = this;
    console.log('props.router is currently:',  self.props.router)
    $.get({
      url: '/retrieveLikes',
      success: (data) => {
        console.log('after running getLikes, retrieved data is:', data);
        let photoIDs = data.map(likeData => likeData.photo_id);
        if (self.state.likedPhotos.length !== photoIDs.length) {
          console.log('photoIDs:', photoIDs, 'while state\'s likedPhotos is:', self.state.likedPhotos);
          self.setState({likedPhotos: photoIDs})
        }
      },
      error: (error) => {
        console.log('error retrieving likes', error);
        $('.error').show();
      }
    })
  }

  commentSubmitFn(phrase, coordinates) {
    // console.log('in comment submit function; current phrase is:', phrase, '🦄🦄🦄🦄🦄🦄 coords', coordinates);
    $.post({
      url: '/comment',
      contentType: 'application/json',
      data: JSON.stringify({photoName: this.state.bigPic, body: phrase, coordinates: `${coordinates.x} ${coordinates.y} ${coordinates.z}`}),
      success: (data) => {
        // console.log(data);
      },
      error: (error) => {
        $('.error').show();
      },
    });
  }

  clearGuestComments() {
    // console.log('Running clearGuestComments...')
    $.post({
      url: '/clearGuestComments',
      contentType: 'application/json',
      data: JSON.stringify({test: 'test'}),
      success: data => {
        // console.log('clearGuestComments was an official success');
      },
      error: error => {
        // console.log('clearGuestComments was an abject failure')
        $('.error').show();
      }
    })
  }

  addComment (coordinates) {
    //will we need to use async here?
    var self = this;
    self.setState({
      recording: true
    });
    counter++;
    this.voiceComment(coordinates);
  }

  voiceComment(coordinates) {
    var self = this;

    if (annyang) {
      // console.log('🐞🐞🐞🐞🐞voice activated in callback', coordinates);

      // console.log('in annyang!!!');
      annyang.start();

      gCoordinates = coordinates;

      annyang.addCallback('result', function(phrases) {
        // console.log('Voice recording phrases:', phrases, 'first result:', phrases[0]);

        self.stopVoiceComment(phrases[0], gCoordinates);
        let commentObject = {
          body: phrases[0],
          firstName: self.state.currentUser,
          src: '#profilePic'
        };
        let newObject = Object.assign(commentObject, gCoordinates); // {x:0 }
        // console.log('addComment newObject:', newObject, 'current comments state array:', self.state.comments)
        // self.getComments();
        self.getCreatedAt(newObject);
      }, this);
    } else {
      self.setState({
          recording: false,
          commentsOn: false
        });
    }
  }

  stopVoiceComment(phrase, coordinates) {
    var self = this;
    annyang.abort();

    self.setState({
        recording: false,
        commentsOn: false
      });

    //does annyang.abort wait until the voice recognition has processed before invoking commentsubmitFn?
    // console.log('Phrase right after aborting is:', phrase)
    this.commentSubmitFn(phrase, coordinates);
  }

  addTypedComment (coordinates) {
  	let self = this;
  	let comment = prompt('Please enter your comment (max: 50 characters!');
    counter++;
    gCoordinates = coordinates;
    self.turnTypedCommentsOn();
    self.commentSubmitFn(comment, coordinates);
    let commentObject = {
      body: comment,
      firstName: self.state.currentUser,
      src: '#profilePic'
    };
    let newObject = Object.assign(commentObject, gCoordinates); // {x:0 }
    // console.log('addComment newObject:', newObject, 'current comments state array:', self.state.comments)
    self.getCreatedAt(newObject);
  }

  changeBigPic (val, id) {
    this.setState({
      bigPic: val,
      currentPic: id
    });
  }

  changeCommentMode () {
    this.setState({
      addCommentMode: !this.state.addCommentMode
    })
  }


  showComment (commentID) {
    if (this.state.displayedComments.indexOf(commentID) === -1) {
      this.setState({
        displayedComments: this.state.displayedComments.concat([commentID])
      })
    }
  }

  uploadBar () {
    this.setState({
      isUploading: !this.state.isUploading
    });
  }


  hideComment (commentID) {
    let indexToHide = this.state.displayedComments.indexOf(commentID);
    let array = this.state.displayedComments;
    // console.log(this.state.displayedComments.splice(indexToHide, 1));
    array.splice(indexToHide, 1);
    this.setState({
      displayedComments: array
    })
  }

  clearComments () {
    // console.log('clearing comments!!!!!')
    this.setState({
      comments: []
    });
  }

  turnCommentsOn () {
    this.setState({
      commentsOn: !this.state.commentsOn
    });
  }

  turnTypedCommentsOn () {
  	this.setState({
  		typedCommentsOn: !this.state.typedCommentsOn
  	})
  }

  toggleGuestLogin (callback) {
    // console.log('Toggled toggleGuestLogin!')
    this.setState({
      guestLogin: !this.state.guestLogin
    })
    setTimeout(callback, 250);
  }

  renderComments () {
    let self = this;
    // console.log('self.state.comments equals:', self.state.comments)
    return (
      self.state.comments.map((comment, idx) => {
        // console.log('While mapping the fetched comments, the current comment is:', comment);
        return (
        <UnifiedComponent
         look-at="[camera]"
          clickFunction={() => {
            // console.log('Onclick event is currently:', event)
            // console.log('ID ')
            self.showComment(idx);
          }}
          commentID= {idx}
          source={comment.src}
          position={`${Number(comment.x)} ${Number(comment.y)} ${Number(comment.z)}`}
          rotation="0 0 0"
          hidePlane={() => {
            // // console.log('Hiding plane now... Data is:')
            // self.setState({showComment: false});
            // self.getAllPhotos();
            self.hideComment(idx);
          }}
          scale='0 0 0'
          header={comment.firstName}
          // header='Kobe'
          wikiName='Louvre_Pyramid'
          headerAdjust='-0.75' // lower moves it to the left, higher to the right
          text={comment.body}
          textAdjust='-0.1' //lower moves this down, higher moves this up
          imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
          displayedComments={self.state.displayedComments}
          profilePic={self.state.profilePic}
          createdAt={comment.createdAt}
        />
      )})
    )
  }

  render () {
    let self = this;
    let vrView = '';
    let imageName = '';
    let resizedImageLink = '';

    console.log('Rendering...');

    const images = this.state.pics.map(pic => {
      let imageName = pic.title.split('.')[0];
      let resizedImageLink = 'https://s3.amazonaws.com/vrpics/resized-' + pic.title;
      return (
        <img id={'resized-' + imageName}
        crossOrigin="anonymous"
        src={resizedImageLink} />
      );
    });

    const fullImages = this.state.pics.map(pic => {
      let imageName = pic.title.split('.')[0];
      let fullSizedImageLink = 'https://s3.amazonaws.com/vrpics/' + pic.title;
      return (
        <img id={'fullSized-' + imageName}
        crossOrigin="anonymous"
        src={fullSizedImageLink} />
      );
    });

    const commentPics = this.state.commentPics.map(pic => {
      return (
        <img id={pic.name}
        crossOrigin="anonymous"
        src={pic.picLink} />
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
        onFirstChange={this.onFirstChange.bind(this)}
        onLastChange={this.onLastChange.bind(this)}
        submitFn={this.submitFn.bind(this)}
        />
      );
    } else if (this.props.router.location.pathname.indexOf('/signin') >= 0) {
      return (
          <SignIn
          onEmailChange={this.onEmailChange.bind(this)}
          onPasswordChange={this.onPasswordChange.bind(this)}
          submitFn={this.submitFn.bind(this)}
          guestLogin={this.state.guestLogin}
          toggleGuestLogin={this.toggleGuestLogin.bind(this)}
          />
        );
    } else if (this.props.router.location.pathname.indexOf('/dashboard') >= 0) {
      return (
      				
              <Dashboard
              currentUser={this.state.currentUser}
                profilePic = {this.state.profilePic}
                shouldHide={this.state.isUploading}
                uploadBar={this.uploadBar.bind(this)}
              />
              

              // <InputForm />
      );

    } else {
      if (this.props.router.location.pathname.indexOf('/lobby') >= 0) {
        vrView = (
            <Home
            router={this.props.router}
            pics={this.state.pics}
            getLikes={this.getLikes.bind(this)}
            changeBigPic={this.changeBigPic.bind(this)} />
          );
      } else {
        // console.log('*********rendering image')
        vrView = <Image
                    self={self}
                    bigPic={this.state.bigPic}
                    currentPic={this.state.currentPic}
                    likedPhotos={this.state.likedPhotos}
                    commentSubmitFn={this.commentSubmitFn.bind(this)}
                    likeSubmitFn={this.likeSubmitFn.bind(this)}
                    changeBigPic={this.changeBigPic.bind(this)}
                    router={this.props.router}
                    changeCommentMode={this.changeCommentMode.bind(this)}
                    comments={this.state.comments}
                    getComments={this.getComments.bind(this)}
                    getLikes={this.getLikes.bind(this)}
                    addComment={this.addComment.bind(this)}
                    addTypedComment={this.addTypedComment.bind(this)}
                    voiceComment={this.voiceComment.bind(this)}
                    stopVoiceComment={this.stopVoiceComment.bind(this)}
                    clearComments={this.clearComments.bind(this)}
                    commentsOn={this.state.commentsOn}
                    turnCommentsOn={this.turnCommentsOn.bind(this)}
                    typedCommentsOn={this.state.typedCommentsOn}
                    turnTypedCommentsOn={this.turnTypedCommentsOn.bind(this)}
                  />

      }

      // self.closeHoverText();
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
          <Scene antialias="true">
            <Camera>
              <a-cursor
                animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
                geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
                material={"color:" + (self.state.recording ? '#FF3D00' : '#61ffff') + "; shader: flat"}
                >
              </a-cursor>
            </Camera>


            <a-assets>
              {images}
              {fullImages}
              {bigPic}
              {commentPics}
              <img id="profilePic" crossOrigin="anonymous" src={self.state.profilePic} />
              <img id="lobby-_1" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/lr2.jpg" />

              <img id="close" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/ui-icons/icon-home_512x512.png" />
              <img id="like" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/ui-icons/icon-favorite_512x512.png" />
              <img id="liked" crossOrigin="anonymous" src="http://i.imgur.com/XTLYqU3.png" />

              <img id="mic" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/ui-icons/icon-mic_512x512.png" />
              <img id="micActivated" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/ui-icons/icon-mic-activated_512x512.png" />


              <img id="bookmark" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/plus-hi.png" />
              <img id="exit" crossOrigin="anonymous" src="https://s3.amazonaws.com/vrpics/ui-icons/icon-dashboard_512x512.png" />
              <img id="input" crossOrigin="anonymous" src="http://i.imgur.com/jRdxNpi.png" />
              <img id="inputActivated" crossOrigin="anonymous" src="http://i.imgur.com/JmLIjXY.png" />

            </a-assets>
            {vrView}

            {self.renderComments()}

            {self.state.typedCommentBox ? 
            	/*
            	<UnifiedComponent
            	 look-at="[camera]"
            	  clickFunction={() => {
            	    // console.log('Onclick event is currently:', event)
            	    // console.log('ID ')
            	    self.showComment(idx);
            	  }}
            	  commentID= {idx}
            	  source={comment.src}
            	  position={`${Number(comment.x)} ${Number(comment.y)} ${Number(comment.z)}`}
            	  rotation="0 0 0"
            	  hidePlane={() => {
            	    // // console.log('Hiding plane now... Data is:')
            	    // self.setState({showComment: false});
            	    self.getAllPhotos();
            	    self.hideComment(idx);
            	  }}
            	  scale='0 0 0'
            	  header={comment.firstName}
            	  // header='Kobe'
            	  wikiName='Louvre_Pyramid'
            	  headerAdjust='-0.75' // lower moves it to the left, higher to the right
            	  text={comment.body}
            	  textAdjust='-0.1' //lower moves this down, higher moves this up
            	  imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
            	  displayedComments={self.state.displayedComments}
            	  profilePic={self.state.profilePic}
            	  createdAt={comment.createdAt}
            	/>
							*/


							//Form components
							/*
							<Entity
								position="0 0 -2"
								rotation="0 0 0"
							>
								<div onSubmit={(event) => {
									event.preventDefault();
									// console.log('CommentText submitted! Body:' + document.getElementsByName('CommentText')[0].value);
									}}>
							  	<h1>Hello, world.</h1>
							  	<form>Comment: <input name="CommentText" />
							  	<button>Submit</button>
							  	</form>
							  </div>
							 </Entity>
            	*/





            	//Test Plain Component
            	/*
            	<Entity
            		position="0 0 -3"
            		rotation="0 0 0"
            		geometry="primitive: plane; height: 0.5; width: 0.5"
            		material="color: black"
            	/>
							*/

							//Test Form
							/*
							<Entity position="0 0 -3" rotation="0 0 0">
								<div onSubmit={(event) => {
									event.preventDefault();
									// console.log('CommentText submitted! Body:' + document.getElementsByName('CommentText')[0].value);
								}}>
							  	<h1>Please enter your comment:</h1>
							  	<form>Comment: <input name="CommentText" />
							  	<button>Submit</button>
							  	</form>
							  </div>
							 </Entity>
							*/

							 //Second Test Form
							/*
            	<Entity 
            		// bmfont-text={{align: 'left', width: '750', color: 'yellow', text: "Testing"}}
            	  // position={adjustHeaderTextCoordinates(props.position, Width, Height)}
            	  input={{color: 'red', text: "Test Form"}}
            	  position='0 1 -2'
            	  rotation='0 0 0'
            	  scale='1.85 1.85 0'
            	/>
							*/







							//Test UnifiedComponent
							/*
							<UnifiedComponent
							  look-at="[camera]"
							  clickFunction={() => {
							    // console.log('Onclick event is currently:', event)
							    // console.log('ID ')
							    // self.showComment(idx);
							  }}
							  commentID= "0"
							  source="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Assembled_Google_Cardboard_VR_mount.jpg/1024px-Assembled_Google_Cardboard_VR_mount.jpg"
							  position="0 0 -2"
							  rotation="0 0 0"
							  hidePlane={() => {
							    // // console.log('Hiding plane now... Data is:')
							    // self.setState({showComment: false});

							    // self.getAllPhotos();
							    // self.hideComment(idx);
							    // console.log('hidePlane function invoked')
							  }}
							  scale='0 0 0'
							  header='Test User'
							  // header='Kobe'
							  wikiName='Louvre_Pyramid'
							  headerAdjust='-0.75' // lower moves it to the left, higher to the right
							  text="Test Comment"
							  textAdjust='-0.1' //lower moves this down, higher moves this up
							  imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
							  displayedComments={self.state.displayedComments}
							  profilePic={self.state.profilePic}
							  createdAt="2016-12-01 20:39:59"
							/>
							*/

							//Sample TextPlane
							/*
							<TextPlane 
							  planeClick={() => // console.log('displayedComments is currentlyyyy:')}

							  id="sampleFormTextPlane"
							  source="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Assembled_Google_Cardboard_VR_mount.jpg/1024px-Assembled_Google_Cardboard_VR_mount.jpg"
							  position="0 0 -2"
							  rotation="0 0 0"
							  hidePlane={() => {
							    // // console.log('Hiding plane now... Data is:')
							    // self.setState({showComment: false});

							    // self.getAllPhotos();
							    // self.hideComment(idx);
							    // console.log('hidePlane function invoked')
							  }}

							  scale='0 0 0'
							  header='Test User'
							  // header='Kobe'
							  wikiName='Louvre_Pyramid'
							  headerAdjust='-0.75' // lower moves it to the left, higher to the right
							  text="Test Comment"
							  textAdjust='-0.1' //lower moves this down, higher moves this up
							  imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Le_Louvre_-_Aile_Richelieu.jpg/800px-Le_Louvre_-_Aile_Richelieu.jpg '
							  commentID="0"
							  profilePic={self.state.profilePic}
							  createdAt="Sat Jan 14 2017 00:46:14 GMT-0800 (PST)"
							/>
							*/

							null

            	:

            	null
            }


              {self.state.guestLogin? 

              // <Entity
              //   position="0 2 -3"
              //   rotation="0 0 0"
              //   geometry="primitive: plane; height: 0.5; width: 0.5"
              //   material="color: red"
              // />

              null

              :

              null
            }



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


