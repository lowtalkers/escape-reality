const metadata = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use('/', express.static(__dirname + '/../react-client'))
app.use('/city', express.static(__dirname + '/../react-client'))

app.listen(port, () => {
  console.log(`🌐  listening on port ${port} for app ${metadata.name} 🌐`);
});
