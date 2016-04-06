import {Component, OnInit} from 'angular2/core';
import {Page, NavController, NavParams, IONIC_DIRECTIVES, Modal, ViewController} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {CharacterService} from '../../../data/character-service';
import {SearchByIDPipe} from '../../../data/pipes/id-search-pipe';
import {Race, Subrace} from '../../../data/models/race-model';
import {Ability, AbilityInfoModal} from '../../../data/models/Ability-model';
import {Character} from '../../../data/models/Character-model';
import {Language, LanguageInfoModal} from '../../../data/models/Language-model';
import {SizeInfoModal, SpeedInfoModal, LanguagesInfoModal, asiInfoModal} from './../components/infoModals';
import {AbilityScorePage} from './abilityScores';

/**
 * This is just used to help display ability scores
 */
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
  <ion-buttons end>
      <button secondary (click)="next()">
      Next
    <ion-icon name="arrow-forward"></ion-icon>
</button>
</ion-buttons>
</ion-navbar>
<ion-content padding  class="cards-bg">
    <ion-card>
        <ion-card-content>
            <div [innerHTML]="race.description"></div>
            <div *ngIf="selectedSubRace.description" highlight [innerHTML]="selectedSubRace.description" style="margin-top:1em"></div>
        </ion-card-content>
    </ion-card>
    <ion-card>
    <ion-item>
        <h2>Ability Score Increase</h2><button item-right clear small (click)="asiInfoPopup()"><ion-icon name="information-circle"></ion-icon></button>
    </ion-item>
    <ion-list>
         <button ion-item *ngFor="#abil of raceAbilities" [attr.highlight]="abil.color" (click)="InfoPopup(abil.ability)">
            {{abil.ability.name}} +{{abil.bonus}}
        </button>
    </ion-list>
    </ion-card>
    <ion-card>
    <ion-item><h2>Size</h2><button item-right clear small (click)="sizeInfoPopup()"><ion-icon name="information-circle"></ion-icon></button></ion-item>
    <ion-list>
      <ion-item>
        {{race.size}}
      </ion-item>
    </ion-list>
    </ion-card>
    <ion-card>
      <ion-item><h2>Speed</h2><button item-right clear small (click)="speedInfoPopup()"><ion-icon name="information-circle"></ion-icon></button></ion-item>
      <ion-list>
        <ion-item>
          {{race.speed}} feet
        </ion-item>
      </ion-list>
    </ion-card>
    <ion-card>
      <ion-item><h2>Languages</h2><button item-right clear small (click)="languageInfoPopup()"><ion-icon name="information-circle"></ion-icon></button></ion-item>
      <ion-list>
        <button ion-item *ngFor="#lang of languages" (click)="languagePopup(lang)" >
          {{lang.name}}
        </button>
      </ion-list>
    </ion-card>
    <ion-card>
      <ion-item><h2>Racial Traits</h2></ion-item>
      <ion-list class="racialTraits">
        <ion-item  *ngFor="#trait of race.traits">
          <h3>{{trait.name}}</h3>
          <p>{{trait.description}}</p>
        </ion-item>
        <ion-item  highlight  *ngFor="#trait of selectedSubRace.traits">
          <h3>{{trait.name}}</h3>
          <p>{{trait.description}}</p>
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
    languages: Array<Language> = [];

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
        // load language data
        dataHelper.getLanguages().subscribe(
            data => {
                this.race.languages.forEach(languageID => {
                    this.languages.push(dataHelper.filterByID(data, languageID));
                });
            },
            error => console.error(error)
        //,() => console.info(this.abilities)
            );
    }

    ngOnInit() { }

    next() {
        this.nav.push(AbilityScorePage);
    }

    /**
     * Used for displaying information about an Ability
     * @param  {Ability}    data [Ability Object]
     */
    InfoPopup(data: Ability) {
        let modal = Modal.create(AbilityInfoModal, data);
        this.nav.present(modal);
    }
    /**
     * Used for displaying information about a Language
     * @param  {any}    data [Ability Object]
     */
    languagePopup(data: Language) {
        let modal = Modal.create(LanguageInfoModal, data);
        this.nav.present(modal);
    }

    /**
     * Display information about what ASI is
     */
    asiInfoPopup() {
        let modal = Modal.create(asiInfoModal);
        this.nav.present(modal);
    }
    /**
     * Display information about what Size is
     */
    sizeInfoPopup() {
        let modal = Modal.create(SizeInfoModal);
        this.nav.present(modal);
    }
    /**
     * Display information about what Speed is
     */
    speedInfoPopup() {
        let modal = Modal.create(SpeedInfoModal);
        this.nav.present(modal);
    }
    /**
     * Display information about what Languages are
     */
    languageInfoPopup() {
        let modal = Modal.create(LanguagesInfoModal);
        this.nav.present(modal);
    }
}