var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var NoIP = require('no-ip')
const PORT = 3000;
const HOST = '192.168.1.100';

var noip = new NoIP({
    hostname: 'keyzer.ddns.net',
    user: 'keyzer98@hotmail.com',
    pass: 'reach2552'
})

app.use(express.static('Client'));

app.get('/hola-mundo',function(req,res){
    res.status(200).send('hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    textMessage: 'Bienvenido al chat privado de casa azul',
    nickname: 'Bot-CasaAzul'
}];

io.on('connection',function(socket){
    console.log("El nodo con IP:"+ socket.handshake.address + " se ha conectado...");
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});
    noip.on('error', function(err){
    console.log(err)
  })

  noip.on('success', function(isChanged, ip){
    console.log(isChanged, ip)
  })

  noip.update()
server.listen(PORT,HOST, function(){
    console.log(`Servidor está funcionando en http://${HOST}:${PORT}`);

});

