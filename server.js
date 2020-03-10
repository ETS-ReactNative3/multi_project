var cluster = require('cluster');;
var numCPUs = require('os').cpus().length;
require('app-module-path').addPath(__dirname);
if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
    });

  } else {
    const App = require('./app');
    require('dotenv').config();
    global.config = require('./config');
    new App();
  }