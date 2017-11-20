import { Injectable } from "@angular/core";

@Injectable()
export class MatrixStateService {
  matrix;

  constructor() {
    this.matrix = this.getBlankMatrix();
  }

  getBlankMatrix() {
    return " "
      .repeat(20)
      .split("")
      .map(v => "b".repeat(10).split(""));
  }
}
