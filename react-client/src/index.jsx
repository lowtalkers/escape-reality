import 'aframe';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App.js';
import Lobby from './components/Lobby.js';
import SF from './components/SF.js'
import Louvre from './components/Louvre.js';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="lobby" component={Lobby} />
      <Route path="sf" component={SF} />
      <Route path="louvre" component={Louvre} />
    </Route>  
  </Router>
), document.querySelector('.scene-container'));