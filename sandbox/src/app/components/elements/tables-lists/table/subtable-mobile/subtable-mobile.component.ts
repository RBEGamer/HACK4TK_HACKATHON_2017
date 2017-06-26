import {Component, Input} from "@angular/core";
import {TableService} from "../table.service";
import {HtmlElem} from "../html-elem";


@Component({
  selector: 'ucp-subtable-mobile',
  templateUrl: 'subtable-mobile.component.html',
})


export class SubtableMobileComponent {

  @Input()
  element: any;
  @Input()
  deviceType: string;
  rows: any = {};
  //Amount of columns of each row
  numColVisible: number;
  numRowHeader: number;
  dataTogglePosition: number;
  isCellToggled: boolean[];
  toggledRowSpan: number[][];
  tableBodyAsArray: any[];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.isCellToggled = [];
    this.tableBodyAsArray = [];

    switch (this.deviceType) {
      case "tablet":
        this.numColVisible = this.tableService.getColHideTablet();
        break;
      case "smartphone":
        this.numColVisible = this.tableService.getColHideSmartphone();
        break;
      default:
        if (this.element.parameters.maxNumCellsInRow) {
          this.numColVisible = this.element.parameters.maxNumCellsInRow;
        } else {
          this.numColVisible = 0;
        }
        break;
    }

    switch (this.element.tableHeader) {
      case "first":
        this.numRowHeader = 1;
        break;
      case "second":
        this.numRowHeader = 2;
        break;
      default:
        this.numRowHeader = 0;
    }

    if (this.tableService.getDataTogglePosition()) {
      this.dataTogglePosition = this.tableService.getDataTogglePosition();
    } else {
      this.dataTogglePosition = this.numColVisible;
    }

    //We need the body as array because we have to get the cell at specific position. It is too hard to do it by using
    //json because rowspan and colspan leads to unequal row length
    this.tableBodyAsArray = this.tableService.createTableMatrix(this.element.body.content);
    this.rows = this.initializeRows();
  }

  private initializeRows(): any {
    let rows: any = {};
    rows.rowsHeaderVisible = {};
    rows.rowsHeaderVisible.content = [];
    rows.rowsHeaderHideable = {};
    rows.rowsHeaderHideable.content = [];
    rows.rowsBodyVisible = {};
    rows.rowsBodyVisible.content = [];
    rows.rowsBodyHideable = {};
    rows.rowsBodyHideable.content = [];

    let newRowHideable: HtmlElem;
    let newRowVisible: HtmlElem;


    //Inititalize Rows for the always visible part of the header
    for (let row of this.element.header.content) {
      let newRowHideable: HtmlElem = new HtmlElem();
      let newRowVisible: HtmlElem = new HtmlElem();

      newRowHideable.content = [];
      newRowHideable.tag = "tableHeadCell";
      newRowHideable.parameters = row.parameters;

      newRowVisible.content = [];
      newRowVisible.tag = "tableHeadCell";
      newRowVisible.parameters = row.parameters;
      for (let i = 0; i < row.content.length; i++) {
        if (i < this.numColVisible) {
          newRowVisible.content.push(row.content[i]);
        } else {
          newRowHideable.content.push(row.content[i]);
        }
      }
      rows.rowsHeaderHideable.content.push(newRowHideable);
      rows.rowsHeaderVisible.content.push(newRowVisible);
    }


    //Initialize Rows for hideable part of the body. Here the table is represented
    for (let i = 0; i < this.tableBodyAsArray.length; i++) {
      let newRowVisible: HtmlElem = new HtmlElem();

      newRowVisible.content = [];
      newRowVisible.tag = "tableHeadCell";
      newRowVisible.parameters = this.element.body.content[i].parameters;

      newRowVisible.hideable = {};
      newRowVisible.hideable.content = [];

      // Create the always visible part of the row
      for (let j = 0; j < this.tableBodyAsArray[i].length; j++) {
        if (j < this.numColVisible && this.tableBodyAsArray[i][j] != "block") {
          if (j == this.dataTogglePosition - 1) {
            this.tableBodyAsArray[i][j].parameters.isToggle = true;
          }

          newRowVisible.content.push(this.tableBodyAsArray[i][j]);
        }
      }

      //TODO: Make it more generic
      let firstHeaderRow: any = rows.rowsHeaderHideable.content[0];
      // Create the hideable part of the row
      for (let j = 0; j < firstHeaderRow.content.length; j++) {
        let elem: HtmlElem = new HtmlElem();
        elem.content = [];

        //If a second header row exist
        if (rows.rowsHeaderHideable.content[1]) {

          let colspan = 1;
          if (firstHeaderRow.content[j].parameters.colspan) {
            colspan = firstHeaderRow.content[j].parameters.colspan;
          }

          elem.headline = firstHeaderRow.content[j].content;
          elem.content = [];

          //TODO: Make it more generic
          let secondHeaderRow = rows.rowsHeaderHideable.content[1];

          //j is the position in the row where the considered header cell is. K represents the position of the body cell
          //k is incrementing as long as we are viewing the column area (j + colspan) of the header cell
          for (let k = j; k < colspan + j; k++) {
            let subElem: any = {};

            let name: HtmlElem = new HtmlElem();
            name.content = secondHeaderRow.content[k].content;

            let value: HtmlElem = new HtmlElem();
            //The body is not seperated in visible and hideable part here, therefore we have to add the number of
            //visible columns to get the right position
            if (this.tableBodyAsArray[i][k + this.numColVisible] && this.tableBodyAsArray[i][k + this.numColVisible] != "block") {
              value.content = this.tableBodyAsArray[i][k + this.numColVisible].content;
            }

            subElem.name = name;
            subElem.value = value;

            elem.content.push(subElem);
          }
        //Else there is just one header row;
        } else {
          let subElem: any = {};

          let name: HtmlElem = new HtmlElem();
          name.content = firstHeaderRow.content[j].content;

          let value: HtmlElem = new HtmlElem();
          value.content = this.tableBodyAsArray[i].content;

          subElem.name = name;
          subElem.content = value;

          elem.content.push(subElem);
        }

        newRowVisible.hideable.content.push(elem);
      }
      rows.rowsBodyVisible.content.push(newRowVisible);
    }

    return rows;

  }

  /**
   * Handles action when toggleable cell is clicked
   * @param toggledRowIndex Row of the toggled cell
   */
  private onCellClick(toggledRowIndex: number) {
    //Mark the row as toggled
    if (this.isCellToggled[toggledRowIndex] == true) {
      this.isCellToggled[toggledRowIndex] = false;
    } else {
      this.isCellToggled[toggledRowIndex] = true;
    }

    //Increment rowspan of each cell in toggled row
    for (let cell of this.rows.rowsBodyVisible.content[toggledRowIndex].content) {
      if (!cell.parameters.isToggle) {
        if (this.isCellToggled[toggledRowIndex] == true) {
          if (!cell.parameters.rowspan) {
            cell.parameters.rowspanToggle = 2
          } else {
            cell.parameters.rowspanToggle = cell.parameters.rowspan + 1;
          }
        } else {
          if (cell.parameters.rowspanToggle) {
            cell.parameters.rowspanToggle = null;
          }
        }
      }
    }

    //Increment rowspan of cells which are in the toggled row because of its rowspan
    let rowIndex: number = 0;
    for (let row of this.rows.rowsBodyVisible.content) {
      for (let cell of row.content) {
        if (this.isCellToggled[toggledRowIndex] == true) {
          if (cell.parameters.rowspan && cell.parameters.rowspan + rowIndex - 1 == toggledRowIndex) {
            cell.parameters.rowspanToggle = cell.parameters.rowspan + 1;
          }
        } else {
          if (cell.parameters.rowspanToggle && cell.parameters.rowspanToggle + rowIndex - 2 == toggledRowIndex && rowIndex != toggledRowIndex) {
            cell.parameters.rowspanToggle = null;
          }
        }
      }
      rowIndex++;
    }
  }

}


