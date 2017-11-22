import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TEGameComponent } from './te-game/te-game.component';
import { TESchemeComponent } from './te-game/scheme/te-scheme.component';
import { TEStartComponent } from './te-game/te-start/te-start.component';
import { TEWinnerComponent } from './te-game/te-winner/te-winner.component';

import { TEGameService } from './te-game/te-game.service';


@NgModule({
  declarations: [
    AppComponent,
    TEGameComponent,
    TESchemeComponent,
    TEStartComponent,
    TEWinnerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TEGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
