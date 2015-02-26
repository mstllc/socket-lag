var express = require('express');
var morgan = require('morgan');
var path = require('path');

// Root Path
var root = path.normalize(__dirname);

// Express app
var app = express();

// Configure Express
app.use(express.static(path.join(root, 'public')));
app.set('views', path.join(root, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));

// HTTP Routing
require('./server/httpRoutes.js')(app);

// Create socket.io server
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Socket Routing
require('./server/socketRoutes.js')(io);

// Server Port & IP
var port = process.env.PORT || 6969;
var ip = '0.0.0.0';

// Kickoff Server
server.listen(port, ip, function() {
  console.log('Express server listening on %s:%d', ip, port);
});
