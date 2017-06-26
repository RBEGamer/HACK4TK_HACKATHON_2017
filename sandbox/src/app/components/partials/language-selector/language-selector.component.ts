import {Component, Input, OnInit} from "@angular/core";
import {Language} from "../../../interfaces/language";
import {ConfigurationService} from "../../../services/configuration-service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'language-selector',
  templateUrl: 'language-selector.component.html',
  styleUrls: ['language-selector.css'],
  animations: [
    trigger('visibleState', [
      state('visible', style({
        opacity: '1',
      })),
      state('hidden', style({
        opacity: '0',
      })),
      transition('* <=> visible', animate('300ms ease-out'))
    ])
  ]
})
export class LanguageSelectorComponent extends DynamicComponentAbstract implements OnInit {
  constructor(private configurationService: ConfigurationService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  availableLanguages: Array<Language>;
  currentPath: string;
  currentLanguage: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPath = params['contentId'];
      this.currentLanguage = params['language'];
    });

    this.configurationService.getLanguages().subscribe(languages => this.availableLanguages = languages);

  }

  @Input()
  state = 'hidden';

  toggleVisibility() {
    this.state = (this.state == 'hidden') ? 'visible' : 'hidden';
  }

  navigateToLanguage(language: Language) {
    this.router.navigate([this.currentLanguage, '/', this.currentPath]);

    this.state = 'hidden';
  }
}
