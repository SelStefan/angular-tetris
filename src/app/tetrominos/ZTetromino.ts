export class ZTetromino {
  type = "z";
  step = 1;
  shift = 4;
  rotation = "up";

  getPositions(modStep = 0, modShift = 0, rotate = false) {
    let positions;
    const step = this.step + modStep;
    const shift = this.shift + modShift;
    let rotation = this.rotation;
    let modRot = false;
    if (rotate) {
      if (rotation === "up" && !modRot) {
        rotation = "right";
        modRot = true;
      }
      if (rotation === "right" && !modRot) {
        // console.log('shift', this.shift);
        rotation = "down";
        modRot = true;
      }
      if (rotation === "down" && !modRot) {
        rotation = "left";
        modRot = true;
      }
      if (rotation === "left" && !modRot) {
        rotation = "up";
        modRot = true;
      }
    }

    if (rotation === "up") {
      positions = [
        [step + 0, 0 + shift],
        [step + 1, 1 + shift],
        [step, 1 + shift],
        [step + 1, 2 + shift]
      ];
    } else if (rotation === "right") {
      positions = [
        [step - 1, 2 + shift],
        [step + 0, 1 + shift],
        [step + 0, 2 + shift],
        [step + 1, 1 + shift]
      ];
    } else if (rotation === "down") {
      positions = [
        [step + 0, 0 + shift],
        [step + 1, 1 + shift],
        [step, 1 + shift],
        [step + 1, 2 + shift]
      ];
    } else if (rotation === "left") {
      positions = [
        [step - 1, 1 + shift],
        [step + 0, 0 + shift],
        [step + 0, 1 + shift],
        [step + 1, 0 + shift]
      ];
    }

    return positions;
  }

  moveLeft() {
    this.shift--;
  }

  moveRight() {
    this.shift++;
  }

  nextRotation() {
    console.log("shift", this.shift, this.rotation);
    if (this.rotation === "up") {
      this.rotation = "right";
      return;
    }
    if (this.rotation === "right" && this.shift >= 0 && this.shift < 7) {
      // console.log('shift', this.shift);
      this.rotation = "down";
      return;
    }
    if (this.rotation === "down") {
      this.rotation = "left";
      return;
    }
    if (this.rotation === "left" && this.shift >= 0 && this.shift < 7) {
      this.rotation = "up";
      return;
    }

    console.log(this.rotation);
  }
}
