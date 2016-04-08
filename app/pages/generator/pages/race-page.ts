import {Component, OnInit} from 'angular2/core';
import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {Race} from '../../../data/models/race-model';
import {Character} from '../../../data/models/Character-model';
import {RaceReview} from './race-review-page';

@Page({
    //selector: 'SelectRace',
    template: `
    <ion-navbar *navbar>
  <button menuToggle *ngIf="!selectedCharacter">
    <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>Character Builder</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">
<ion-card>
<ion-card-header>
        Select Race
    </ion-card-header>
    <ion-list class="raceList" *ngFor="#race of races">
    <ion-item-divider light>{{race.name}}</ion-item-divider>
    <button ion-item *ngFor="#subrace of race.subraces" (click)="selectRace(race, subrace.id)">
      {{subrace.name}}
    </button>
  </ion-list>
  </ion-card>
  </ion-content>
    `,
    //directives: [IONIC_DIRECTIVES],
    providers: [DataService]
    // templateUrl: 'app/name.component.html'
})

export class raceSelector implements OnInit {
    races: Array<Race>=[];
    errorMessage: any;
    tmpChr: Character = new Character();

    constructor(dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        //console.log('race component loaded');
        if (navParams.get('tempCharacter')) {
            this.tmpChr = navParams.get('tempCharacter');
        }

        dataHelper.getRaces().subscribe(
            data => this.races = data,
            error => console.error(error)//,
            //() => console.info("race complete?")
        );
    }

    ngOnInit() { }

    selectRace(tmpRace: Race, subRaceID: number) {
        //console.warn(tmpRace.id + " | " + subRaceID);

        // get previous character data
        //this.tmpChr = this.tempCharacter.getCharacter();
        this.tmpChr.RaceID = tmpRace.id;
        this.tmpChr.SubraceID = subRaceID;
        // save data back just in case
        //this.tempCharacter.saveCharacter(this.tmpChr);

        // pass along the full race for easy display
        this.nav.push(RaceReview, {
            race: tmpRace,
            tempCharacter: this.tmpChr
        });
    }
}
