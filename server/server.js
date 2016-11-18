const metadata = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const userController = require('../db/controllers/users.js')

var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');

/** WIKIPEDIA API QUERY (start) **/

// var sampleSearch = "Macy's";
var routes = ['/', '/signup', '/signin', '/sf', '/lobby', '/louvre', '/berlin', '/milan/', '/rome'];

app.use(bodyParser.json());

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));


routes.forEach(function(route) {
  app.get(route, userController.checkAuth, function(req, res) {
    if (route === '/') {
      res.redirect('/lobby')
    } else {
      res.sendFile(path.join(__dirname, '/../react-client/index.html'))      
    }
  })
});


/* auth routes -------------------------------------------------------------- */
app.post('/signin', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var response = {};
  userController.findOne({where: {email: email}}, function(user) {

  if (!user) {
    response.auth = false;
    res.send(response)
  } else {
      userController.comparePassword(user, password, function(match) {
        if (match) {
          response.auth = true;
          userController.createSession(req, res, user, response);
        } else {
          response.auth = false;
          res.send(response)
        }
      });
    }
  })
})

app.post('/signup', function(req, res) {

  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body)
  userController.findOne({where: {email: email}}, function(user) {

    if (!user) {
      bcrypt.hash(password, null, null, function(err, hash) {
        req.body.password = hash;
        userController.create(req.body, function(user) {
          userController.createSession(req, res, user, {auth:true});
        });
      });

    } else {  //if user exists
      res.send('User exists');
    }
  });
});

<<<<<<< c1357bc79ac6012c5176d070e1e4ba3b7c7d0a3b
var sampleSearch = "Normandy_landings";
=======
// When sign in page loads, session is checked


// app.get('/signup', userController.checkAuth, function(req, res) {
//   res.sendFile(path.join(__dirname, '/../react-client/index.html'))
// });

// app.get('/signin', userController.checkAuth, function(req, res) {
//   res.sendFile(path.join(__dirname, '/../react-client/index.html'))
// });
/* auth routes end ---------------------------------------------------------- */
>>>>>>> Setup authentication


// request('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' + sampleSearch + '&format=json&exintro=1', (err, res, body) => {
//   if (err) {
//     console.log(err);
//   } else {
//     var query = (JSON.parse(body)).query.pages;
//     var text = query[(Object.keys(query)[0])].extract;
//     console.log('Unscrubbed text:', text);

//     let regex = /(<([^>]+)>)/ig;
//     // body = `<p>The <b>Louvre</b> or the <b>Louvre Museum</b> (French: <span lang=\"fr\" xml:lang=\"fr\"><i>Musée du Louvre</i></span>, <small>pronounced: </small><span title=\"Representation in the International Phonetic Alphabet (IPA)\">[myze dy luvʁ]</span>) (<small>French</small> <span><span><span><span> </span></span> </span></span>) is the world's largest museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement (district or ward). Nearly 35,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square metres (782,910 square feet). The Louvre is the world's second most visited museum after the Palace Museum in China, receiving more than 9.26 million visitors in 2014.</p>`;
//     result = text.replace(regex, "");
//     let regexApostrophes = /(\')/ig;
//     let regexNewlines = /(\n)/ig;
//     let output = result.replace(regexApostrophes, "'").replace(regexNewlines, "");
//     console.log('Scrubbed output is:', output);
//     return output;
//   }
// });

/** WIKIPEDIA API QUERY (end) **/

app.use(express.static(path.join(__dirname, '../react-client')));

app.listen(port, () => {
  console.log(`🌐  listening on port ${port} for app ${metadata.name} 🌐`);
});
