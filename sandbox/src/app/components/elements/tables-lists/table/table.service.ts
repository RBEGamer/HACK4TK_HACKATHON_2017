import {Injectable} from "@angular/core";
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class TableService {
  // Observable sources
  private highlightedLogicalRow = new Subject<number>();

  private firstRowClass: string;

  private colHideSmartphone: number;

  private colHideTablet: number;

  private dataTogglePosition: number;

  // Observable streams
  logicalRowChanged$ = this.highlightedLogicalRow.asObservable();

  changeLogicalRow(row: number) {
    this.highlightedLogicalRow.next(row);
  }

  setFirstRowClass(cssClass: string) {
    this.firstRowClass = cssClass;
  }

  getFirstRowClass(): string {
    return this.firstRowClass;
  }

  setColHideSmartphone(col: string) {
    this.colHideSmartphone = this.convertStringColumnToNumber(col);
  }

  getColHideSmartphone(): number {
    return this.colHideSmartphone;
  }

  setColHideTablet(col: string) {
    this.colHideTablet = this.convertStringColumnToNumber(col);
  }

  getColHideTablet(): number {
    return this.colHideTablet;
  }

  setDataTogglePosition(col: string) {
    this.dataTogglePosition = this.convertStringColumnToNumber(col);
  }

  getDataTogglePosition(): number {
    return this.dataTogglePosition;
  }

  createTableMatrix(tableContent: any): any[][] {
    let tableMatrix: any[][] = [];

    let maxNumCellsInRow = 0;
    for (let row of tableContent) {
      if (row.content.length > maxNumCellsInRow) {
        maxNumCellsInRow = row.content.length;
      }
    }

    //Initialize Array which represents the body. It helps to detect spaces that are locked by rowspan or colspan
    for (let i = 0; i < tableContent.length; i++) {
      let temp = [];
      for (let j = 0; j < maxNumCellsInRow; j++) {
        temp.push(null);
      }
      tableMatrix.push(temp);
    }

    let rowIndex: number = 0;
    for (let row of tableContent) {
      let cellIndex: number = 0;
      for (let cell of row.content) {
        if (tableMatrix[rowIndex][cellIndex] == "block") {
          cellIndex++;
        }

        if (cell.parameters.colspan > 1) {
          for (let i = 1; i < cell.parameters.colspan; i++) {
            tableMatrix[rowIndex][cellIndex + i] = "block";
            if (cell.parameters.rowspan > 1) {
              for (let j = 1; j < cell.parameters.rowspan; j++) {
                tableMatrix[rowIndex + j][cellIndex + i] = "block";
              }
            }
          }
        }

        if (cell.parameters.rowspan > 1) {
          for (let i = 1; i < cell.parameters.rowspan; i++) {
            tableMatrix[rowIndex + i][cellIndex] = "block";
          }
        }

        tableMatrix[rowIndex][cellIndex] = cell;

        cellIndex++;
      }
      rowIndex++;
    }
    return tableMatrix;
  }


  convertStringColumnToNumber(col: String): number {
    switch (col) {
      case "first":
        return 1;
      case "second":
        return 2;
      case "third":
        return 3;
      case "fourth":
        return 4;
      case "fifth":
        return 5;
      case "sixth":
        return 6;
      case "seventh":
        return 7;
      case "eighth":
        return 8;
      case "ninth":
        return 9;
      case "tenth":
        return 10;
    }
  }


}
