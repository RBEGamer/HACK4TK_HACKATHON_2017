import {Component, Input, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-table-scrollable',
  templateUrl: 'table-scrollable.component.html',
  styleUrls: ['table-scrollable.component.css'],
})

export class TableScrollableComponent extends DynamicComponentAbstract implements OnInit{
  @Input()
  element: any;
  isMousePressed: boolean;
  lastPosition: any;
  position: any;
  difference: any;

  ngOnInit() {
    this.isMousePressed = false;
  }

  onMousedown(event) {
    this.isMousePressed = true;
    this.lastPosition = {x: event.clientX, y: event.clientY};
  }

  onMouseup(event) {
    this.isMousePressed = false;
  }

  onMousemove(event) {
    if (this.isMousePressed == true) {
      this.position = {x: event.clientX, y: event.clientY};
      this.difference = {x: this.position.x - this.lastPosition.x, y: this.position.y - this.lastPosition.y}
    }
  }

}

