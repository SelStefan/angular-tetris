export class LTetromino {
    step = 1;
    shift = 1;
    rotation = 'up';

    combineMatrix(matrix1) {
        const matrix = JSON.parse(JSON.stringify(matrix1));
        if (this.rotation === 'up') {
            matrix[this.step][2 + this.shift] = 'l';
            matrix[this.step + 1][0 + this.shift] = 'l';
            matrix[this.step + 1][1 + this.shift] = 'l';
            matrix[this.step + 1][2 + this.shift] = 'l';
        }
        else if (this.rotation === 'right') {
            matrix[this.step + 0][1 + this.shift] = 'l';
            matrix[this.step + 1][1 + this.shift] = 'l';
            matrix[this.step + 2][1 + this.shift] = 'l';
            matrix[this.step + 2][2 + this.shift] = 'l';
        }
        else if (this.rotation === 'down') {
            matrix[this.step + 1][0 + this.shift] = 'l';
            matrix[this.step + 1][1 + this.shift] = 'l';
            matrix[this.step + 1][2 + this.shift] = 'l';
            matrix[this.step + 2][0 + this.shift] = 'l';
        }
        else if (this.rotation === 'left') {
            matrix[this.step + 2][1 + this.shift] = 'l';
            matrix[this.step + 1][1 + this.shift] = 'l';
            matrix[this.step + 0][1 + this.shift] = 'l';
            matrix[this.step  + 0][this.shift] = 'l';
        }

        return matrix;
    }

    getPositions(modStep = 0, modShift = 0, rotate = false) {
        let positions;
        const step = this.step + modStep;
        const shift = this.shift + modShift;
        let rotation = this.rotation;
        let modRot = false;
        if (rotate) {
            if (rotation === 'up' && !modRot) {
                rotation = 'right';
                modRot = true;
            }
            if (rotation === 'right' && !modRot) {
                // console.log('shift', this.shift);
                rotation = 'down';
                modRot = true;
            }
            if (rotation === 'down' && !modRot) {
                rotation = 'left';
                modRot = true;
            }
            if (rotation === 'left' && !modRot) {
                rotation = 'up';
                modRot = true;
            }
        }
        console.log('WAS:', this.rotation, 'NOW:', rotation);
        if (rotation === 'up') {
            positions = [
                [step, 2 + shift],
                [step + 1, 0 + shift],
                [step + 1, 1 + shift],
                [step + 1, 2 + shift]
            ];
        }
        else if (rotation === 'right') {
            positions = [
                [step, 1 + shift],
                [step + 1, 1 + shift],
                [step + 2, 1 + shift],
                [step + 2, 2 + shift]
            ];
        }
        else if (rotation === 'down') {
            positions = [
                [step + 1, 0 + shift],
                [step + 1, 1 + shift],
                [step + 1, 2 + shift],
                [step + 2, 0 + shift]
            ];
        }
        else if (rotation === 'left') {
            positions = [
                [step + 2, 1 + shift],
                [step + 1, 1 + shift],
                [step + 0, 1 + shift],
                [step + 0, shift]
            ];
        }

        return positions;
    }

    moveLeft() {
        this.shift--;
        // if (this.rotation === 'up' || this.rotation === 'down') {
        //     if (this.shift > 0)
        //         this.shift--;
        // }
        // if (this.rotation === 'right') {
        //     if (this.shift > -1)
        //         this.shift--;
        // }
        // if (this.rotation === 'left') {
        //     if (this.shift > 0)
        //         this.shift--;
        // }
    }

    moveRight() {
        this.shift++;
        // if (this.rotation === 'up' || this.rotation === 'down') {
        //     if (this.shift < 7)
        //         this.shift++;
        // }
        // if (this.rotation === 'right') {
        //     if (this.shift < 7)
        //         this.shift++;
        // }
        // if (this.rotation === 'left') {
        //     if (this.shift < 8)
        //         this.shift++;
        // }
    }

    // setRotation(rotation) {
    //   this.rotation = rotation;
    // }

    nextRotation() {
        console.log('shift', this.shift, this.rotation);
        if (this.rotation === 'up') {
            this.rotation = 'right';
            return;
        }
        if (this.rotation === 'right' && this.shift >= 0 && this.shift < 7) {
            // console.log('shift', this.shift);
            this.rotation = 'down';
            return;
        }
        if (this.rotation === 'down') {
            this.rotation = 'left';
            return;
        }
        if (this.rotation === 'left' && this.shift >= 0 && this.shift < 7) {
            this.rotation = 'up';
            return;
        }

        console.log(this.rotation);
    }
}