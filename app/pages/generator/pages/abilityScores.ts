import {Page, NavController, NavParams, IONIC_DIRECTIVES, Modal, ViewController} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';
import {Character} from '../../../data/models/Character-model';
import {ClassModel, AbilitySuggestionModal} from '../../../data/models/Class-model';
import {Ability, AbilityScore, AbilityInfoModal} from '../../../data/models/Ability-model';
import {Race, Subrace, ASI} from '../../../data/models/race-model';
import {Die} from '../../../data/models/Die-model';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {BackgroundSelectionPage} from './background.ts';

import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[gu-transit]'
})
class DragDirective {
    constructor(el: ElementRef) {
        console.log(el);
        el.nativeElement.style.backgroundColor = 'yellow';

    }
}

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
  <div [ngSwitch]="method">
      <template  [ngSwitchWhen]="'roll'">
    <ion-card>
    <ion-card-content>
    Rolls ordered from highest value to lowest.  Drag the Abilities to re-position.
          <ion-row>
              <ion-col width-25 class="rollCol">
                  <ion-list no-lines>
                    <ion-item *ngFor="#result of rollResults"><ion-badge highlight>{{result}}</ion-badge></ion-item>
                  </ion-list>
              </ion-col>
              <ion-col width-75>
                  <div [dragula]='"rollAbilityOrder"'   [dragulaModel]='rollAbilities'>
                      <div class="abilities" *ngFor="#ab of rollAbilities">{{ab.ability.name}} <ion-badge *ngIf="ab.racialBonus > 0" primary>+{{ab.racialBonus}}</ion-badge><ion-icon name="reorder" style="float:right"></ion-icon></div>
                      </div>
              </ion-col>
          </ion-row>
          
                <button fab fab-left style="position:relative" secondary  (click)="roll()">Reroll</button>
                <button fab fab-center style="position:relative" light  (click)="suggest()">Suggestion</button>
        <button fab fab-right style="position:relative;float-right" primary (click)="rollHelp()"><ion-icon name="help"></ion-icon></button>

      </ion-card-content>
      </ion-card>

  </template>

      <div  *ngSwitchWhen="'quick'">quick</div>
    <div  *ngSwitchWhen="'buy'">point buy</div>
      <div  *ngSwitchWhen="'manual'">manual entry</div>
      </div>
  </ion-content>
  `,
    providers: [DataService, CharacterService, DragulaService],
    directives: [Dragula, DragDirective]

})
export class AbilityScorePage {
    method: string = "roll";
    tmpChr: Character;
    abilities: Array<AbilityDisplay> = [];
    rollAbilities: Array<AbilityDisplay> = [];
    race: Race;
    subrace: Subrace;
    charClasses: Array<ClassModel> = [];
    rollResults: Array<number> = [];

    constructor(private dragulaService: DragulaService, private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');

        // get race and ability data (to show abilities and bonuses)
        this.getData();
        // perform initial roll
        this.roll();

        dragulaService.drag.subscribe((value) => {
            //console.log(value);
            //this.onDrag(value.slice(1));
        });
    }

    getData() {
        // load ability data
        this.dataHelper.loadJSONData().subscribe(
            data => {
                // race data
                this.race = this.dataHelper.filterByID(data[9], this.tmpChr.RaceID);
                this.subrace = this.dataHelper.filterByID(this.race.subraces, this.tmpChr.SubraceID);
                // Class data
                this.charClasses = this.charClasses.slice(); // clear the array
                this.tmpChr.Classes.forEach(chrClass => {
                    this.charClasses.push(this.dataHelper.filterByID(data[4], chrClass));
                });
                // ability data
                data[0].forEach(ability => {
                    //debugger;
                    var bonus: number = 0;
                    var abBonus: AbilityDisplay;
                    // see if the ability is listed in the race's ability increase bonus
                    var tmpA: ASI = this.dataHelper.filterByID(this.race.ASI, ability.id);
                    if (!tmpA) {
                        // no match in racial ability list, so check the subrace
                        tmpA = this.dataHelper.filterByID(this.subrace.ASI, ability.id);
                    }
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
            , () => {
                // set the main class object once all data is available
                //this.selectedClass = this.navParams.get('selClass');
                //console.info(this.selectedClass.equipmentTypeProficiencies);
                this.rollAbilities = this.abilities.slice(); // clear the array
            }
        );
        /*// first get race data
        this.dataHelper.getRaces().subscribe(
            data => {
                this.race = this.dataHelper.filterByID(data, this.tmpChr.RaceID);
                this.subrace = this.dataHelper.filterByID(this.race.subraces, this.tmpChr.SubraceID);

                // now get abilities since race data is available
                this.loadAbilities();
            },
            error => console.error(error)
            //,() => console.info(this.abilities)
        );*/
    }

    /*loadAbilities() {
        //AbilityDisplay

        // load ability data
        this.dataHelper.getAbilities().subscribe(
            data => {
                data.forEach(ability => {
                    //debugger;
                    var bonus: number = 0;
                    var abBonus: AbilityDisplay;
                    // see if the ability is listed in the race's ability increase bonus
                    var tmpA: AbilityScore = this.dataHelper.filterByID(this.race.ASI, ability.id);
                    if (!tmpA) {
                        // no match in racial ability list, so check the subrace
                        tmpA = this.dataHelper.filterByID(this.subrace.ASI, ability.id);
                    }
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
            , () => {
                this.rollAbilities = this.abilities.slice()
            }
        );
    }*/

    roll() {
        var dieHelper: Die = new Die(1, 6, 4);
        // clear the existing roll results
        this.rollResults.length = 0

        // for each of the 6 possible scores...
        for (let i = 0; i < 6; i++) {
            var rolls = dieHelper.roll();
            // sort the array from lowest to highest
            rolls.sort(function (a, b) { return a - b });
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

        this.rollResults.sort(function (a, b) { return b - a });
    }

    suggest() {
        let modal = Modal.create(AbilitySuggestionModal, this.charClasses);
        this.nav.present(modal);
    }
    rollHelp() {
        let modal = Modal.create(RollInfoModal);
        this.nav.present(modal);
    }

    next() {
        // determine which ability score page is active and use those scores

        this.nav.push(BackgroundSelectionPage, { tempCharacter: this.tmpChr });
    }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>4d6 Roll</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
        <p>You generate your character's six ability scores
randomly. This is done by calculating four 6-sided dice rolls and recording the total of
the highest three dice. This is done five more times, so that you have six numbers available, which are ordered here 
from highest to lowest.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class RollInfoModal {
    ab: Ability = new Ability();
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        //debugger;
        this.ab.id = params.get('id');
        this.ab.name = params.get('name');
        this.ab.description = params.get('description');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
