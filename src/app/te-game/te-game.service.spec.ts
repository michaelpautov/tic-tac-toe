import { TestBed } from '@angular/core/testing';

import { TEGameService } from './te-game.service';

describe('TEGameService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TEGameService]
    });
  });

  describe('algorithm test', () => {
    it('check tie game', () => {
      const teGameService = TestBed.get(TEGameService);

      teGameService.setPlayerSymbol('X');
      teGameService.setAISymbol();

      let i = 0;
      while (i < 4) {
        i++;
        teGameService.turnPlayerBestSquare();
        teGameService.turnAI();
      }
      teGameService.turnPlayerBestSquare();
      expect(teGameService.winner).toEqual(null);
    });

    it('check lose game', () => {
      const teGameService = TestBed.get(TEGameService);

      teGameService.setPlayerSymbol('O');
      teGameService.setAISymbol();
      teGameService.turnAI();
      teGameService.selectCell(2);

      let i = 0;
      while (i < 3) {
        i++;
        teGameService.turnPlayerBestSquare();
        teGameService.turnAI();
      }
      teGameService.turnPlayerBestSquare();
      expect(teGameService.winner).toEqual('X');
    });
  });
});
