class GrassEater extends LivingCreature{
    eat() {
        var grass = random(this.chooseCell(1));
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (let i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}