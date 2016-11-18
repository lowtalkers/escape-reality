const bodyParser = require('body-parser');
const request = require('request');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities(); // decode strings like '&amp;'

module.exports.fetchWiki = function(req, res) {
  const url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles='
              + req.query.exactWikiTitle 
              + '&format=json&exintro=1';
              
  request(url, (err, requestResponse, body) => {
    if (err) {
      console.log('Error in Wikipedia fetch', err);
    } else {
      const query = (JSON.parse(body)).query.pages;
      const text = query[(Object.keys(query)[0])].extract;
      const regex = /(<([^>]+)>)/ig;
      const firstParagraph = text.slice(0, text.indexOf('\n'));
      const result = firstParagraph.replace(regex, '');
      
      const regexApostrophes = /(\')/ig;
      let output = result.replace(regexApostrophes, '\'');
      output = entities.decode(output);
      console.log('Sending scrubbed wiki text:', output);

      res.status(200).send(JSON.stringify(output));
    }
  });
};