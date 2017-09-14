var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
let pseudo = 'boby';
let portSer = 9000;
let connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'chat'
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

function sendToSql(arg) {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log(arg);
    var sql = "INSERT INTO message(pseudo, message) VALUES (?, ?)";
    var inserts = ['blopi', arg];
    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query,' + err);
        else
            console.log('The solution is: ', rows);
    })
};

function req() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    connection.query('SELECT * FROM message', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query,' + err);
        else
            console.log(rows);
    })
};

server.listen(portSer, function(err) {
    if (err) {
        console.log('Fail start server : ' + err);
    }
    console.log('Server start on : ' + portSer);
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        sendToSql(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});