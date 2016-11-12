import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app.js';
import Lobby from './components/Lobby.js';


class Index extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Lobby} />
        <Route path="/city" component={App} />
      </Router>
    );
  }
}

ReactDOM.render(<Index/>, document.querySelector('.scene-container'));