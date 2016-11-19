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

import SignIn from './components/signInUpComponents/signin.jsx'
import SignUp from './components/signInUpComponents/signup.jsx'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="signup" component={SignUp} />
      <Route path="signin" component={SignIn} />
      <Route path="lobby" component={Lobby} />
      <Route path="sf" component={SF} />
      <Route path="louvre" component={Louvre} />
      <Route path="berlin" component={Berlin} />
      <Route path="milan" component={Milan} />
      <Route path="rome" component={Rome} />
      <Route path="hr" component={Hack} />
    </Route>
  </Router>
), document.querySelector('.scene-container'));