import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

import { MatrixStateService } from './services/matrixState.service';

import { ITetromino } from './tetrominos/ITetromino';
import { JTetromino } from './tetrominos/JTetromino';
import { LTetromino } from './tetrominos/LTetromino';
import { STetromino } from './tetrominos/STetromino';
import { ZTetromino } from './tetrominos/ZTetromino';
import { OTetromino } from './tetrominos/OTetromino';
import { TTetromino } from './tetrominos/TTetromino';

const tetrominos = [ITetromino, JTetromino, LTetromino,
                    STetromino, ZTetromino, OTetromino,
                    TTetromino];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  tetromino;

  combinedMatrix;

  constructor(private matrixService: MatrixStateService) {
    this.tetromino = new TTetromino();

    this.combinedMatrix = this.tetromino.combineMatrix(this.matrixService.matrix);
    // console.log(this.matrixService.matrix);

    setInterval(() => {
      this.combinedMatrix = this.tetromino.combineMatrix(this.matrixService.matrix);
    }, 50);

    setInterval(() => {
      // if (this.tetromino.step < 10)
      //   this.tetromino.step++;

      console.log(this.tetromino.rotation, this.tetromino.shift);
      console.log(this.tetromino.getPositions(), this.tetromino.getPositions(1, 0, false));
      let inBounds = true;
      const positions = this.tetromino.getPositions(1, 0, false);
      for (let i = 0; i < positions.length; i++) {
        if (positions[i][0] > 19 || this.matrixService.matrix[positions[i][0]][positions[i][1]] !== 'b') {
          inBounds = false;
        }
        // console.log(positions[i]);
      }
      if (inBounds)
        this.tetromino.step++;
      else {
        this.matrixService.matrix = this.tetromino.combineMatrix(this.matrixService.matrix);
        this.tetromino = new tetrominos[Math.floor(Math.random() * tetrominos.length)];
      }
    }, 500);
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.key === 'w') {
      console.log('w');
      this.tetromino.setRotation('up');
    }
    if (event.key === 'd') {
      console.log('d');
      this.tetromino.setRotation('right');
    }
    if (event.key === 's') {
      console.log('s');
      this.tetromino.setRotation('down');
    }
    if (event.key === 'a') {
      console.log('a');
      this.tetromino.setRotation('left');
    }

    if (event.key === 'z') {
      console.log('z');
      // this.tetromino.nextRotation();

      let inBounds = true;
      const positions = this.tetromino.getPositions(0, 0, true);
      for (let i = 0; i < positions.length; i++) {
        if (this.matrixService.matrix[positions[i][0]][positions[i][1]] !== 'b') {
          inBounds = false;
        }
        // console.log(positions[i]);
      }
      if (inBounds)
        this.tetromino.nextRotation();
    }
    if (event.key === 'x') {
      console.log('x');
      // this.tetromino.moveLeft();
      // if (this.tetromino.shift > 0)
      //   this.tetromino.shift--;
      let inBounds = true;
      const positions = this.tetromino.getPositions(0, -1, false);
      for (let i = 0; i < positions.length; i++) {
        if (this.matrixService.matrix[positions[i][0]][positions[i][1]] !== 'b') {
          inBounds = false;
        }
        // console.log(positions[i]);
      }
      if (inBounds)
        this.tetromino.moveLeft();
    }
    if (event.key === 'c') {
      console.log('c');
      // this.tetromino.moveRight();
      // if (this.tetromino.shift < 6)
      //   this.tetromino.shift++;
      let inBounds = true;
      const positions = this.tetromino.getPositions(0, 1, false);
      for (let i = 0; i < positions.length; i++) {
        if (this.matrixService.matrix[positions[i][0]][positions[i][1]] !== 'b') {
          inBounds = false;
        }
        // console.log(positions[i]);
      }
      if (inBounds)
        this.tetromino.moveRight();
    }
  }
}


