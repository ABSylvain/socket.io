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

connection.connect();

io.on('connection', function(socket) {

    socket.on('mess', function(message) {
        connection.query('INSERT INTO message(message, pseudo) VALUES (:message,:pseudo)',
            connection.bindParam(message, ':message'),
            connectionbindParam(pseudo, ':pseudo'),
            function(error, results, fields) {
                if (error) throw error;
            });
    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});
connection.end();