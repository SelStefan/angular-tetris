import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ButtonsModule } from "ngx-bootstrap/buttons";

import { GameStateService } from "./services/gameState.service";
import { MatrixStateService } from "./services/matrixState.service";

import { AppComponent } from "./app.component";

import { GameComponent } from "./game.component/game.component";
import { MenuComponent } from "./menu.component/menu.component";

@NgModule({
  declarations: [AppComponent, GameComponent, MenuComponent],
  imports: [BrowserModule, FormsModule, HttpModule, ButtonsModule.forRoot()],
  providers: [GameStateService, MatrixStateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
