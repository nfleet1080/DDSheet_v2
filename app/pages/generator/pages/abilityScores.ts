import {Page, NavController, NavParams, IONIC_DIRECTIVES, Modal, ViewController} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';
import {Character} from '../../../data/models/Character-model';
import {ClassModel} from '../../../data/models/Class-model';
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

interface PointCosts {
    point: number;
    cost: number;
}
interface AbilityScoreDef {
    ability: AbilityDisplay;
    value: number;
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
          
                <button secondary  (click)="roll()"><template [ngIf]="rollResults[0] > 0">Reroll</template><template [ngIf]="rollResults[0] == 0">Roll</template></button>
        <button primary (click)="rollHelp()"><ion-icon name="help"></ion-icon></button>

      </ion-card-content>
      </ion-card>

  </template>

      <template  [ngSwitchWhen]="'quick'">
      <ion-card>
    <ion-card-content>
    Scores ordered from highest value to lowest.  Drag the Abilities to re-position.
          <ion-row>
              <ion-col width-25 class="rollCol">
                  <ion-list no-lines>
                    <ion-item *ngFor="#result of quickScores"><ion-badge highlight>{{result}}</ion-badge></ion-item>
                  </ion-list>
              </ion-col>
              <ion-col width-75>
                  <div [dragula]='"quickAbilityOrder"'   [dragulaModel]='quickAbilities'>
                      <div class="abilities" *ngFor="#ab of quickAbilities">{{ab.ability.name}} <ion-badge *ngIf="ab.racialBonus > 0" primary>+{{ab.racialBonus}}</ion-badge><ion-icon name="reorder" style="float:right"></ion-icon></div>
                      </div>
              </ion-col>
          </ion-row>
              <button primary (click)="quickHelp()"><ion-icon name="help"></ion-icon></button>
</ion-card-content>
      </ion-card>
      </template>
    <template [ngSwitchWhen]="'buy'">
        <ion-card>
            <ion-card-content>
            <ion-badge [attr.secondary]="calculatePointTotal() > 0 ? true : null" [attr.danger]="calculatePointTotal() == 0 ? true : null">{{calculatePointTotal()}}</ion-badge> points available
            </ion-card-content>
            <ion-list>
                <ion-item *ngFor="#buyItem of pointBuy;#i = index">
                    <button (click)="addPoint(i)" [attr.disabled]="buyItem.value == 15 || notEnoughPoints(buyItem.value)">
                    <ion-icon name="add"></ion-icon>
                    </button>
                    <button light>{{buyItem.value}}</button>
                    <button (click)="subtractPoint(i)" [attr.disabled]="buyItem.value == 8">
                    <ion-icon name="remove"></ion-icon>
                    </button>
                    <button clear dark>{{buyItem.ability.ability.name}}&nbsp;<ion-badge *ngIf="buyItem.ability.racialBonus > 0" primary>+{{buyItem.ability.racialBonus}}</ion-badge></button>
                    </ion-buttons>
            </ion-list>
        </ion-card>
    </template>
      <div  *ngSwitchWhen="'manual'">manual entry</div>
      </div>
      <ion-card *ngFor="#class of charClasses">
       <ion-item>
            <h2>{{class.name}} Quick Build</h2>
        </ion-item>
        <ion-card-content [innerHTML]="class.abilitySuggestion">
        </ion-card-content>
      </ion-card>
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
    quickAbilities: Array<AbilityDisplay> = [];
    race: Race;
    subrace: Subrace;
    charClasses: Array<ClassModel> = [];
    rollResults: Array<number> = [0, 0, 0, 0, 0, 0];
    quickScores: Array<number> = [15, 14, 13, 12, 10, 8];
    // numbers represent IDs
    points: number = 27;
    pointBuy: Array<AbilityScoreDef> = [
        /*{ abilityID: 1, value: 8 },
        { abilityID: 2, value: 8 },
        { abilityID: 3, value: 8 },
        { abilityID: 4, value: 8 },
        { abilityID: 5, value: 8 },
        { abilityID: 6, value: 8 },*/
    ];
    manual: Array<AbilityScoreDef> = [
        /*{ abilityID: 1, value: null },
        { abilityID: 2, value: null },
        { abilityID: 3, value: null },
        { abilityID: 4, value: null },
        { abilityID: 5, value: null },
        { abilityID: 6, value: null },*/
    ];
    pointCostValues: Array<PointCosts> = [
        { point: 8, cost: 0 },
        { point: 9, cost: 1 },
        { point: 10, cost: 2 },
        { point: 11, cost: 3 },
        { point: 12, cost: 4 },
        { point: 13, cost: 5 },
        { point: 14, cost: 7 },
        { point: 15, cost: 9 },
    ];
    constructor(private dragulaService: DragulaService, private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');

        // get race and ability data (to show abilities and bonuses)
        this.getData();
        // perform initial roll
        //this.roll();

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
                this.rollAbilities = this.abilities.slice();
                this.quickAbilities = this.abilities.slice();
                
                this.abilities.forEach(ability => {
                    this.pointBuy.push({ability:ability, value:8});
                    this.manual.push({ability:ability, value:null});
                });
            }
        );
    }


    /**
     * Roll 4d6 scores
     */
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

    pointCost(point: number): PointCosts {
        return this.pointCostValues.filter(item => item.point === point)[0];
    }
    calculatePointTotal(): number {
        let runningTotal: number = this.points;
        this.pointBuy.forEach(score => {
            runningTotal -= this.pointCost(score.value).cost;
        });
        return runningTotal;
    }
    notEnoughPoints(currentValue:number) {
        // determine if there are enough points to increase
        // first figure out the cost of the next available value
        let valToIncrease:number = currentValue + 1;
        let newcost:number = 0;
        let currentcost:number = this.pointCost(currentValue).cost;
        if (valToIncrease < 16) {
            newcost = this.pointCost(valToIncrease).cost;
        } else {
            return true;
        }
        // look at the current remaining points...
        var currentPoints:number = this.calculatePointTotal();
        if (currentPoints - (newcost - currentcost) >= 0) {
            return null;
        } else {
            return true;
        }
    };
    addPoint(index:number){
        this.pointBuy[index].value += 1;
    }
    subtractPoint(index:number){
        this.pointBuy[index].value -= 1;
    }
    
    rollHelp(): void {
        let modal = Modal.create(RollInfoModal);
        this.nav.present(modal);
    }
    quickHelp(): void {
        let modal = Modal.create(QuickInfoModal);
        this.nav.present(modal);
    }

    next(): void {
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
        <p>This is a random generation of your character's six ability scores. This is done by simulating four 6-sided dice rolls and recording the total of
the highest three dice. This is done six times (one for each ability) and ordered here 
from highest to lowest.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class RollInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
    }

    close(): void {
        this.viewCtrl.dismiss();
    }
}
@Page({
    template: `
    <ion-toolbar>
  <ion-title>Static Scores</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
        <p>If you want to save time or don’t like the idea of randomly determining ability scores, you can use the following scores instead: 15, 14, 13, 12, 10, 8.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class QuickInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
    }

    close(): void {
        this.viewCtrl.dismiss();
    }
}

