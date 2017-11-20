import { Component, OnInit } from "@angular/core";

import { GameStateService } from "../services/gameState.service";
import { MatrixStateService } from "../services/matrixState.service";

@Component({
  selector: "menu-view",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent {
  constructor(
    private gameState: GameStateService,
    private matrixService: MatrixStateService
  ) {}

  resetGame() {
    this.gameState.setDefaultStats();
    this.matrixService.matrix = this.matrixService.getBlankMatrix();
  }
}
