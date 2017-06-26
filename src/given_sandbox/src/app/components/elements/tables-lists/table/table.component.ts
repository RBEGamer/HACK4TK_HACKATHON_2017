import {Component, Renderer, ElementRef} from "@angular/core";
import {TableService} from "./table.service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css'],
  providers: [TableService]
})
export class TableComponent extends DynamicComponentAbstract{
  element: any;
  nativeElement: Node;
  amountTableRows: number;
  content: any;
  numLogicalRows;

  tagsMapping = {
    table: "table",
    tableRow: "tr",
    tableCell: "td",
    tableBody: "tbody",
    tableHead: "thead",
    tableHeadCell: "th",
    headline3: "h3",
    division: "div",
    dataFixed: "data-fixed",
    dataHide: "data-hide"
  };

  constructor(private renderer: Renderer, private elementRef: ElementRef, private tableService: TableService) {
    super();
    //this.nativeElement = elementRef.nativeElement;
  }

  ngOnInit() {

    let text: string = '';
    this.numLogicalRows = 0;

    this.tableService.setColHideSmartphone(this.element.colHide);

    this.tableService.setColHideTablet(this.element.colHideTablet);
    this.tableService.setDataTogglePosition(this.element.dataToggle);

    if (!this.element.scrollbar && !this.element.productComparison) {
      this.tableService.setFirstRowClass("footable-group-row");
    }

    if (this.element.table.content instanceof Array) {
      this.amountTableRows = this.element.table.content.length;
    } else {
      this.amountTableRows = 0;
    }
    this.content = this.renderRows(this.element.table.content);

    console.log("content", this.content);

  }

  /*************
   * Renders selected rows of a given table according to the paramaters
   * @param tableContent
   * @returns {any[]} The selected rows
   */
  private renderRows(tableContent: any): any[] {

    let tableMatrix = this.tableService.createTableMatrix(tableContent)

    //console.log("TableContent", tableContent);
    let result: any = {};
    result.fixedTable = {};
    result.fixedTable.header = {};
    result.fixedTable.header.content = [];
    result.fixedTable.body = {};
    result.fixedTable.body.content = [];

    result.scrollableTable = {};
    result.scrollableTable.header = {};
    result.scrollableTable.header.content = [];
    result.scrollableTable.body = {};
    result.scrollableTable.body.content = [];

    result.totalTable = {};
    result.totalTable.header = {};
    result.totalTable.header.content = [];
    result.totalTable.body = {};
    result.totalTable.body.content = [];
    result.totalTable.parameters = {};

    let numIndexRow: number = 0;
    //Value to count down rows which are in the same line of a row with rowspan
    let highestRowSpan: number = 0;
    let rowClass: string = "odd";
    let nextRowIsHeader: boolean = false;
    let isHeadCell: boolean;
    let logicalRow = 0;
    let maxNumCellsInRow = 0;

    for (let rowElem of tableMatrix) {

      let newRowFixed: any = {};
      newRowFixed.tag = "tableRow";
      newRowFixed.parameters = {};
      newRowFixed.parameters.class = [];
      newRowFixed.content = [];

      newRowFixed.parameters.logicalRow = logicalRow;

      let newRowScroll: any = {};
      newRowScroll.tag = "tableRow";
      newRowScroll.parameters = {};
      newRowScroll.parameters.class = [];
      newRowScroll.content = [];

      newRowScroll.parameters.logicalRow = logicalRow;

      let newRowTotal: any = {};
      newRowTotal.tag = "tableRow";
      newRowTotal.parameters = {};
      newRowTotal.parameters.class = [];
      newRowTotal.content = [];

      newRowTotal.parameters.logicalRow = logicalRow;

      let numIndexCell = 0;

      let isFixCell: boolean;

      let highestRowSpanInRow: number = 1;

      //TODO: Make it more generic
      if ((numIndexRow == 0 && (this.element.dataHead.indexOf("first") > -1 || this.element.dataHead.indexOf("second"))) ||
        (numIndexRow == 1 && this.element.dataHead.indexOf("second")) ||
        nextRowIsHeader) {

        isHeadCell = true;

      } else {
        isHeadCell = false;
      }

      //if a cell is stretched over multiple rows, the row css class of the previous row will be kept. Otherwise the
      //class changes
      if (!isHeadCell) {
        if (highestRowSpan <= 0) {
          if (rowClass == "even") {
            rowClass = "odd";
          } else {
            if (rowClass == "odd") {
              rowClass = "even";
            }
          }
        }
      }

      for (let cellElem of rowElem) {
        if (cellElem != "block" && cellElem) {
          if (cellElem.parameters.rowspan > highestRowSpanInRow) {
            highestRowSpanInRow = cellElem.parameters.rowspan;
          }

          if (numIndexCell + 1 > maxNumCellsInRow) {
            maxNumCellsInRow = numIndexCell + 1;
          }

          if (numIndexCell <= (Number(this.element.fixColumns) - 1)) {
            isFixCell = true;
          } else {
            isFixCell = false;
          }

          if (cellElem.parameters.rowspan && Number(cellElem.parameters.rowspan > 1) && Number(cellElem.parameters.rowspan) > highestRowSpan) {
            highestRowSpan = Number(cellElem.parameters.rowspan);
          }


          let newCell: any = {};
          newCell.parameters = {};
          newCell.parameters = cellElem.parameters;
          newCell.content = cellElem.content;
          newCell.parameters.class = [];

          if (isHeadCell) {
            newCell.tag = "tableHeadCell";
          } else {
            newCell.tag = "tableCell";
          }

          if (isFixCell) {
            //TODO: CSS class "head" ist not working properly
            //newCell.parameters.class.push("head")
            newRowFixed.content.push(newCell);
          } else {
            newRowScroll.content.push(newCell);
          }

          newRowTotal.content.push(newCell);
        }
        numIndexCell++;
      }

      newRowFixed.parameters.highestRowSpanInRow = highestRowSpanInRow;
      newRowScroll.parameters.highestRowSpanInRow = highestRowSpanInRow;
      newRowTotal.parameters.highestRowSpanInRow = highestRowSpanInRow;

      newRowFixed.parameters.class.push(rowClass);
      newRowScroll.parameters.class.push(rowClass);
      newRowTotal.parameters.class.push(rowClass);

      if (isHeadCell) {
        result.fixedTable.header.content.push(newRowFixed);
        result.scrollableTable.header.content.push(newRowScroll);
        result.totalTable.header.content.push(newRowTotal);
      } else {
        result.fixedTable.body.content.push(newRowFixed);
        result.scrollableTable.body.content.push(newRowScroll);
        result.totalTable.body.content.push(newRowTotal);
      }

      result.totalTable.parameters.maxNumCellsInRow = maxNumCellsInRow;

      //TODO: Make it more generic
      if (highestRowSpan > 1 && ((this.element.tablehead == "first" && logicalRow == 0) || (this.element.tablehead == "second" && logicalRow == 1))) {
        nextRowIsHeader = true;
      } else {
        nextRowIsHeader = false;
      }

      if (highestRowSpan <= 1) {
        logicalRow++;
      }

      if (highestRowSpan > 0) {
        highestRowSpan--;
      }

      numIndexRow++;
    }

    this.numLogicalRows = logicalRow + 1;

    return result;
  }

  /**************
   * Determines the css classes for the cell's background
   * @param tableData The whole table from the CMS as JSON
   * @returns {number[]}
   */
  private getCellBackgrounds(tableData: any): number[] {
    let cellBackgrounds: number[] = [];

    return cellBackgrounds;
  }


  private renderPart(part, parent) {
    if ('plain' == part.tag) {
      this.renderer.createText(parent, part.content);
    }
    else {
      if (part.content instanceof Array) {
        let nativeElement = this.renderer.createElement(parent, this.tagsMapping[part.tag]);
        for (let e of part.content) {
          this.setParamterForRenderElement(nativeElement, part.parameters);
          this.renderPart(e, nativeElement);
        }
      }
      else if (typeof part.content == "object") {
        let nativeElement = this.renderer.createElement(parent, this.tagsMapping[part.tag]);
        this.setParamterForRenderElement(nativeElement, part.parameters);
        this.renderPart(part.content, nativeElement);
      }
      else {
        let nativeElement = this.renderer.createElement(parent, this.tagsMapping[part.tag]);
        this.setParamterForRenderElement(nativeElement, part.parameters);
        this.renderer.setText(nativeElement, part.content);
      }
    }
  }


  setParamterForRenderElement(nativeElement: Node, parameters: any) {
    for (let key in parameters) {
      if (parameters[key] instanceof Array) {
        let valuesAsString: string = "";
        for (let value of parameters[key]) {
          if (valuesAsString != "") {
            valuesAsString += " ";
          }
          valuesAsString += value;
        }
        this.renderer.setElementAttribute(nativeElement, key.toString(), valuesAsString);
      } else {
        this.renderer.setElementAttribute(nativeElement, key.toString(), parameters[key]);
      }

    }
  }

  onMouseLeave() {
    this.tableService.changeLogicalRow(-1);
  }

}
