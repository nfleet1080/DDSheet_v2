import {Die} from './Die-model';
import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';


interface Wealth {
    amount: Die; //{min,max,count}
    multiplier: number;
}
export interface Skills {
    howMany: number;
    choices: Array<number>; //skill id
}

/**
 * Type Options:
 * "Weapon"
 * "Armor"
 * "Gear"
 * "Equipment"
 * "Pack"
 * "Category"
 */
export interface equip {
    Type: string;
    id: number;
    ifProficient: boolean;
    qty: number;
}

export class ClassModel {
    

    /**
     * Creates an instance of Class.
     *
     * @param {string} [name="Class Name"] (description)
     * @param {string} description (description)
     * @param {Die} hitDie (description)
     * @param {Array<number>} primaryAbility (ability id)
     * @param {Array<number>} savingThrowProficiencies (ability id)
     * @param {Array<number>} equipmentTypeProficiencies (equipmentType id)
     * @param {Array<number>} armorProficiencies (armor id)
     * @param {Array<number>} weaponProficiencies (weapon id)
     * @param {Array<number>} toolProficiencies (tool id)
     * @param {Wealth} startingWealth (amount {die}, multiplier)
     * @param {(equip)[][][]} startingEquip (description)
     * @param {Skills} skills (howMany, choices [skill id])
     * @param {string} icon (description)
     * @param {string} abilitySuggestion (description)
     * @param {string} backgroundSuggestion (description)
     * @param {string} spellSuggestion (description)
     */
    constructor(
        public id: number = 1,
        public name: string = "Class Name",
        public description: string = null,
        public hitDie: Die = new Die(),
        public primaryAbility: Array<number> = [],
        public savingThrowProficiencies: Array<number> = [],
        public equipmentTypeProficiencies: Array<number> = [],
        public armorProficiencies: Array<number> = [],
        public weaponProficiencies: Array<number> = [],
        public toolProficiencies: Array<number> = [],
        public startingWealth: Wealth = {amount:new Die(),multiplier:1},
        public startingEquip: (equip)[][][] = [],
        public skills: Skills = null,
        public icon: string = null,
        public abilitySuggestion: string = null,
        public backgroundSuggestion: string = null,
        public spellSuggestion: string = null
    ) { }
}

@Component({
    template: `
    <ion-toolbar>
  <ion-title>{{cl.name}} Spell Suggestion</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content [innerHTML]="cl.spellSuggestion">
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class SpellSuggestionModal {
    cl: ClassModel = null;
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        //debugger;
        this.cl = params.data;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}