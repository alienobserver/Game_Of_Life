var Game = require("./game");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
   console.log('a user connected');

   socket.on('disconnect', function(){
     console.log('user disconnected');
   });

   socket.on('send canvas', function (params) {
      grassArr = Game.grassArr;
      grassEaterArr = Game.grassEaterArr;
      predatorArr = Game.predatorArr;
      predatorEaterArr = Game.predatorEaterArr;
      matrix = Game.matrix;
      Game.setup();
      setInterval(function () {
         Game.draw();
         io.sockets.emit('get canvas', Game.ctx);
         console.log(params);
      } , 0 );
   })
});

http.listen(3000, function(){
   console.log('listening on *:3000');
});