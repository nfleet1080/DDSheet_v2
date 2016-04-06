import {Component, OnInit} from 'angular2/core';
import {Page, NavController, NavParams, IONIC_DIRECTIVES, Modal, ViewController} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';
import {SearchByIDPipe} from '../../../data/pipes/id-search-pipe';
import {Race, Subrace} from '../../../data/models/race-model';
import {Ability, AbilityInfoModal} from '../../../data/models/Ability-model';
import {Character} from '../../../data/models/Character-model';
import {SizeInfoModal,SpeedInfoModal} from './../components/infoModals';


interface AbilityDisplay {
    ability: Ability;
    bonus: number;
    color: boolean;
}

@Page({
    template: `
    <ion-navbar *navbar>
  <button menuToggle *ngIf="!selectedCharacter">
    <ion-icon name="menu"></ion-icon>
  </button>
  <ion-title>{{selectedSubRace?.name}}</ion-title>
</ion-navbar>
<ion-content padding  class="cards-bg">
    <ion-card>
    <ion-card-header>
        Description
    </ion-card-header>
        <ion-card-content>
            <div [innerHTML]="race.description"></div>
            <div *ngIf="selectedSubRace.description" class="subraceColor" [innerHTML]="selectedSubRace.description" style="margin-top:1em"></div>
        </ion-card-content>
    </ion-card>
    <ion-card>
    <ion-card-header>
        Ability Score Increase
    </ion-card-header>
    <ion-list>
         <button ion-item *ngFor="#abil of raceAbilities" [class.subraceColor]="abil.color" (click)="InfoPopup(abil.ability)">
            {{abil.ability.name}} +{{abil.bonus}}
        </button>
    </ion-list>
    </ion-card>
    <ion-card>
    <ion-card-header>Size</ion-card-header>
    <ion-list>
      <ion-item>
        {{race.size}}<button item-right clear small (click)="sizeInfoPopup()"><ion-icon name="information-circle"></ion-icon></button>
      </ion-item>
    </ion-list>
    </ion-card>
    <ion-card>
    <ion-card-header>Speed</ion-card-header>
    <ion-list>
      <ion-item>
        {{race.speed}} feet<button item-right clear small (click)="speedInfoPopup()"><ion-icon name="information-circle"></ion-icon></button>
      </ion-item>
    </ion-list>
    </ion-card>
  </ion-content>
    `,
    pipes: [SearchByIDPipe],
    providers: [DataService, CharacterService]
})
export class RaceReview implements OnInit {
    race: Race;
    selectedSubRace: Subrace;
    raceAbilities: Array<AbilityDisplay> = [];
    tmpChr: Character;

    constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
        // get the base race/subrace values
        this.tmpChr = navParams.get('tempCharacter');
        this.race = navParams.get('race');
        this.selectedSubRace = dataHelper.filterByID(this.race.subraces, this.tmpChr.SubraceID);
        // load ability data
        dataHelper.getAbilities().subscribe(
            data => {
                this.race.ASI.forEach(ability => {
                    var tmpAbility: AbilityDisplay = {
                        ability: dataHelper.filterByID(data, ability.id),
                        bonus: ability.bonus,
                        color: false
                    };
                    this.raceAbilities.push(tmpAbility);
                });
                this.selectedSubRace.ASI.forEach(ability => {
                    var tmpAbility: AbilityDisplay = {
                        ability: dataHelper.filterByID(data, ability.id),
                        bonus: ability.bonus,
                        color: true
                    };
                    this.raceAbilities.push(tmpAbility);
                });
            },
            error => console.error(error)
        //,() => console.info(this.abilities)
            );
    }

    ngOnInit() { }

    InfoPopup(data: any) {
        //var filteredData:any = this.dataHelper.filterByID(data,id);
        //console.info(data);
        let modal = Modal.create(AbilityInfoModal, data);
        this.nav.present(modal);
    }

    sizeInfoPopup() {
        let modal = Modal.create(SizeInfoModal);
        this.nav.present(modal);
    }
    speedInfoPopup() {
        let modal = Modal.create(SpeedInfoModal);
        this.nav.present(modal);
    }
}
