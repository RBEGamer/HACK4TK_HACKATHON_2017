import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.css']
})
export class TabsComponent extends DynamicComponentAbstract implements OnInit {
  public currentTab = 0;

  ngOnInit(): any {
    this.currentTab = 0;
  }

}
