import {Page, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from 'angular2/core';
import {DataService} from '../../../data/data-service';
import {Character} from '../../../data/models/Character-model';

@Page({
    template: `
    <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>Select Background</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">

</ion-content>
`,
    providers: [DataService]
})

export class BackgroundSelectionPage {
    tmpChr: Character;

    constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');
        /*this.tmpChr.Abilities.forEach(ability => {
            console.info(ability.ability.ability.name + ' ' + ability.value + " (+"+ ability.ability.racialBonus +")");
        });*/
        
    }

    ngOnInit() { }
}