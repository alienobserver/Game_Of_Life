const LivingCreature = require("./LivingCreature");
const Grass = require("./grass.js");
const GrassEater = require("./grassEater.js");
const Predator = require("./predator.js");
const PredatorEater = require("./predatorEater.js");

class PersonGenerator extends LivingCreature.LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.s = 50;
        this.person;
        this.rand1;
        this.rand2;
    }

    add_grasseater(percent) {
        if (grassEaterArr.length < this.s * this.s * percent / 100) {
            for (let i = 0; i < this.s * this.s * percent / 100; i++) {
                this.rand1 = this.getRndInteger(0, this.s);
                this.rand2 = this.getRndInteger(0, this.s);
                if (matrix[this.rand1][this.rand2] == 0) {
                    matrix[this.rand1][this.rand2] = 2;
                    this.person = new GrassEater.GrassEater(this.rand2, this.rand1, 2);
                    grassEaterArr.push(this.person);
                }
            }
        }
        else if (grassEaterArr.length > this.s * this.s * 20 / 100) {
            for (let m in grassEaterArr) {
                matrix[grassEaterArr[m].y][grassEaterArr[m].x] = 0;
                grassEaterArr.splice(m, 1);
            }
        }
    }

    add_predator(percent) {
        if (predatorArr.length < this.s * this.s * percent / 100) {
            for (let i = 0; i < this.s * this.s * percent / 100; i++) {
                this.rand1 = this.getRndInteger(0, this.s);
                this.rand2 = this.getRndInteger(0, this.s);
                if (matrix[this.rand1][this.rand2] == 0) {
                    matrix[this.rand1][this.rand2] = 3;
                    this.person = new Predator.Predator(this.rand2, this.rand1, 3);
                    predatorArr.push(this.person);
                }
            }
        }
        else if (predatorArr.length > this.s * this.s * 20 / 100) {
            for (let m in predatorArr) {
                matrix[predatorArr[m].y][predatorArr[m].x] = 0;
                predatorArr.splice(m, 1);
            }
        }
    }

    add_predatoreater(percent) {
        if (predatorEaterArr.length < this.s * this.s * percent / 100) {
            for (let i = 0; i < this.s * this.s * percent / 100; i++) {
                this.rand1 = this.getRndInteger(0, this.s);
                this.rand2 = this.getRndInteger(0, this.s);
                if (matrix[this.rand1][this.rand2] == 0) {
                    matrix[this.rand1][this.rand2] = 4;
                    this.person = new PredatorEater.PredatorEater(this.rand2, this.rand1, 4);
                    predatorEaterArr.push(this.person);
                }
            }
        }
        else if (predatorEaterArr.length > this.s * this.s * 10 / 100) {
            for (let m in predatorEaterArr) {
                matrix[predatorEaterArr[m].y][predatorEaterArr[m].x] = 0;
                predatorEaterArr.splice(m, 1);
            }
        }
    }

    add_grass(percent) {
        if (grassArr.length < this.s * this.s * percent / 100) {
            for (let i = 0; i < this.s * this.s * percent / 100; i++) {
                this.rand1 = this.getRndInteger(0, this.s);
                this.rand2 = this.getRndInteger(0, this.s);
                if (matrix[this.rand1][this.rand2] == 0) {
                    matrix[this.rand1][this.rand2] = 2;
                    this.person = new Grass.Grass(this.rand2, this.rand1, 1);
                    grassArr.push(this.person);
                }
            }
        }
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

module.exports.PersonGenerator = PersonGenerator;

