import {Page, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../data/data-service';
import {Ability} from '../../data/models/Ability-model';

@Page({
    templateUrl: 'build/pages/loading/loading.html',
    providers: [DataService]
})
export class LoadingPage {
    abilities:Array<Ability> = new Array<Ability>();

    constructor(private nav: NavController, navParams: NavParams, data: DataService) {
        // If we navigated to this page, we will have an item available as a nav param
        console.info(data);
        this.abilities = data.abilities;
        console.log(this.abilities);
    }

}
