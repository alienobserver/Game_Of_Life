const Game = require("./game");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

grCount = Game.grCount;
grEatCount = Game.grEatCount;
preCount = Game.preCount;
preEatCount = Game.preEatCount;
grassArr = Game.grassArr;
grassEaterArr = Game.grassEaterArr;
predatorArr = Game.predatorArr;
predatorEaterArr = Game.predatorEaterArr;
bombArr = Game.bombArr;
perGen = Game.perGen;
n = Game.n;
m = Game.n;
s = Game.n;
matrix = Game.matrix;
rand1 = Game.rand1;
rand2 = Game.rand2;
statistics = Game.statistics;
let rawdata;

Game.setup();

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
   console.log('a user connected');

   socket.on('disconnect', function () {
      console.log('user disconnected');
   });

   socket.on('send stat', function () {
      try{
         rawdata = fs.readFileSync('statistics.json');
         statistics = JSON.parse(rawdata);
         io.sockets.emit('get stat', statistics);
      }
      catch(error){
         
      }
   });

   socket.on('mode 1', function () {
      Game.mode_1();
   });

   socket.on('mode 2', function () {
      Game.mode_2();
   });

   socket.on('mode 3', function () {
      Game.mode_3();
   });

   socket.on('mode 4', function () {
      Game.mode_4();
   });

   socket.on('mode 5', function () {
      Game.mode_5();
   });

   socket.on('mode 6', function () {
      Game.mode_6();
   });

   setInterval(function () {
      Game.draw();
      Game.send_stat("statistics.json");
      io.sockets.emit('get canvas', matrix);
<<<<<<< HEAD
   }, 55);
=======
   }, 45);
>>>>>>> f6dc45c3489fc71bd8d8bece7f37b23461efba54

});

http.listen(3000, function () {
   console.log('listening on *:3000');
});

