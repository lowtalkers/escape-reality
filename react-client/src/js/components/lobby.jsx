import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';


class Lobby extends React.Component {
  constructor(props) {
    super(props);
  }
  consoleLog() {
    var context = this;
    console.log('success', context);
    context.props.router.push('/city');
  }

  render() {
    return (
      <div>
        <h1> Lobby </h1>
        <div><button onClick={this.consoleLog.bind(this)}> GO VR MODE  </button> </div>
      </div>
    );
  }
}

export default withRouter(Lobby, { withRef: true });