"use strict";

const request = require('request');
const redis = require('redis');
const Entities = require('html-entities').AllHtmlEntities;
const bookmarkController = require('../../db/controllers/bookmarks.js');

// const redisClient = redis.createClient();
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

      // Send response to client first (faster),
      // save to databases later (slower)
      res.status(200).send(paragraph);

      // Save to Redis
      const wikiFragment = req.query.exactWikiTitle;
      // redisClient.set(wikiFragment, paragraph, redis.print);

      // Save to database
      bookmarkController.findOne({where: {title: wikiFragment}}, bookmark => {
        if (bookmark) {
          console.log('🍊  bookmark already exists, avoiding save to DB:', wikiFragment); 
        }
        if (!bookmark) {
          bookmarkController.create({title: wikiFragment, paragraph: paragraph},
            bookmark => {
              console.log('🍊  Saved to database:', wikiFragment);
            });
        }
      });
    }
  });
};

// module.exports.fetchArticleWikiName = function(req, res) {
//   console.log('Beginning article wiki name fetch...');
//   const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${req.query.exactWikiTitle}%20Pyramid&limit=1&namespace=0&format=jsonfm`;
//       console.log('Error in Wikipedia fetch', err);
//       return;
  

//     let articleWikiName = JSON.parse(body)[0][0];
//     console.log('Fetched articleWikiName:', articleWikiName);
//     res.status(200).send(articleWikiName);
//   })

module.exports.decodeBase64Image = function(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
};