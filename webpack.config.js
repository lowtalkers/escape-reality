// Webpack is a module bundler, which means it takes modules with dependencies
// and packages them into one bundle file. In this configuration, it also uses
// babel to transpile the files before bundling. Webpack knows which files to include
// by starting with the 'entry' file in the config, and following the es6 import
// statements. 
var webpack = require('webpack');
var path = require('path');

// Build directory is where the bundle file will be placed
var BUILD_DIR = path.resolve(__dirname, 'react-client/build');
// App directory is where all of your raw JSX files will be placed
var APP_DIR = path.resolve(__dirname, 'react-client/src/js/app.js');

// The files in the app directory will get transpiled and packaged into one
// file, bundle.js, which will get saved in the BUILD_DIR. 
// If you use the `npm run dev-react`, webpack will generate source maps and
// watch your files for changes. 

// While developing your app in react, you'll want to have two terminal tabs open - 
// one that is running `npm run dev-react` and one that is running `npm start`
module.exports = {
  entry: APP_DIR,
  output: { 
    path: BUILD_DIR, 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};