import React from 'react';
import { Link, withRouter } from 'react-router';

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
  </div>

)