const metadata = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

/** WIKIPEDIA API QUERY (start) **/

// var sampleSearch = "Macy's";
var routes = ['/', '/sf', '/lobby'];

routes.forEach(function(route) {
  app.use(route, express.static(__dirname + '/../react-client'))
})

// request('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' + sampleSearch + '&format=json&exintro=1', (err, res, body) => {
//   if (err) {
//     console.log(err);
//   } else {
//     var query = (JSON.parse(body)).query.pages;
//     var text = query[(Object.keys(query)[0])].extract;
//     console.log(text);
//   }
// });

/** WIKIPEDIA API QUERY (end) **/

app.listen(port, () => {
  console.log(`🌐  listening on port ${port} for app ${metadata.name} 🌐`);
});
