const LivingCreature = require("./LivingCreature");

class Bomb extends LivingCreature.LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.count = 0;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x + 3, this.y - 2],
            [this.x - 3, this.y - 1],
            [this.x + 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x + 3, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x + 3, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }

    move() { }

    Cell() {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    eat() {
        this.count++;
        var persons = this.Cell();
        if (persons && this.count >= 10) {
            this.count = 0;
            matrix[this.x][this.y] = this.index;
            for (let i = 0; i < persons.length; i++) {
                var newX = persons[i][1];
                var newY = persons[i][0];

                if (matrix[newY][newX] == 0) {
                    matrix[newY][newX] = 0;
                }

                else if (matrix[newY][newX] == 1) {
                    for (let a in grassArr) {
                        if (grassArr[a].x == newX && grassArr[a].y == newY) {
                            grassArr.splice(a, 1);
                            break;
                        }
                    }

                    matrix[newY][newX] = 0;
                }

                else if (matrix[newY][newX] == 2) {
                    for (let a in grassEaterArr) {
                        if (grassEaterArr[a].x == newX && grassEaterArr[a].y == newY) {
                            grassEaterArr.splice(a, 1);
                            break;
                        }
                    }

                    matrix[newY][newX] = 0;
                }

                else if (matrix[newY][newX] == 3) {
                    for (let a in predatorArr) {
                        if (predatorArr[a].x == newX && predatorArr[a].y == newY) {
                            predatorArr.splice(a, 1);
                            break;
                        }
                    }

                    matrix[newY][newX] = 0;
                }

                else if (matrix[newY][newX] == 4) {
                    for (let a in predatorEaterArr) {
                        if (predatorEaterArr[a].x == newX && predatorEaterArr[a].y == newY) {
                            predatorEaterArr.splice(a, 1);
                            break;
                        }
                    }

                    matrix[newY][newX] = 0;
                }

            }
        }
    }
}

module.exports.Bomb = Bomb;