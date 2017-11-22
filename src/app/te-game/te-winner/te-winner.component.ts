import { Component } from '@angular/core';
import { TEGameService } from '../te-game.service';

@Component({
  selector: 'app-te-winner',
  templateUrl: './te-winner.component.html',
  styleUrls: ['./te-winner.component.scss']
})
export class TEWinnerComponent {

  public isShowPopup = false;
  public winnerText: any;

  constructor(private teGameService: TEGameService) {
    this.teGameService.winnerSubject.subscribe(
      next => {
        this.isShowPopup = true;
        this.winnerText = next;
      }
    );
  }

  public reload() {
    this.isShowPopup = false;
    this.teGameService.init();
  }

}
