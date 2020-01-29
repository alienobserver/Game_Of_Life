class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }

    random (list) {
        return list[Math.floor((Math.random()*list.length))];
    } 

    // eat(enemy_index, enemyArr) {
    //     var creature = random(this.chooseCell(enemy_index));
    //     if (creature) {
    //         var newX = creature[0];
    //         var newY = creature[1];

    //         matrix[this.y][this.x] = 0;
    //         matrix[newY][newX] = this.index;

    //     for (let i in enemyArr) {
    //             if (enemyArr[i].x == newX && enemyArr[i].y == newY) {
    //                 enemyArr.splice(i, 1);
    //                 break;
    //             }
    //         }

    //         this.x = newX;
    //         this.y = newY;
    //         this.energy += 2;
    //     }
    // }

    // die() {
    //     if (this.energy <= 0) {
    //         matrix[this.y][this.x] = 0;
    //         for (let i in this.arr) {
    //                 if (this.arr[i].x == this.x && this.arr[i].y == this.y) {
    //                     this.arr.splice(i, 1);
    //                     break;
    //                 }
    //             }
    //     }
    // }
}

module.exports.LivingCreature = LivingCreature;