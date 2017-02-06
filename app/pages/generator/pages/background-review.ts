import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../data/data-service';
import {Character} from '../../../data/models/Character-model';
import {Background} from '../../../data/models/Background-model';

@Component({
    template: `
    <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>{{background?.name}}</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">
<ion-card>
  
</ion-card>
</ion-content>
`,
    providers: [DataService]
})

export class BackgroundReviewPage {
    tmpChr: Character;
    background: Background;

    constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        this.tmpChr = navParams.get('tempCharacter');
        this.background = navParams.get('background');
        /*this.tmpChr.Abilities.forEach(ability => {
            console.info(ability.ability.ability.name + ' ' + ability.value + " (+"+ ability.ability.racialBonus +")");
        });*/
        //this.getData();

    }
    getData() {
        this.dataHelper.getBackgrounds().subscribe(
            data => {
                //this.backgrounds = data;
            },
            error => console.error(error)
            //, () => console.log('')
        );
    }
    selectBackground(bg: Background) {
        this.nav.push(BackgroundReviewPage, {
            background: bg,
            tempCharacter: this.tmpChr
        });
    }
    ngOnInit() { }
}