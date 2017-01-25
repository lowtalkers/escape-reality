import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		let self = this;
		this.state = {
			//enter state properties here
		}
	}

  render() {
    return (


    	<div onSubmit={(event) => {
    		event.preventDefault();
    		// console.log('CommentText submitted! Body:' + document.getElementsByName('CommentText')[0].value);
    	}}>
      	<h1>Please enter your comment:</h1>
      	<form>Comment: <input name="CommentText" />
      	<button>Submit</button>
      	</form>
      </div>


    );
  }
}


export default App;
