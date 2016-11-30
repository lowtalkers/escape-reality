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
const likeController = require('../db/controllers/likes.js');
const commentController = require('../db/controllers/comments.js');

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

const routes = ['/', '/signup', '/signin', '/dashboard', '/bookmarks', '/lobby', 'getUserPic'];

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
  var date = new Date().getTime(); // fecha.format(new Date(), 'mediumDate').replace(/\s+/g, '');
  let file = req.body.fileName.split('.');
  let imgType = file[1];
  // console.log(req.body.fileName);
  let imgName = file[0] + date;


  const data = {
    Bucket: 'vrpics',
    Key: imgName + '.' + imgType,
    Body: imageBuffer.data,
    ContentType: 'image/' + imgType
  };

  let imgLink = 'https://s3.amazonaws.com/' + data.Bucket + '/' + imgName + '.' + imgType;

  sharp(imageBuffer.data)
    .resize(512, 512)
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
        Key: 'resized-' + imgName + '.' + imgType,
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

  userController.findOne({where: {email: req.session.email}}, user => {
    photoController.create({
      title: imgName + '.' + imgType, 
      imageLink: imgLink, 
      description: req.body.description
    }, 
    photo => {
      photo.setUser(user);
      console.log('Found user\'s uploaded photo in DB', photo);
      res.status(200).send(data);
    });
  });
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

app.get('/getWikiArticleTitle', (req, res) => {
  utils.fetchArticleWikiName(req, res);
})

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
    // Sequelize join tables get automatic functions
    // between models, that's how getBookmarks() is available
    // even though it's not a function on the User model
    user.getBookmarks().then(bookmarks => {
      res.send(bookmarks);
    });
  });
});

app.get('/getUserPic', (req, res) => {
  userController.findOne({where: {email: req.session.email}}, user => {
    const pic = user.get('profilePic');
    console.log('🍊  profile pic is', pic);
    res.send(pic);
  });
});

app.get('/topPics', (req, res) => {
  console.log('in top pics!!');
  photoController.findAll((photos) => {
    res.send(photos);
  });
});

app.post('/like', (req, res) => {
  userController.findOne({where: {email: req.session.email}}, user => {
    photoController.findOne({where: {title: req.body.photoName}}, photo => {
      likeController.findOrCreate({where: {user_id: user.get('id'), photo_id: photo.get('id')}}, like => {
        res.status(200).send(like);
      })
    })
  });
});

app.get('/commentData', (req, res) => {
  photoController.findOne({where: {title: req.query.photoName}}, photo => {
    commentController.findAll({where: {photo_id: photo.get('id')}}, (comments) => {
      res.status(200).send(comments);
    })
  });
});

app.post('/comment', (req, res) => {
  console.log(req.body, 'IN COMMENT ROUTE');
  userController.findOne({where: {email: req.session.email}}, user => {
    photoController.findOne({where: {title: req.body.photoName}}, photo => {
      commentController.findOrCreate({where: {user_id: user.get('id'), photo_id: photo.get('id')}, defaults: {body: req.body.body, coordinates: req.body.coords}}, comment => {
        res.status(200).send(comment);
      })
    })
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