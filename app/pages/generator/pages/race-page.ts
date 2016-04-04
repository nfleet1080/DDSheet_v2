import {Component, OnInit} from 'angular2/core';
import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../data/data-service';
import {Race} from '../../data/models/race-model';
import {Character} from '../../data/models/Character-model';

@Page({
    //selector: 'SelectRace',
    template: `
    <ion-navbar *navbar>
  <button menuToggle *ngIf="!selectedCharacter">
    <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>Character Builder</ion-title>
</ion-navbar>
<ion-content>
    <h1 padding>Select Race</h1>
    <ion-list *ngFor="#race of races">
    <ion-item-divider light>{{race.name}}</ion-item-divider>
    <button ion-item *ngFor="#subrace of race.subraces" (click)="selectRace(race.id, subrace.id)">
      {{subrace.name}}
    </button>
  </ion-list>
  </ion-content>
    `,
    //directives: [IONIC_DIRECTIVES],
    providers: [DataService]
    // templateUrl: 'app/name.component.html'
})

export class raceSelector implements OnInit {
    races: Array<Race> = new Array<Race>();
    errorMessage: any;
    tempChar: Character;

    constructor(dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        console.log('race component loaded');
        dataHelper.getRaces().subscribe(
            data => this.races = data,
            error => console.error(error),
            () => console.info("race complete?"));
    }

    ngOnInit() { }

    selectRace(raceID: number, subRaceID: number) {
        console.warn(raceID + " | " + subRaceID);
        this.nav.push(ItemDetailsPage, {
            char: this.tempChar
        });
    }

    getRaces() {

    }
}