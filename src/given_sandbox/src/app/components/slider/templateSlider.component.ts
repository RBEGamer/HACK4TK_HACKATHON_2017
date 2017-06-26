import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {PlatformService} from "../../../system/platform.service";
import {DynamicComponentAbstract} from "../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-slider',
  templateUrl: 'templateSlider.component.html',
  styleUrls: ['templateSlider.component.css']
})
export class UcpSliderComponent extends DynamicComponentAbstract implements OnInit {
  @Input() public element: any;
  @Input() public list: any;
  @Input() public design: number = 0;
  @Input() public showNavigation: boolean = true;
  @Input() public showHeadline: boolean = true;
  @Input() public staytimePerSlide: number = 5;
  @Input() public automateSliding: boolean = false;
  @Input() public loop: boolean = false;
  @Input() public vertical: boolean = false;

  public transition: boolean = true;
  public actualPage: number = 0;
  public slidesPaused: boolean = true;
  public items: { active: boolean }[] = [];
  public loopList: any;
  public pagesCount: number;
  private automateSubscribtion;
  public backDisabled: boolean;
  public forDisabled: boolean;
  public tabletLP: any;
  public toSoftTablet: any;
  public readyForRendering: boolean = false;

  constructor(protected platformService: PlatformService) {
    super();
  }

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      //Define important variables
      this.tabletLP = window.matchMedia("(max-width: 1100px)");
      this.toSoftTablet = window.matchMedia("(max-width: 630px)");
      this.pagesCount = this.list.length;
      switch (this.design) {
        case 0:
          this.design = this.getDesignStart();
          break;
        case 1:
          this.design = 1;
          break;
        case 2:
          this.design = 1;
          break;
        default:
          this.design -= 1;
      }
      this.readyForRendering = true;
      this.renderDots();
    }
  }

  onResize() {
    this.manageNavigation();
  }

  renderDots() {
    this.manageNavigation();
    if (this.loop) {
      this.createLoopList();
      this.backDisabled = false;
    }
    if (this.automateSliding) this.playSlides();
  }

  //needed for loop function, triplicates array of elements to create the "loop effect"
  createLoopList() {
    this.loopList = null;
    this.loopList = this.list.slice();
    let tempList = this.list.slice();
    for (let k = 0; k < 2; k++)for (let i = 0; i < this.pagesCount; i++) this.loopList.push(tempList[i]);
  }

  manageNavigation() {
    this.transition = false;
    this.actualPage = 0;
    if (this.showNavigation) {
      this.renderItems(this.getDisplayPages());
      this.updateDots();
    }
    if (!this.loop && this.showNavigation) {
      this.backDisabled = true;
      this.forDisabled = this.getDisplayPages() == 1;
    }
  }

  playSlides() {
    this.automateSubscribtion = Observable.interval(this.staytimePerSlide * 1000)
      .subscribe(() => {
        this.toggleNext();
      });
    this.slidesPaused = false;
  }

  pauseSlide() {
    if (!this.slidesPaused) {
      this.automateSubscribtion.unsubscribe();
      this.slidesPaused = true;
      setTimeout(() => {
        this.playSlides();
      }, 10000)
    }
  }

  updateDots() {
    if (this.showNavigation) this.updateSelected(this.getDisplayPages());
  }

  //renders the dot items
  private renderItems(pagesValue: number) {
    this.items = new Array(pagesValue);
    for (let i = 0; i < pagesValue; i++) {
      this.items[i] = {active: i == this.actualPage};
    }
  }

  private updateSelected(pagesValue: number) {
    for (let i = 0; i < pagesValue; i++) this.items[i].active = false;
    this.items[this.actualPage].active = true;
  }

  //if no design is set by CMS, just select the highest possible design
  getDesignStart() {
    return this.pagesCount < 5 ? this.pagesCount : 4;
  }

  //defines how many pages with x slides exist
  getDisplayPages() {
    return this.pagesCount - this.getDesign() + 1;
  }

  getActualPage() {
    return this.actualPage;
  }

  //get appropriate design based on window size
  getDesign() {
    return this.vertical ? 3 : this.design == 1 || !this.tabletLP.matches ? this.design : !this.toSoftTablet.matches ? 2 : 1;
  }

  public getTransition() {
    return this.transition ? "" : "noTransition";
  }

  toggleDotClick(dotCount: number) {
    this.transition = true;
    this.actualPage = dotCount;
    if (!this.loop) {
      this.forDisabled = this.actualPage == (this.getDisplayPages() - 1);
      this.backDisabled = this.actualPage == 0;
    }
    this.updateDots();
    if (this.automateSliding) this.pauseSlide();
  }

  toggleNext() {
    this.transition = true;
    if (this.loop) {
      if (this.actualPage == (this.pagesCount - 1)) {
        this.actualPage++;
        //when transition finished.... (other solution?)
        setTimeout(() => {
          this.transition = false;
          this.actualPage = 0;
          this.updateDots();
        }, 500);
      } else {
        this.actualPage++;
        this.updateDots();
      }
      this.transition = true;
      return;
    } else if (!(this.actualPage == (this.getDisplayPages() - 1))) {
      this.forDisabled = this.actualPage == (this.getDisplayPages() - 2);
      this.actualPage++;
      this.backDisabled = false;
      this.updateDots();
      return;
    }
  }

  togglePrev() {
    this.transition = true;
    if (this.loop) {
      if (this.actualPage == (-this.getDesign() + 1 )) {
        this.actualPage--;
        //when transition finished.... (other solution?)
        setTimeout(() => {
          this.transition = false;
          this.actualPage = this.getDisplayPages() - 1;
          this.updateDots();
        }, 500);
      } else {
        this.actualPage--;
        this.updateDots();
      }
      this.transition = true;
      return;
    } else if (!(this.actualPage == 0)) {
      this.backDisabled = this.actualPage == 1;
      this.actualPage--;
      this.forDisabled = false;
      this.updateDots();
      return;
    }
  }

  translatePagesLoopVertical() {
    const x = (this.actualPage + this.pagesCount) * 100;
    return `translate3d(0, ${-x}%, 0)`;
  }

  translatePagesLoop() {
    const x = (this.actualPage + this.pagesCount) * 100;
    return `translate3d(${-x}%, 0, 0)`;
  }

  translatePages() {
    const x = this.actualPage * 100;
    return `translate3d(${-x}%, 0, 0)`;
  }

  layoutClass() {
    let layoutClass = '';

    switch (this.design) {
      case 1:
        layoutClass = "full-width";
        break;
      case 2:
        layoutClass = "two-grid";
        break;
      case 3:
        layoutClass = "three-grid";
        break;
      default:
        layoutClass = "four-grid";
        break;
    }

    return layoutClass;
  }
}



