import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../data/data-service';
import {Character} from '../../../data/models/Character-model';
import {Background} from '../../../data/models/Background-model';
import {BackgroundReviewPage} from './background-review';

@Component({
    template: `
    <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>Select Background</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">
<ion-card>
  <ion-list>
  <button ion-item *ngFor="let bg of backgrounds" (click)="selectBackground(bg)">
    {{bg.name}}
  </button>
</ion-list>
</ion-card>
</ion-content>
`,
    providers: [DataService]
})

export class BackgroundSelectionPage {
    tmpChr: Character;
    backgrounds: Array<Background>;

    constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');
        /*this.tmpChr.Abilities.forEach(ability => {
            console.info(ability.ability.ability.name + ' ' + ability.value + " (+"+ ability.ability.racialBonus +")");
        });*/
        this.getData();

    }
    getData() {
        this.dataHelper.getBackgrounds().subscribe(
            data => {
                this.backgrounds = data;
            },
            error => console.error(error)
            //, () => console.log('')
        );
    }
    selectBackground(bg: Background) {
        this.tmpChr.Background = bg.id;

        this.nav.push(BackgroundReviewPage, {
            background: bg,
            tempCharacter: this.tmpChr
        });
    }
    ngOnInit() { }
}