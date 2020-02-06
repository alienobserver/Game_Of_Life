const Grass = require("./grass.js");
const GrassEater = require("./grassEater.js");
const Predator = require("./predator.js");
const PredatorEater = require("./predatorEater.js");
const PersonGenerator = require("./personGenerator");
const Bomb = require("./bomb");
const fs = require('fs');

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let predatorEaterArr = [];
let bombArr = [];
let perGen;
let preCount = 5;
let preEatCount = 2.5;
let grCount = 10;
let grEatCount = 5;
let n = 50;
let m = n;
let s = n;
let matrix = [];
let rand1 = 0;
let rand2 = 0;
let statistics = {};

function send_stat( filename ) {
    if ( grassArr ){
        statistics.grass = grassArr.length;
     }
     if ( grassEaterArr ){
        statistics.grassEater = grassEaterArr.length;
     }
     if ( predatorArr ){
        statistics.predator = predatorArr.length;
     }
     if ( predatorEaterArr ){
        statistics.predatorEater = predatorEaterArr.length;
     }
     if ( bombArr ) {
        statistics.bomb = bombArr.length;
     }
     statistics.personGenerator = 1; // personGenerator is not an array and we can't get its length and it has only 1 person.
     fs.writeFile(filename, JSON.stringify(statistics), function(){
     });
}

function mode_1() {
    preEatCount = 0;
    predatorEaterArr.splice( 0 , predatorEaterArr.length);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 4) {
                matrix[y][x] = 0
            }
        }
    }
}

function mode_2() {
    preEatCount = 2.5;
}

function mode_3() {
    preCount = 0;
    predatorArr.splice( 0 , predatorArr.length);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 3) {
                matrix[y][x] = 0
            }
        }
    }
}
function mode_4() {
    preCount = 5;
}
function mode_5() {
    bombArr.splice( 0 , bombArr.length);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 6) {
                matrix[y][x] = 0
            }
        }
    }
}
function mode_6() {
    while (bombArr.length < 6) {
        rand1 = getRndInteger(0, s);
        rand2 = getRndInteger(0, s);
        if (matrix[rand1][rand2] == 0) {
            matrix[rand1][rand2] = 6;
            person = new Bomb.Bomb(rand1, rand2, 6);
            bombArr.push(person);
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function pull_array(n) {
    let a = []
    while (n > 0) {
        a.push(getRndInteger(0, 5));
        n--;
    }
    return a;
}

function setup() {
    while (m > 0) {
        matrix.push(pull_array(n));
        m--;
    }

    for (let i = 0; i < s * s * 70 / 100; i++) {
        rand1 = getRndInteger(0, s);
        rand2 = getRndInteger(0, s);
        matrix[rand1][rand2] = 1;
    }

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass.Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater.GrassEater(x, y, 2);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator.Predator(x, y, 3);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var predatorEater = new PredatorEater.PredatorEater(x, y, 4);
                predatorEaterArr.push(predatorEater);
            }
        }
    }

    for (let i = 1; i <= 6; i++) {
        rand1 = getRndInteger(0, s);
        rand2 = this.getRndInteger(0, s);
        var bomb = new Bomb.Bomb(rand2, rand1, 6);
        bombArr.push(bomb);
    }

    matrix[0][0] = 5;
    perGen = new PersonGenerator.PersonGenerator(0, 0, 5);
}

function draw() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let k in grassEaterArr) {
        grassEaterArr[k].move();
        grassEaterArr[k].eat();
        grassEaterArr[k].mul();
        grassEaterArr[k].die();

    }
    for (let l in predatorArr) {
        predatorArr[l].move();
        predatorArr[l].eat();
        predatorArr[l].mul();
        predatorArr[l].die();

    }
    for (let m in predatorEaterArr) {
        predatorEaterArr[m].move();
        predatorEaterArr[m].eat();
        predatorEaterArr[m].mul();
        predatorEaterArr[m].die();

    }

    for (let n in bombArr) {
        bombArr[n].eat();
    }

    perGen.add_grass(grCount);
    perGen.add_predator(preCount);
    perGen.add_grasseater(grEatCount);
    perGen.add_predatoreater(preEatCount);
    perGen.move();
}

module.exports.setup = setup;
module.exports.draw = draw;
module.exports.n = n;
module.exports.rand1 = rand1;
module.exports.rand2 = rand2;
module.exports.getRndInteger = getRndInteger;
module.exports.pull_array = pull_array;
module.exports.grassArr = grassArr;
module.exports.grassEaterArr = grassEaterArr;
module.exports.predatorArr = predatorArr;
module.exports.predatorEaterArr = predatorEaterArr;
module.exports.perGen = perGen;
module.exports.matrix = matrix;
module.exports.grCount = grCount;
module.exports.grEatCount = grEatCount;
module.exports.preCount = preCount;
module.exports.preEatCount = preEatCount;
module.exports.mode_1 = mode_1;
module.exports.mode_2 = mode_2;
module.exports.mode_3 = mode_3;
module.exports.mode_4 = mode_4;
module.exports.mode_5 = mode_5;
module.exports.mode_6 = mode_6;
module.exports.send_stat = send_stat;
module.exports.statistics = statistics;