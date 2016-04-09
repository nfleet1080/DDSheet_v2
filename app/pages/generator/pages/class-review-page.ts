import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {Character} from '../../../data/models/Character-model';
import {Class} from '../../../data/models/class-model';
import {AbilityScorePage} from './abilityScores';
import {IDtoDataPipe} from '../../../data/pipes/id-search-pipe';


@Page({
  template: `
  <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>{{selectedClass?.name}}</ion-title>
<ion-buttons end>
    <button secondary (click)="next()">
    Next
  <ion-icon name="arrow-forward"></ion-icon>
</button>
</ion-buttons>
</ion-navbar>
<ion-content padding class="cards-bg">
<ion-card>
<ion-card-content>{{selectedClass.description}}</ion-card-content>
</ion-card>
</ion-content>
  `,
  providers: [DataService]
})
export class ClassReviewPage {
  tmpChr: Character;
  selectedClass: Class;

  constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
    this.tmpChr = navParams.get('tempCharacter');
    this.selectedClass = navParams.get('selClass');
  }

  next() {
      this.nav.push(AbilityScorePage, { tempCharacter: this.tmpChr });
  }
}
