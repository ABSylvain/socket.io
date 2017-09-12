var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
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

connection.connect();

connection.query('SELECT ', function(error, results, fields) {
    if (error) throw error;

});

connection.end();

io.on('connection', function(socket) {

    socket.on('mess', function(from) {

    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});