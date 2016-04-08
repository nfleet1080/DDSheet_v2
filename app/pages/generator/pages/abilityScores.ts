import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';
import {Character} from '../../../data/models/Character-model';
import {Ability, AbilityInfoModal} from '../../../data/models/Ability-model';
import {Race, Subrace, AbilityScore} from '../../../data/models/race-model';
import {Die} from '../../../data/models/Die-model';

interface AbilityDisplay {
    ability: Ability;
    racialBonus: number;
}

@Page({
    template: `
  <ion-navbar *navbar>
  <button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>Ability Scores</ion-title>
  </ion-navbar>
  <ion-content padding class="cards-bg">
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
  <ion-card [ngSwitch]="method">
      <ion-card-content  *ngSwitchWhen="'roll'">
  <button secondary  (click)="roll()">Reroll</button>
    <button primary end (click)="roll()"><ion-icon name="help"></ion-icon></button>
          <ion-row>
              <ion-col width-25>
                  <ion-list>
                    <ion-item *ngFor="#result of rollResults">{{result}}</ion-item>
                  </ion-list>
              </ion-col>
              <ion-col width-75>
                  <ion-list>
                      <ion-item *ngFor="#ab of abilities">{{ab.ability.name}}  <span *ngIf="ab.racialBonus > 0" primary>(+{{ab.racialBonus}})*</span></ion-item>
                  </ion-list>
              </ion-col>
          </ion-row>
          <span primary>* Racial Bonuses</span>
      </ion-card-content>
      <ion-card-content  *ngSwitchWhen="'quick'">quick</ion-card-content>
      <ion-card-content  *ngSwitchWhen="'buy'">point buy</ion-card-content>
      <ion-card-content  *ngSwitchWhen="'manual'">manual entry</ion-card-content>
  </ion-card>
  </ion-content>
  `,
    providers: [DataService, CharacterService]
})
export class AbilityScorePage {
    method: string = "roll";
    tmpChr: Character;
    abilities: Array<AbilityDisplay> = [];
    race: Race;
    subrace: Subrace;
    rollResults: Array<number> = [];

    constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');

        // get race and ability data (to show abilities and bonuses)
        this.getData();
        // perform initial roll
        this.roll();
    }

    getData() {
        // first get race data
        this.dataHelper.getRaces().subscribe(
            data => {
                this.race = this.dataHelper.filterByID(data, this.tmpChr.RaceID);
                this.subrace = this.dataHelper.filterByID(this.race.subraces, this.tmpChr.SubraceID);

                // now get abilities since race data is available
                this.loadAbilities();
            },
            error => console.error(error)
        //,() => console.info(this.abilities)
            );
    }

    loadAbilities() {
        //AbilityDisplay

        // load ability data
        this.dataHelper.getAbilities().subscribe(
            data => {
                data.forEach(ability => {
                    //debugger;
                    var bonus: number = 0;
                    var abBonus: AbilityDisplay;
                    var tmpA: AbilityScore = this.dataHelper.filterByID(this.race.ASI, ability.id);
                    if (tmpA) {
                        // found a bonus
                        bonus = tmpA.bonus;
                    }
                    abBonus = {
                        ability: ability,
                        racialBonus: bonus
                    };
                    this.abilities.push(abBonus);
                });
            },
            error => console.error(error)
        //,() => console.info(this.abilities)
            );
    }

    roll() {
        var dieHelper: Die = new Die(1, 6, 4);
        // clear the existing roll results
        this.rollResults.length = 0

        // for each of the 6 possible scores...
        for (let i = 0; i < 6; i++) {
            var rolls = dieHelper.roll();
            // sort the array from lowest to highest
            rolls.sort(function(a, b) { return a - b });
            // remove the lowest recorded value (first index)
            rolls.splice(1, 1);
            // now that we have the three highest values, add them
            var sum = 0;
            for (let s = 0; s < rolls.length; s++) {
                sum += rolls[s];
            }
            // finally, add this fancy value to the roll results
            this.rollResults.push(sum);
        }

        this.rollResults.sort(function(a, b) { return b - a });
    }

    next() {
        // determine which ability score page is active and use those scores

        //this.nav.push(AbilityScorePage, { tempCharacter: this.tmpChr });
    }
}
