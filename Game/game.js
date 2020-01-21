let side = 15;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let predatorEaterArr = [];
let n = parseInt(prompt("Input number of area"));
let m = n;
let s = n;
let matrix = [];
let rand1 = 0;
let rand2 = 0;

function add_grasseater(percent){
    if(grassEaterArr.length < s*s*percent/100){
        for (let i = 0; i <  s*s*percent/100 ; i++) {
            rand1 = getRndInteger(0,s);
            rand2 = getRndInteger(0,s);
            matrix[rand1][rand2] = 2;
            person = new GrassEater(rand2, rand1, 2);
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
            person = new Predator(rand2, rand1, 3);
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
            person = new PredatorEater(rand2, rand1, 4);
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
            person = new Grass(rand2, rand1, 1);
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

while(m > 0){
    matrix.push(pull_array(n));
    m--;
}

for (let i = 0; i <  s*s*70/100 ; i++) {
    rand1 = getRndInteger(0,s);
    rand2 = getRndInteger(0,s);
    matrix[rand1][rand2] = 1;
}

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y,1);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var grassEater = new GrassEater(x,y,2);
                grassEaterArr.push(grassEater);
            }
            else if(matrix[y][x] == 3){
                var predator = new Predator(x,y,3);
                predatorArr.push(predator);
            }
            else if(matrix[y][x] == 4){
                var predatorEater = new PredatorEater(x,y,4);
                predatorEaterArr.push(predatorEater);
            }
        }
     }     
    
}


function draw() {
    frameRate(5);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
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
}
 
