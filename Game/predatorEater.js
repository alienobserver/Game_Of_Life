const LivingCreature = require("./LivingCreature");

class PredatorEater extends LivingCreature.LivingCreature {
    eat() {
        var predator = super.random(this.chooseCell(3));
        var grass = super.random(this.chooseCell(1));

        if (predator) {
            var target = predator.concat(grass);
        }
        else if (grass) {
            var target = grass.concat(predator);
        }
        if (target) {
            var newX = target[0];
            var newY = target[1];

            if (matrix[newY][newX] == 1) {
                for (let i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] == 3) {
                for (let i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (let i in predatorEaterArr) {
                if (predatorEaterArr[i].x == newX && predatorEaterArr[i].y == newY) {
                    predatorEaterArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = super.random(this.chooseCell(0));
        if (this.energy >= 25 && newCell) {
            var newPredatorEater = new PredatorEater(newCell[0], newCell[1], this.index);
            predatorEaterArr.push(newPredatorEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (let i in predatorEaterArr) {
                if (predatorEaterArr[i].x == this.x && predatorEaterArr[i].y == this.y) {
                    predatorEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

module.exports.PredatorEater = PredatorEater;

