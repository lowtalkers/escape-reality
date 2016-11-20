const bodyParser = require('body-parser');
const request = require('request');
const Entities = require('html-entities').AllHtmlEntities;
const bookmarkController = require('../../db/controllers/bookmarks.js');


const entities = new Entities(); // decode strings like '&amp;'

module.exports.fetchWiki = function(req, res) {
  console.log('🍊  Starting Wikipedia API request for ', req.query.exactWikiTitle);
  const url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles='
              + req.query.exactWikiTitle 
              + '&format=json&exintro=1';

  request(url, (err, requestResponse, body) => {
    if (err) {
      console.log('Error in Wikipedia fetch', err);
    } else {
      const query = (JSON.parse(body)).query.pages;
      
      if (query['-1']) {
        console.log('🍊  bad title for Wikipedia API request:', query['-1'].title);
        res.status(404).send('Not Found');
        return;
      }

      const text = query[(Object.keys(query)[0])].extract;
      const regex = /(<([^>]+)>)/ig;
      const firstParagraph = text.slice(0, text.indexOf('\n'));
      const result = firstParagraph.replace(regex, '');
      
      const regexApostrophes = /(\')/ig;
      let output = result.replace(regexApostrophes, '\'');
      output = entities.decode(output);
      console.log('🍊  Sending scrubbed text to client:', output.slice(0, 55) + '...');

      bookmarkController.create({title: req.query.exactWikiTitle, paragraph: output}, function(bookmark) {
          res.status(200).send(bookmark.get('paragraph'));
      });
    }
  });
};