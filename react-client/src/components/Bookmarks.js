import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    }
  }

  getBookmarks() {
    let self = this;
    $.get({
      url: '/allBookmarks',
      success: (data) => {
        console.log(data)
        self.setState({bookmarks: data})
      },
      error: (error) => {
        console.error('error in get bookmarks', error);
        $('.error').show();
      },
    });
  }

  componentWillMount() {
    this.getBookmarks();
  }

  render() {
    let self = this;
    return (
      <div>
        <h1>Your Bookmarks!</h1>
        <ul>
        {
          self.state.bookmarks.map(function(bookmark) {
            return (
              <li className="bookmark">
                <div className="bookmarkTitle">{bookmark.title}</div>
                <div className="bookmarkParagraph">{bookmark.paragraph}</div>
              </li>
            )
          })
        }
        </ul>
        <Link to="/dashboard"><button>Back</button></Link>
      </div>
    )
  }
}

export default withRouter(Bookmarks, { withRef: true });

