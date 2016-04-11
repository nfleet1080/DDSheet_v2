import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {Class} from '../../../data/models/class-model';
import {AbilityScorePage} from './abilityScores';
import {IDtoDataPipe} from '../../../data/pipes/id-search-pipe';

import {Character} from '../../../data/models/Character-model';
import {Ability} from '../../../data/models/Ability-model';
import {EquipmentType} from '../../../data/models/Equipment-type-model';
import {Armor} from  '../../../data/models/Armor-model';
import {Weapon} from '../../../data/models/Weapon-model';
import {Tool} from '../../../data/models/Tool-model';
import {Skill} from '../../../data/models/Skill-model';


@Page({
  template: `
  <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>{{selectedClass?.name}} Features</ion-title>
<ion-buttons end>
    <button secondary (click)="next()">
    Next
  <ion-icon name="arrow-forward"></ion-icon>
</button>
</ion-buttons>
</ion-navbar>
<ion-content padding class="cards-bg" *ngIf="selectedClass">
<ion-card>
<ion-card-content>{{selectedClass.description}}</ion-card-content>
</ion-card>
<ion-card>
<ion-item>
    <h2>Hit Points</h2>
</ion-item>
<ion-list>
<ion-item-divider light>Hit Dice</ion-item-divider>
<ion-item>{{selectedClass.hitDie.count}}d{{selectedClass.hitDie.max}} per {{selectedClass.name}} level</ion-item>
<ion-item-divider light>Hit Points at 1st Level</ion-item-divider>
<ion-item *ngFor="#abil of selectedClass.primaryAbility | IDtoDataPipe: abilities">
  {{selectedClass.hitDie.max}} + your {{abil.name}} modifier
</ion-item>
<ion-item-divider light>Hit Points at Higher Levels</ion-item-divider>
<ion-item></ion-item>
</ion-list>
</ion-card>
</ion-content>
  `,
  providers: [DataService],
  pipes: [IDtoDataPipe]
})
export class ClassReviewPage {
  tmpChr: Character;
  selectedClass: Class;
  abilities: Array<Ability>;


  constructor(private dataHelper: DataService, private nav: NavController, private navParams: NavParams) {
    this.getData();
    this.tmpChr = navParams.get('tempCharacter');
  }

  getData(){
    // load ability data
    this.dataHelper.getAbilities().subscribe(
        data => this.abilities = data,
        error => console.error(error)
        , () =>     {this.selectedClass = this.navParams.get('selClass');console.info(this.selectedClass);}

        );
  }

  next() {
      this.nav.push(AbilityScorePage, { tempCharacter: this.tmpChr });
  }
}
