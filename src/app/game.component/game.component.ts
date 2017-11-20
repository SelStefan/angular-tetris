import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";

import { MatrixStateService } from "../services/matrixState.service";
import { GameStateService } from "../services/gameState.service";

import { ITetromino } from "../tetrominos/ITetromino";
import { JTetromino } from "../tetrominos/JTetromino";
import { LTetromino } from "../tetrominos/LTetromino";
import { STetromino } from "../tetrominos/STetromino";
import { ZTetromino } from "../tetrominos/ZTetromino";
import { OTetromino } from "../tetrominos/OTetromino";
import { TTetromino } from "../tetrominos/TTetromino";

const tetrominos = {
  i: ITetromino,
  j: JTetromino,
  l: LTetromino,
  s: STetromino,
  z: ZTetromino,
  o: OTetromino,
  t: TTetromino
};

@Component({
  selector: "game-view",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  title = "app works!";

  gameAdvancementIntval;

  tetromino;

  combinedMatrix;

  constructor(
    private gameState: GameStateService,
    private matrixService: MatrixStateService
  ) {
    this.tetromino = new ZTetromino();
  }

  ngOnInit() {
    this.gameState.hasteOn.subscribe(hasteOn => {
      clearInterval(this.gameAdvancementIntval);
      if (!hasteOn) {
        this.gameAdvancementIntval = setInterval(() => {
          this.advanceGame();
        }, 300);
      } else {
        this.gameAdvancementIntval = setInterval(() => {
          this.gameState.score++;
          this.advanceGame();
        }, 10);
      }
    });
  }

  advanceGame() {
    if (!this.gameState.isPaused) {
      this.combineMatrix();

      if (this.willCollideUnderneath()) this.tetromino.step++;
      else {
        this.moldMatrix();

        this.tetromino = new tetrominos[this.gameState.currentTetro]();
        this.gameState.nextTetromino();
      }

      // Check if there is a full line
      this.matrixService.matrix.forEach((row, i) => {
        let isFull = true;
        row.forEach(block => {
          if (block == "b") isFull = false;
        });

        if (isFull) {
          this.matrixService.matrix[i] = "b".repeat(10).split("");
          console.log("FULL!");
          this.gameState.lines++;
          this.gameState.score += 40;

          for (let r = 0; r < i; r++) {
            this.matrixService.matrix[r].forEach((block, col) => {
              if (block != "b") {
                this.matrixService.matrix[r + 1][
                  col
                ] = this.matrixService.matrix[r][col];
                this.matrixService.matrix[r][col] = "b";
              }
            });
          }
        }
      });

      // Check if there is a tetro at the 2nd index, if there is, gameover
      this.matrixService.matrix[1].forEach(block => {
        if (block != "b") {
          console.warn("gameover!");
          this.resetGame();
        }
      });
    }
  }

  resetGame() {
    this.gameState.setDefaultStats();
    this.matrixService.matrix = this.matrixService.getBlankMatrix();
  }

  willCollideUnderneath(): boolean {
    let inBounds = true;
    const positions = this.tetromino.getPositions(1, 0, false);
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i][0] > 19 ||
        this.matrixService.matrix[positions[i][0]][positions[i][1]] !== "b"
      ) {
        inBounds = false;
      }
    }

    return inBounds;
  }

  combineMatrix() {
    let blocks = this.tetromino.getPositions(0, 0, false);
    let matrix = JSON.parse(JSON.stringify(this.matrixService.matrix));
    blocks.forEach(position => {
      matrix[position[0]][position[1]] = this.tetromino.type;
    });
    this.combinedMatrix = matrix;
  }

  moldMatrix() {
    let blocks = this.tetromino.getPositions(0, 0, false);
    let matrix = JSON.parse(JSON.stringify(this.matrixService.matrix));
    blocks.forEach(position => {
      matrix[position[0]][position[1]] = this.tetromino.type;
    });
    this.matrixService.matrix = matrix;
  }

  validateShift(direction): boolean {
    let inBounds = true;
    let shiftVal = direction == "left" ? -1 : 1;
    const positions = this.tetromino.getPositions(0, shiftVal, false);
    for (let i = 0; i < positions.length; i++) {
      if (this.matrixService.matrix[positions[i][0]][positions[i][1]] !== "b") {
        inBounds = false;
      }
    }

    return inBounds;
  }

  validateRotation(): boolean {
    let inBounds = true;
    const positions = this.tetromino.getPositions(0, 0, true);
    for (let i = 0; i < positions.length; i++) {
      if (this.matrixService.matrix[positions[i][0]][positions[i][1]] !== "b") {
        inBounds = false;
      }
    }

    return inBounds;
  }

  @HostListener("window:keydown", ["$event"])
  keyboardKeydown(event: KeyboardEvent) {
    if (event.key === "z") {
      if (this.validateRotation) this.tetromino.nextRotation();
    }
    if (event.key === "x") {
      if (this.validateShift("left")) this.tetromino.moveLeft();
    }
    if (event.key === "c") {
      if (this.validateShift("right")) this.tetromino.moveRight();
    }
    if (event.key === "v" && !this.gameState.isHasteOn) {
      this.gameState.setHaste(true);
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyboardKeyup(event: KeyboardEvent) {
    if (event.key === "v" && this.gameState.isHasteOn) {
      this.gameState.setHaste(false);
    }
  }
}
