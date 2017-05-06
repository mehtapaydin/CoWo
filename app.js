var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

var logger = require('morgan');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render('index')
});

app.get('/table', function (req, res) {
  res.render('table')
});

app.get('/device', function (req, res) {
  res.render('device')
});

app.get('/rainy', function (req, res) {
  res.render('rainy')
});

app.get('/snowy', function (req, res) {
  res.render('snowy')
});

app.get('/cloudy', function (req, res) {
  res.render('cloudy')
});

app.get('/2016', function (req, res) {
  res.render('2016')
});

app.get('/medical', function (req, res) {
  res.render('medical')
});

app.get('/mehtap', function (req, res) {
  res.render('mehtap')
});

app.use(notFoundHandler);
app.use(errorHandler);

function notFoundHandler(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {error: err, errorStatus: err.status})
}

// Enable Socket.io
var server = http.Server(app);
var io = require('socket.io')(server);

// object to store table sockets
var tableSockets = {};

// A user connects to the server (opens a socket)
io.on('connection', function (socket) {

  console.log("a new device connected: " + socket.id);

  // device disconnected
  socket.on('disconnect', function () {

    console.log('device disconnected: ' + socket.id);

    // if it's a table
    if (socket.tableId) {
      // remove table socket
      delete tableSockets[socket.tableId];
    }
  });

  // receives a connect message from the card table
  socket.on('table-connect', function (tableId) {
    // ...  and stores the card table socket
    console.log('table connected: ' + tableId);

    tableSockets[tableId] = socket;
    socket.tableId = tableId;
  });

  // receives a connect message from a phone
  socket.on('phone-connect', function (tableId) {
    var tableSocket = tableSockets[tableId];
    if (tableSocket) {
      // ... informs table that a phone has connected
      tableSocket.emit('phone-connect');
    }
  });

  // receives a move from a phone
  socket.on('phone-move', function (data) {
    var tableSocket = tableSockets[data.tableId];
    if (tableSocket) {
      // ... and forwards the current angle to the card table
      tableSocket.emit('phone-move', data.angle);
    }
  });

  // receives a throw card message from a phone
  socket.on('phone-throw-card', function (data) {
    var tableSocket = tableSockets[data.tableId];
    if (tableSocket) {
      // ... and forwards the data to the card table
      tableSocket.emit('phone-throw-card', data);
    }
  });

});

server.listen(app.get('port'), function () {
  console.log('Server listening at port: ' + app.get('port'))
});