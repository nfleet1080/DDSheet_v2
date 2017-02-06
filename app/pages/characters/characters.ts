import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CharacterDetailsPage} from '../character-details/character-details';
import {DataService} from '../../data/data-service';
import {Ability} from '../../data/models/Ability-model';
import {Character} from '../../data/models/Character-model';
import {ClassModel} from '../../data/models/Class-model';
import {IDtoDataPipe} from '../../data/pipes/id-search-pipe';


@Component({
    templateUrl: 'build/pages/characters/characters.html',
    providers: [DataService],
    pipes: [IDtoDataPipe]
})
export class CharactersPage {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
    characters: Array<Character> = [];
    abilities: Array<Ability>;
    classes: Array<ClassModel>;

    constructor(private nav: NavController, navParams: NavParams, private dataHelper: DataService) {
        this.nav = nav;

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.dataHelper.getClasses().subscribe(
            data => {
                this.classes = data;
            },
            error => console.error(error)
            , () => {
            this.characters = [
                new Character(),
                new Character(),
                new Character()
            ];
                //console.info(this.characters);
            }
        );

    }

    viewSheet(event, character) {
        this.nav.push(CharacterDetailsPage, {
            character: character
        });
    }
}
