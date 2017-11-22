import { Injectable } from '@angular/core';
import Constants from './te-game.const';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TEGameService {

  private humanPlayerSymbol: TEPlayerSymbolInterface;
  private AIPlayerSymbol: TEPlayerSymbolInterface;

  private cells: any = Constants.Cells;
  private _winner: TEPlayerSymbolInterface = null;

  private _cellsSubject = new Subject();
  private _winnerSubject = new Subject();
  private _reload = new Subject();

  constructor() {
    this.init();
  }

  public init() {
    this._winner = null;
    this.cells = Constants.Cells;
    this._cellsSubject.next();
    this._reload.next();
  }

  get reload(): Subject<undefined> {
    return this._reload;
  }

  get cellsSubject(): Subject<undefined> {
    return this._cellsSubject;
  }

  get winnerSubject(): Subject<string> {
    return this._winnerSubject;
  }

  get winner(): TEPlayerSymbolInterface | null {
    return this._winner;
  }

  public setPlayerSymbol(symbol: TEPlayerSymbolInterface): void {
    this.humanPlayerSymbol = symbol;
  }

  public setAISymbol(): void {
    this.AIPlayerSymbol = this.humanPlayerSymbol === 'X' ? 'O' : 'X';
  }

  public getCells(): TECellInterface[] {
    return this.cells;
  }

  public selectCell(cell: number): void {
    this.turn(cell, this.humanPlayerSymbol);
    if (!this.checkWin(this.cells, this.humanPlayerSymbol) && !this.checkTie()) {
      this.turn(this.bestSquare(), this.AIPlayerSymbol);
    }
  }

  public turnAI() {
    this.turn(this.bestSquare(), this.AIPlayerSymbol);
  }

  public turnPlayerBestSquare() {
    return this.turn(this.bestSquare(), this.humanPlayerSymbol);
  }

  private turn(cell: TECellInterface, player: TEPlayerSymbolInterface) {
    this.cells[cell] = player;
    const gameWon = this.checkWin(this.cells, player);
    if (gameWon) {
      this.gameOver(gameWon);
    }
    this.checkTie();
    this._cellsSubject.next();
  }

  private checkWin(board: TECellInterface[], playerSymbol: TEPlayerSymbolInterface): any {
    const playerCells = board.reduce((acc, cell, i) => cell === playerSymbol ? acc.concat(i) : acc, []);
    const hasCombo = (combo): boolean => combo.every(elem => playerCells.indexOf(elem) > -1);
    let gameWon: any = false;
    const winCombos: any = Constants.WinCombos;
    winCombos.find((combo, winComboIndex) => {
      if (hasCombo(combo)) {
        gameWon = { winComboIndex, playerSymbol };
        return;
      }
    });
    return gameWon;
  }

  private checkTie(): boolean {
    return this.getEmptySquares().length === 0 ? this.declareWinner('Tie game') : false;

  }

  private getEmptySquares(): TECellInterface[] {
    return this.cells.filter((cell, i) => cell === i);
  }

  private gameOver(gameWon) {
    // style winners cell
    const winCombos: any = Constants.WinCombos;
    this._winner = gameWon.playerSymbol;
    winCombos[gameWon.winComboIndex].forEach(i => this.cells[i] = 'W');
    this.declareWinner(gameWon.playerSymbol === this.humanPlayerSymbol ? 'You win!' : 'You lose');
  }


  private declareWinner(who: string): true {
    this._winnerSubject.next(who);
    return true;
  }

  private bestSquare(): number {
    return this.minimax(this.cells, this.AIPlayerSymbol).index;
  }

  private checkWins(newBoard, emptySquares): any {
    if (this.checkWin(newBoard, this.humanPlayerSymbol)) {
      return { score: -1 };
    } else if (this.checkWin(newBoard, this.AIPlayerSymbol)) {
      return { score: 1 };
    } else if (emptySquares.length === 0) {
      return { score: 0 };
    }
    return false;
  }

  private minimax(newBoard: TECellInterface[], player: TEPlayerSymbolInterface): TEMoveInterface {
    const emptySquares = this.getEmptySquares();

    const checkWins = this.checkWins(newBoard, emptySquares);
    if (checkWins) {
      // return { score }
      return checkWins;
    }

    const moves: TEMoveInterface[] = [];
    for (let i = 0; i < emptySquares.length; i ++) {
      const move = this.createMove(newBoard, emptySquares, i, player);
      const isBetterScore = (symbol, score) => player === symbol && move.score === score;
      if ( isBetterScore(this.AIPlayerSymbol, 1) || isBetterScore(this.humanPlayerSymbol, -1) ) {
        return move;
      } else {
        moves.push(move);
      }
    }

    const getBestMove = (bestScoreInit) => moves.reduce((bestScore, move) => {
      return move.score > bestScore.score ? move : bestScore;
    }, { score: bestScoreInit });
    if (player === this.AIPlayerSymbol) {
      return getBestMove(-2);
    }
    return getBestMove(2);

  }

  private createMove(newBoard: TECellInterface[], emptySquares: TECellInterface[], i: number, player: TEPlayerSymbolInterface) {
    const move: TEMoveInterface = {};
    move.index = newBoard[emptySquares[i]];
    newBoard[emptySquares[i]] = player;
    const getScoreBy = (symbol) => this.minimax(newBoard, symbol).score;
    move.score = player === this.AIPlayerSymbol ? getScoreBy(this.humanPlayerSymbol) : getScoreBy(this.AIPlayerSymbol);
    newBoard[emptySquares[i]] = move.index;
    return move;
  }
}
