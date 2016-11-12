import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Lobby from './components/lobby.jsx';
import App from './components/app.js';
import Test from './components/Test.js';


class Index extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Test} />
        <Route path="/city" component={App} />
      </Router>
    );
  }
}


ReactDOM.render(<Index/>, document.querySelector('.scene-container'));