require('dotenv').config();
const bodyParser = require('body-parser');
const metadata = require('../package.json');
const compression = require('compression');
const express = require('express');
const path = require('path');
const redis = require('redis');
const sharp = require('sharp');

const utils = require('./lib/utilities.js');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const userController = require('../db/controllers/users.js');
const bookmarkController = require('../db/controllers/bookmarks.js');
const photoController = require('../db/controllers/photos.js');

const port = process.env.NODE_PORT;
const secret = process.env.SESSION_SECRET;
const AWSaccessKey = process.env.ACCESSKEYID;
const AWSsecretKey = process.env.SECRETACCESSKEY;

const redisClient = redis.createClient();
const app = express();

app.use(bodyParser.json({limit: '40mb'}));
app.use(compression()); // gzip compress all responses
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));

const routes = ['/', '/signup', '/signin', '/dashboard', '/bookmarks', '/lobby'];

for (const route of routes) {
  app.get(route, userController.checkAuth, (req, res) => {
    if (route === '/') {
      res.redirect('/dashboard');
    } else {
      res.sendFile(path.join(__dirname, '/../react-client/index.html'));
    }
  });
}


/** AWS CONFIG **/
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: AWSaccessKey,
  secretAccessKey: AWSsecretKey
});
const s3Bucket = new AWS.S3( { params: {Bucket: 'vrpics'} } );

/** AWS UPLOAD **/
app.post('/upload', (req, res) => {
  const imageBuffer = utils.decodeBase64Image(req.body.filePath);

  console.log(req.body.fileName);
  var date = new Date().getTime()// fecha.format(new Date(), 'mediumDate').replace(/\s+/g, '');
  let file = req.body.fileName.split('.');
  let imgType = file[1]
  // console.log(req.body.fileName);
  let fileName = file[0] + date;

  const data = {
    Bucket: 'vrpics',
    Key: fileName,
    Body: imageBuffer.data,
    ContentType: 'image/' + imgType
  };

  sharp(imageBuffer.data)
    .resize(400, 400)
    .toBuffer()
    .then( data => {
      imageBuffer.resized = data;
      console.log(data);
    })
    .catch( err => console.log(err));

  s3Bucket.putObject(data, (err, data) => {
    if (err) {
      console.log('Error uploading data: ', data, err);
    } else {
      s3Bucket.putObject({
        Bucket: 'vrpics',
        Key: 'resized-' + req.body.fileName,
        Body: imageBuffer.resized,
        ContentType: 'image/' + imgType
      }, (err, data) => {
        if (err) {
          console.log('Error uploading data: ', data, err);
        } else {
          console.log('succesfully uploaded the resized image!');
        }
      });
      console.log('succesfully uploaded the image!');
    }
  });
  res.status(200).send(data);
});


/* auth routes -------------------------------------------------------------- */
app.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = {};
  userController.findOne({where: {email: email}}, user => {
    if (!user) {
      response.auth = false;
      res.send(response);
    } else {
      userController.comparePassword(user, password, match => {
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

  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  userController.findOne({where: {email: email}}, user => {
    if (!user) {
      bcrypt.hash(password, null, null, (err, hash) => {
        req.body.password = hash;
        userController.create(req.body, user => {
          userController.createSession(req, res, user, {auth: true});
        });
      });

    } else {  //if user exists
      res.send('User exists');
    }
  });
});

app.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.send('session destroyed');
  });
});

/* auth routes end ---------------------------------------------------------- */


/**
 * Get Scrubbed Wikipedia Paragraph
 *
 * String 'exactWikiExtract' must match the last fragment of Wikipedia URLs:
 * https://en.wikipedia.org/wiki/Macy's
 * https://en.wikipedia.org/wiki/Sant%27Agnese_in_Agone
 *
 * @param  {object}    {exactWikiTitle: string}
 * @return {string}    Scrubbed first paragraph of Wikipedia article
 */
app.get('/getWiki', (req, res) => {
  const wikiFragment = req.query.exactWikiTitle;
  redisClient.get(wikiFragment, function(err, reply) {
    if (err) {
      console.log('🍊  Error in fetching from Redis', err);
      res.status(200).send('Error in fetching from Redis', err);
    }
    if (reply) {
      console.log('🍊  Found in Redis!', wikiFragment);
      res.status(200).send(reply);
    }
    if (!reply) {
      console.log('🍊  Not found in Redis:', wikiFragment);
      utils.fetchWiki(req, res);
    }
  });
});

app.get('/addBookmark', (req, res) => {
  userController.findOne({where: {email: req.session.email}}, user => {
    bookmarkController.findOne({where: {title: req.query.exactWikiTitle}},
      bookmark => {
        user.addBookmark(bookmark);
        console.log('bookmark added');
        res.send('Added!');
      });
  });
});

app.get('/allBookmarks', (req, res) => {
  userController.findOne({where: {email: req.session.email}}, user => {
    console.log(user);
    user.getBookmarks().then(bookmarks => {
      res.send(bookmarks);
    });
  });
});

app.post('/addPic', (req, res) => {
  userController.findOne({where: {email: req.session.email}}, user => {
   photoController.create(req.body, photo => {
      photo.setUser(user);
      console.log(photo);
      res.send('Added!');
    })
  });
});

app.get('/topPics', (req, res) => {
  console.log('in top pics!!');
  photoController.findAll((photos) => {
    res.send(photos);
  });
});

app.use(express.static(path.join(__dirname, '../react-client')));

// wildcard route
app.get('*', function(req, res) {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`🌎  Listening on port ${port} for app ${metadata.name} 🌏`);
});