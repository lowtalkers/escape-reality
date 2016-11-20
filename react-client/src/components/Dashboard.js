import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

const signOut = () => {
  $.get({
    url: '/signOut',
    success: (data) => {
      console.log(data)
    },
    error: (error) => {
      console.error('error in get bookmarks', error);
      $('.error').show();
    },
  });
}

export default props => (
  <div>
    <Link to="/bookmarks">
      <button>
        <h1>Bookmarks</h1>
      </button>
    </Link>
    
    <Link to="/lobby">
      <button>
        <h1>Explore!</h1>
      </button>
    </Link>

    <Link to="/signin">
      <button onClick={() => {signOut()}}>
        <div>Sign Out</div>
      </button>
    </Link>
  </div>

)