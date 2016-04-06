import {Component} from 'angular2/core';
import {Page, NavParams,ViewController} from 'ionic-angular';

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

@Page({
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
        <ion-card-content>
            {{ab.description}}
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class AbilityInfoModal {
    ab:Ability = new Ability();
    viewCtrl:ViewController;
    
    constructor(viewCtrl: ViewController,params: NavParams) {
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