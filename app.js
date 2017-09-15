var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var dateFormat = require('dateformat');
let pseudo = 'boby';
let portSer = 9000;
let connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'chat'
});

connection.connect(function(err) {
    if (err) throw err
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

function sendToSql(arg) {
    var now = new Date();
    let today = dateFormat(now, "isoDateTime");
    let sql = "INSERT INTO message(pseudo, message, instant) VALUES (?, ?, ?)";
    let inserts = [arg.mess, arg.pseudo, today];
    sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
    })
};

function req(io) {
    connection.query('SELECT * FROM message', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query,' + err);
        else
            io.emit('dbmess', rows);
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
    req(io);

    socket.on('chat message', function(msg) {
        console.log(msg);
        sendToSql(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        // deconnect from sql
    });
});