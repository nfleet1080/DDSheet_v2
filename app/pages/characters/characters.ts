import {Page, NavController, NavParams} from 'ionic-angular';
import {CharacterDetailsPage} from '../character-details/character-details';
import {DataService} from '../../data/data-service';
import {Ability} from '../../data/models/Ability-model';
import {Character} from '../../data/models/Character-model';


@Page({
    templateUrl: 'build/pages/characters/characters.html',
    providers: [DataService]
})
export class CharactersPage {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
    characters: Array<Character> = [
        new Character(),
        new Character(),
        new Character(),
    ];
    abilities: Array<Ability>;

    constructor(private nav: NavController, navParams: NavParams, data: DataService) {
        this.nav = nav;

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
/*        data.loadJSONData().subscribe(
            data => {
                data.abilities = data[0];
                data.adventuringGear = data[1];
                data.alignments = data[2];
                data.armor = data[3];
                data.classes = data[4];
                data.equipmentPacks = data[5];
                data.equipmentType = data[6];
                data.itemCategory = data[7];
                data.languages = data[8];
                data.skills = data[9];
                data.tools = data[10];
                data.weapons = data[11];
            },
            err => console.error(err),
            () => {
                console.log('data get complete');
                console.info(data.abilities);
            }
        );*/

        /*        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                    'american-football', 'boat', 'bluetooth', 'build'];
        
                for (let i = 1; i < 3; i++) {
                    this.characters.push({
                        name: this.icons[Math.floor(Math.random() * this.icons.length)],
                        class: this.icons[Math.floor(Math.random() * this.icons.length)],
                        level: i,
                        lastDate: new Date(),
                        image: "img/robe.svg"
                    });
                }
        
                data.retrieveAbilities().subscribe(
                    data => { this.abilities = data; },
                    err => console.error(err),
                    () => console.log(this.abilities)
                );*/
    }

    viewSheet(event, character) {
        this.nav.push(CharacterDetailsPage, {
            character: character
        });
    }
}
