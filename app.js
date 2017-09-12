var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
let pseudo = 'boby';
let port = 9000;

server.listen(port, function(err) {
    if (err) {
        console.log('Fail start server : ' + err);
    }
    console.log('Server start on : ' + port);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var connection = mysql.createConnection({
    host: 'localhost',
    port: '8888',
    user: 'root',
    password: 'root',
    database: 'chat'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
connection.end();


io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});