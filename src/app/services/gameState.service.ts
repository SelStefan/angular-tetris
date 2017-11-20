import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class GameStateService {
  public paused = new BehaviorSubject<boolean>(false);
  public hasteOn = new BehaviorSubject<boolean>(false);

  time: number;
  timeInterval;
  level: number;
  score: number;
  lines: number;

  currentTetro;

  constructor() {
    this.setDefaultStats();
    this.currentTetro = this.nextTetromino();

    this.paused.subscribe(paused => {
      console.log("pause: ", paused);
      if (!paused) {
        this.timeInterval = setInterval(() => {
          this.time++;
        }, 1000);
      } else {
        clearInterval(this.timeInterval);
      }
    });
  }

  togglePause() {
    if (this.paused.value) this.paused.next(false);
    else this.paused.next(true);
  }
  get isPaused() {
    return this.paused.value;
  }

  setHaste(haste) {
    this.hasteOn.next(haste);
  }
  get isHasteOn() {
    return this.hasteOn.value;
  }

  setDefaultStats() {
    this.time = 0;
    this.level = 0;
    this.score = 0;
    this.lines = 0;
  }

  nextTetromino() {
    let tetros = ["i", "j", "l", "o", "s", "t", "z"];
    let tetro = tetros[Math.floor(Math.random() * tetros.length)];
    this.currentTetro = tetro;
    return tetro;
  }
}
