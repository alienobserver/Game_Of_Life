const Grass = require("./grass.js");
const GrassEater = require("./grassEater.js");
const Predator = require("./predator.js");
const PredatorEater = require("./predatorEater.js");
const { createCanvas, loadImage } = require('canvas');
var fs = require('fs');

let side = 15;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let predatorEaterArr = [];
let n = 50;
let m = n;
let s = n;
let matrix = [];
let rand1 = 0;
let rand2 = 0;
var ctx;
var canvas;



function add_grasseater(percent){
    if(grassEaterArr.length < s*s*percent/100){
        for (let i = 0; i <  s*s*percent/100 ; i++) {
            rand1 = getRndInteger(0,s);
            rand2 = getRndInteger(0,s);
            matrix[rand1][rand2] = 2;
            person = new GrassEater.GrassEater(rand2, rand1, 2);
            grassEaterArr.push(person);
        }    
    }
    else if(grassEaterArr.length > s*s*20/100){
        for(let m in grassEaterArr){
            matrix[grassEaterArr[m].y][grassEaterArr[m].x] = 0;
            grassEaterArr.splice(m,1);
        }
    }
}

function add_predator(percent){
    if(predatorArr.length < s*s*percent/100){
        for (let i = 0; i <  s*s*percent/100 ; i++) {
            rand1 = getRndInteger(0,s);
            rand2 = getRndInteger(0,s);
            matrix[rand1][rand2] = 3;
            person = new Predator.Predator(rand2, rand1, 3);
            predatorArr.push(person);
        }    
    }
    else if(predatorArr.length > s*s*20/100){
        for(let m in predatorArr){
            matrix[predatorArr[m].y][predatorArr[m].x] = 0;
            predatorArr.splice(m,1);
        }
    }
}

function add_predatoreater(percent){
    if(predatorEaterArr.length < s*s*percent/100){
        for (let i = 0; i <  s*s*percent/100 ; i++) {
            rand1 = getRndInteger(0,s);
            rand2 = getRndInteger(0,s);
            matrix[rand1][rand2] = 4;
            person = new PredatorEater.PredatorEater(rand2, rand1, 4);
            predatorEaterArr.push(person);
        }    
    }
    else if(predatorEaterArr.length > s*s*10/100){
        for(let m in predatorEaterArr){
            matrix[predatorEaterArr[m].y][predatorEaterArr[m].x] = 0;
            predatorEaterArr.splice(m,1);
        }
    }
}

function add_grass(percent){
    if(grassArr.length < s*s*percent/100){
        for (let i = 0; i <  s*s*percent/100 ; i++) {
            rand1 = getRndInteger(0,s);
            rand2 = getRndInteger(0,s);
            matrix[rand1][rand2] = 2;
            person = new Grass.Grass(rand2, rand1, 1);
            grassArr.push(person);
        }    
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function pull_array(n){
    let a = []
    while(n > 0){
        a.push( getRndInteger( 0, 5 ) );
        n--;
    }
    return a;
}

function setup() {
    while(m > 0){
        matrix.push(pull_array(n));
        m--;
    }
    
    for (let i = 0; i <  s*s*70/100 ; i++) {
        rand1 = getRndInteger(0,s);
        rand2 = getRndInteger(0,s);
        matrix[rand1][rand2] = 1;
    }

    canvas = createCanvas(matrix[0].length * side, matrix.length * side)
    ctx = canvas.getContext('2d')

    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass.Grass(x,y,1);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var grassEater = new GrassEater.GrassEater(x,y,2);
                grassEaterArr.push(grassEater);
            }
            else if(matrix[y][x] == 3){
                var predator = new Predator.Predator(x,y,3);
                predatorArr.push(predator);
            }
            else if(matrix[y][x] == 4){
                var predatorEater = new PredatorEater.PredatorEater(x,y,4);
                predatorEaterArr.push(predatorEater);
            }
        }
     }     
    
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                ctx.fillStyle = "green";
            }
            else if (matrix[y][x] == 0) {
                ctx.fillStyle = "#acacac";
            }
            else if (matrix[y][x] == 2) {
                ctx.fillStyle = "yellow";
            }
            else if (matrix[y][x] == 3) {
                ctx.fillStyle = "red";
            }
            else if (matrix[y][x] == 4) {
                ctx.fillStyle = "blue";
            }
            ctx.fillRect(x * side, y * side, side, side);
        }
    }
    for(let i in grassArr){
        grassArr[i].mul();
    }
    for(let k in grassEaterArr){
        grassEaterArr[k].move();
        grassEaterArr[k].eat();
        grassEaterArr[k].mul();
        grassEaterArr[k].die();
        
    }
    for(let l in predatorArr){
        predatorArr[l].move();
        predatorArr[l].eat();
        predatorArr[l].mul();
        predatorArr[l].die();
        
    }
    for(let m in predatorEaterArr){
        predatorEaterArr[m].move();
        predatorEaterArr[m].eat();
        predatorEaterArr[m].mul();
        predatorEaterArr[m].die();
        
    }
    add_grass(10);
    add_predator(5);
    add_grasseater(5);
    add_predatoreater(1);

    // out = fs.createWriteStream(__dirname + '/state.png');
    // stream = canvas.pngStream();

    // stream.on('data', function(chunk){
    //     out.write(chunk);
    // });

}

module.exports.add_grass = add_grass;
module.exports.add_grasseater = add_grasseater;
module.exports.add_predator = add_predator;
module.exports.add_predatoreater = add_predatoreater;
module.exports.setup = setup;
module.exports.draw = draw;
module.exports.getRndInteger = getRndInteger;
module.exports.pull_array = pull_array;
module.exports.grassArr = grassArr;
module.exports.grassEaterArr = grassEaterArr;
module.exports.predatorArr = predatorArr;
module.exports.predatorEaterArr = predatorEaterArr;
module.exports.matrix = matrix;
module.exports.canvas = canvas;
module.exports.ctx = ctx;
