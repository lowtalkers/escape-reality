import 'aframe';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App.js';
import Lobby from './components/Lobby.js';


import SF from './components/SF.js'
import Louvre from './components/Louvre.js';
import Berlin from './components/Berlin.js';
import Milan from './components/Milan.js';
import Rome from './components/Rome.js';
import Hack from './components/Hack.js';

import SignIn from './components/signInUpComponents/signin.jsx';
import SignUp from './components/signInUpComponents/signup.jsx';

import Dashboard from './components/Dashboard.js';
import Bookmarks from './components/Bookmarks.js';
import Image from './components/Image.js';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="signup" component={SignUp} />
      <Route path="signin" component={SignIn} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="bookmarks" component={Bookmarks} />
      <Route path="lobby" component={Lobby} />
      <Route path="*" component={Image} />
    </Route>
  </Router>
), document.querySelector('.scene-container'));