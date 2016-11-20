const bodyParser = require('body-parser');
const metadata = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const userController = require('../db/controllers/users.js');
const bookmarkController = require('../db/controllers/bookmarks.js');
const utils = require('./lib/utilities.js');

var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');

var routes = ['/', '/signup', '/signin', '/dashboard', '/bookmarks', '/sf', '/lobby', '/louvre', '/berlin', '/milan/', '/rome', '/hr'];

app.use(bodyParser.json());

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

routes.forEach(function(route) {
  app.get(route, userController.checkAuth, function(req, res) {
    if (route === '/') {
      res.redirect('/dashboard');
    } else {
      res.sendFile(path.join(__dirname, '/../react-client/index.html'));
    }
  });
});


/* auth routes -------------------------------------------------------------- */
app.post('/signin', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var response = {};
  userController.findOne({where: {email: email}}, function(user) {
    if (!user) {
      response.auth = false;
      res.send(response);
    } else {
      userController.comparePassword(user, password, function(match) {
        if (match) {
          response.auth = true;
          userController.createSession(req, res, user, response);
        } else {
          response.auth = false;
          res.send(response);
        }
      });
    }
  });
});

app.post('/signup', function(req, res) {

  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);
  userController.findOne({where: {email: email}}, function(user) {

    if (!user) {
      bcrypt.hash(password, null, null, function(err, hash) {
        req.body.password = hash;
        userController.create(req.body, function(user) {
          userController.createSession(req, res, user, {auth: true});
        });
      });

    } else {  //if user exists
      res.send('User exists');
    }
  });
});

/* auth routes end ---------------------------------------------------------- */


//-----------------------------------------------------------------
//------------------ GET WIKIPEDIA EXTRACT ------------------------
//-----------------------------------------------------------------
//
// Client needs to send a query string with the key "exactWikiTitle" that has
// the exact Wikipedia article title, like the final part of these URLs:
//
//   https://en.wikipedia.org/wiki/Macy's
//   https://en.wikipedia.org/wiki/Normandy_landings
//   https://en.wikipedia.org/wiki/Sant%27Agnese_in_Agone

app.get('/getWiki', function(req, res) {
  bookmarkController.findOne({where: {title: req.query.exactWikiTitle}}, function(bookmark) {
    if(!bookmark) {
      utils.fetchWiki(req, res);
    } else {
      res.status(200).send(bookmark.get('paragraph'));
    }
  })
});

app.get('/addBookmark', function(req, res) {
  userController.findOne({where: {email: req.session.email}}, function(user) {
    bookmarkController.findOne({where: {title: req.query.exactWikiTitle}}, function(bookmark) {
      user.addBookmark(bookmark);
      console.log('bookmark added')
      res.send('Added!');
    });
  });
})

app.get('/allBookmarks', function(req, res) {
  userController.findOne({where: {email: req.session.email}}, function(user) {
    user.getBookmarks().then(function(bookmarks) {
      res.send(bookmarks)
    })
  });
});


app.use(express.static(path.join(__dirname, '../react-client')));

app.listen(port, () => {
  console.log(`🌎  Listening on port ${port} for app ${metadata.name} 🌏`);
});
