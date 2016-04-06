import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';

@Page({
  template: `
  <ion-navbar *navbar>
  <button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>Ability Scores</ion-title>
  </ion-navbar>
  <ion-toolbar padding>
  <ion-segment [(ngModel)]="method">
    <ion-segment-button value="roll">
      Roll
    </ion-segment-button>
    <ion-segment-button value="quick">
      Quick
    </ion-segment-button>
    <ion-segment-button value="buy">
      Point Buy
    </ion-segment-button>
    <ion-segment-button value="manual">
      Manual
    </ion-segment-button>
  </ion-segment>
</ion-toolbar>
  <ion-content padding class="cards-bg">

  <ion-card [ngSwitch]="method">
  <ion-card-content  *ngSwitchWhen="'roll'">roll</ion-card-content>
  <ion-card-content  *ngSwitchWhen="'quick'">quick</ion-card-content>
  <ion-card-content  *ngSwitchWhen="'buy'">point buy</ion-card-content>
  <ion-card-content  *ngSwitchWhen="'manual'">manual entry</ion-card-content>

  </ion-card>
  </ion-content>
  `
})
export class AbilityScorePage {
  method:string="roll";
  constructor() { }
}
