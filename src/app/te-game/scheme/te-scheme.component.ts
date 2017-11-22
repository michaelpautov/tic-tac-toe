import { Component } from '@angular/core';
import { TEGameService } from '../te-game.service';

@Component({
  selector: 'app-te-scheme',
  templateUrl: './te-scheme.component.html',
  styleUrls: ['./te-scheme.component.scss']
})
export class TESchemeComponent {

  private cells: TECellInterface[];
  public convertedCells: TECellInterface[];

  constructor(public teGameService: TEGameService) {
    this.init();
    this.teGameService.cellsSubject.subscribe(
      next => this.init()
    );
  }

  private init() {
    this.cells = this.teGameService.getCells();
    this.convertedCells = this.convertCells();
  }

  public getCellIndex(rowIndex: number, collIndex: number): number {
    return rowIndex * 3 + collIndex;
  }

  private convertCells(): TECellInterface[] {
    const convertedCells = [];
    for (let i = 0; i < this.cells.length; i += 3) {
      const row = [];
      for (let j = i; j < i + 3; j++) {
        row.push(this.cells[j]);
      }
      convertedCells.push(row);
    }
    return convertedCells;
  }

  selectCell(cellIndex: number): void {
    if (typeof this.cells[cellIndex] !== 'string') {
      this.teGameService.selectCell(cellIndex);
    }
  }

  convertCell(cell: TECellInterface): string {
    if (cell === 'W') {
      return this.teGameService.winner;
    }
    return cell === 'X' || cell === 'O' ? cell : '';
  }


}
