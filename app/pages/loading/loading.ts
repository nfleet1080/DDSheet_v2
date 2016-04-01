import {Page, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../data/data-service';
import {Ability} from '../../data/models/Ability-model';

@Page({
    templateUrl: 'build/pages/loading/loading.html',
    providers: [DataService]
})
export class LoadingPage {
    abilities:Array<Ability>;

    constructor(private nav: NavController, navParams: NavParams, data: DataService) {

        // If we navigated to this page, we will have an item available as a nav param
        console.info(data);
        this.abilities = data.abilities;

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

}
