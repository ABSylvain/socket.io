var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
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

io.on('connection', function(socket) {
    io.emit('co', 'Connection ok');

    socket.on('mess', function(from, msg) {
        console.log('I received a private message by ' + from + msg);
    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});