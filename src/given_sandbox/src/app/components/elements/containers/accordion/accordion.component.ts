import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.css'],
})

export class AccordionComponent extends DynamicComponentAbstract implements OnInit {
  private selectedAccordions = [];


  ngOnInit(): void {
    this.closeAllAccordions();

    if (this.element.openFirst) {
      this.selectedAccordions[0] = true;
    }
  }

  toggleAccordion(index: number) {
    if (!this.element.oneElement) {
      this.selectedAccordions[index] = !this.selectedAccordions[index];
    }
    else {
      let lastSelection = this.selectedAccordions[index];
      this.closeAllAccordions();
      this.selectedAccordions[index] = !lastSelection;
    }
  }

  closeAllAccordions() {
    for (var i = 0; i <= this.element.accordionElementList.length - 1; i++) {
      this.selectedAccordions[i] = false;
    }
  }

  isAccordionOpen(index: number) {
    return this.selectedAccordions[index];
  }
}
