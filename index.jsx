import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from '';
import Signin from '';
import Signup from '';
import Lobby from '';

class Index extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Lobby} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/app" component={App} />
      </Router>
    );
  }
}


ReactDOM.render(<Index />, document.getElementById('app'));