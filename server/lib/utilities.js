const request = require('request');
const redis = require('redis');
const Entities = require('html-entities').AllHtmlEntities;
const bookmarkController = require('../../db/controllers/bookmarks.js');

const redisClient = redis.createClient();
const entities = new Entities(); // decode strings like '&amp;'

module.exports.fetchWiki = function(req, res) {
  console.log('🍊  Starting Wikipedia API request for:', req.query.exactWikiTitle);
  const url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles='
              + req.query.exactWikiTitle 
              + '&format=json&exintro=1';

  request(url, (err, requestResponse, body) => {
    if (err) {
      console.log('Error in Wikipedia fetch', err);
    } 

    if (!err) {
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
      let paragraph = result.replace(regexApostrophes, '\'');
      paragraph = entities.decode(paragraph);
      console.log('🍊  Sending scrubbed text to client:', paragraph.slice(0, 55) + '...');

      // Save to Redis
      const wikiFragment = req.query.exactWikiTitle;
      redisClient.set(wikiFragment, paragraph, redis.print);

      // Save to database
      bookmarkController.create({title: wikiFragment, paragraph: paragraph}, 
        bookmark => {
          console.log('🍊  Saved to database:', wikiFragment);
        });

      res.status(200).send(paragraph);
    }
  });
};