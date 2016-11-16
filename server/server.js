const metadata = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

/** WIKIPEDIA API QUERY (start) **/

// var sampleSearch = "Macy's";
var routes = ['/', '/sf', '/lobby', '/louvre', '/berlin', '/milan/'];


routes.forEach(function(route) {
  app.use(route, express.static(__dirname + '/../react-client'))
});

var sampleSearch = "Normandy_landings";


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

app.listen(port, () => {
  console.log(`🌐  listening on port ${port} for app ${metadata.name} 🌐`);
});
