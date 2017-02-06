import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

/**
 * Ability Model
 *
 * @export
 * @class Ability
 */
export class Ability {
    public id: number;

    /**
     * Creates an instance of Ability.
     *
     * @param {string} [name="Ability Name"] (description)
     * @param {string} description (description)
     */
    constructor(
        public name: string = "Ability Name",
        public description: string = "Ability Description"
    ) { }
}

export class AbilityScore {

    constructor(
        public abilityID: number = 1,
        public value: number = 1
    ) { }

    public modifier() {
        return Math.floor((this.value - 10) / 2);
    }
}

@Component({
    template: `
    <ion-toolbar>
  <ion-title>{{ab.name}}</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content [innerHTML]="ab.description">
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class AbilityInfoModal {
    ab: Ability = new Ability();
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        //debugger;
        this.ab = params.data;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
