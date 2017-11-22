import { Component } from '@angular/core';
import { TEGameService } from '../te-game.service';

@Component({
  selector: 'app-te-popup',
  templateUrl: './te-start.component.html',
  styleUrls: ['./te-start.component.scss']
})
export class TEStartComponent {

  public isShowPopup = true;

  constructor(public teGameService: TEGameService) {
    this.teGameService.reload.subscribe(
      n => this.isShowPopup = true
    );
  }

  public selectSymbol(symbol: TEPlayerSymbolInterface): void {
    this.isShowPopup = false;
    this.teGameService.setPlayerSymbol(symbol);
    this.teGameService.setAISymbol();
    if (symbol === 'O') {
      this.teGameService.turnAI();
    }
  }

}
