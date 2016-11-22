var expect = require('chai').expect;
var request = require('request');

var User = require('../../db/models/users');
var Bookmarks = require('../../db/models/bookmarks');

var url = 'http://127.0.0.1:3000';

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
var xbeforeEach = function() {};
/************************************************************/


describe('', function() {

  xbeforeEach(function() {
    // log out currently signed in user
    request(url + '/signOut', function(error, res, body) {});

    // delete user Svnh from db so it can be created later for the test
    // db.knex('users')
    //   .where('username', '=', 'Svnh')
    //   .del()
    //   .catch(function(error) {
    //     // uncomment when writing authentication tests
    //     // throw {
    //     //   type: 'DatabaseError',
    //     //   message: 'Failed to create test setup data'
    //     // };
    //   });

    // delete user Phillip from db so it can be created later for the test
    // db.knex('users')
    //   .where('username', '=', 'Phillip')
    //   .del()
    //   .catch(function(error) {
    //     // uncomment when writing authentication tests
    //     // throw {
    //     //   type: 'DatabaseError',
    //     //   message: 'Failed to create test setup data'
    //     // };
    //   });
  });

  describe('Link creation:', function() {

    var requestWithSession = request.defaults({jar: true});

    xbeforeEach(function(done) {
      // create a user that we can then log-in with
      new User({
        'username': 'Phillip',
        'password': 'Phillip'
      }).save().then(function() {
        var options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': url + '/login',
          'json': {
            'username': 'Phillip',
            'password': 'Phillip'
          }
        };
        // login via form and save session info
        requestWithSession(options, function(error, res, body) {
          done();
        });
      });
    });


    describe('Creating bookmarks:', function() {
      var title = 'Batman';

      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': url + '/addBookmark?exactWikiTitle=' + title,
      };

      it('Responds with the string added!', function(done) {
        requestWithSession(options, function(error, res, body) {
          expect(res.body).to.equal('Added!');
          expect(res.body.code).to.not.be.null;
          done();
        });
      });

      it('New bookmarks create a database entry', function(done) {
        requestWithSession(options, function(error, res, body) {
          Bookmarks.findOrCreate({
            'title': 'Batman',
            'paragraph': 'Batman is a fictional superhero'
          }, function (bookmark) {
            console.log(bookmark, bookmark.dataValues);
            done();
          });
        });
      });

      it('Fetches the link url title', function (done) {
        requestWithSession(options, function(error, res, body) {
          Bookmarks.findOne({
            'title': 'Batman'
          }, function (bookmark) {
            console.log('bookmark', bookmark[0].title);
            expect(bookmark[0].paragraph).to.contain('Batman is a fictional superhero');
            done();
          });
        });
      });

    }); // 'Shortening links
  }); // 'Link creation'


  /**** Priviledged Access Test ****/

  xdescribe('Privileged Access:', function() {

    it('Redirects to signin page if a user tries to access the main page and is not signed in', function(done) {
      request(url + '/dashboard', function(error, res, body) {
        expect(res.req.path).to.equal('/signin');
        done();
      });
    });

    it('Redirects to signin page if a user tries to see all of the bookmarks and is not signed in', function(done) {
      request(url + '/bookmarks', function(error, res, body) {
        expect(res.req.path).to.equal('/signin');
        done();
      });
    });

    it('Redirects to signin page if a user tries to escape and is not signed in', function(done) {
      request(url + '/sf', function(error, res, body) {
        expect(res.req.path).to.equal('/signin');
        done();
      });
    });

  });


  /**** Account Creation Test ****/

  xdescribe('Account Creation:', function() {

    it('Signup creates a user record', function(done) {
      var options = {
        'method': 'POST',
        'uri': url + '/signup',
        'json': {
          'email': 'svnh@gmail.com',
          'password': 'svnh'
        }
      };

      request(options, function(error, res, body) {
        User.findOne({where: {email: 't'}}, function (user) {
          console.log('user found', user, user.dataValues);
          expect(res.auth).to.equal(true);
          done();
        });
      });

    });

    it('Signup logs in a new user', function(done) {
      var options = {
        'method': 'POST',
        'uri': url + '/signup',
        'json': {
          'email': 'phil@gmail.com',
          'password': 'phil'
        }
      };

      request(options, function(error, res, body) {
        expect(res.headers.location).to.equal('/dashboard');
        done();
      });
    });

  });


  /**** Account Login Test ****/

  xdescribe('Account Login:', function() {

    var requestWithSession = request.defaults({jar: true});

    xbeforeEach(function(done) {
      userController.findOrCreate({
        'email': 'phil@gmail.com',
        'password': 'phil'
      }, function (user) {
        console.log('user here', user);
        done();
      });
    });

    it('Logs in existing users', function(done) {
      var options = {
        'method': 'POST',
        'uri': url + '/signin',
        'json': {
          'email': 'phil@gmail.com',
          'password': 'phil'
        }
      };

      requestWithSession(options, function(error, res, body) {
        expect(res.headers.location).to.equal('/dashboard');
        done();
      });
    });

    it('Users that do not exist are kept on signin page', function(done) {
      var options = {
        'method': 'POST',
        'uri': url + '/signin',
        'json': {
          'email': 'Fred',
          'password': 'Fred'
        }
      };

      requestWithSession(options, function(error, res, body) {
        expect(res.headers.location).to.equal('/signin');
        done();
      });
    });

  });

});