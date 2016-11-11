var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static(__dirname + '/../react-client'))


app.listen(3000, function() {
  console.log('listening on port 3000')
})