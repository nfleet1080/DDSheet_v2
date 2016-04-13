import {Ability, AbilityInfoModal} from './Ability-model';
import {Page, NavParams, ViewController, NavController, Modal} from 'ionic-angular';
import {DataService} from './../data-service';

export class Skill {
    id: number;


    constructor(
        public abilityID: number = 1,
        public name: string = "Skill Name",
        public description: string = "description"
    ) { }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>{{sk.name}}</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content [innerHTML]="sk.description">
        </ion-card-content>
    </ion-card>
    <ion-card>
    <ion-item>
    <h2>Ability</h2>
</ion-item>
        <button ion-item (click)="abilityPopup(ab)" [innerHTML]="ab.name">
        </button>
    </ion-card>
  </ion-content>`
})
export class SkillInfoModal {
    sk: Skill = new Skill();
    ab: Ability = new Ability();
    viewCtrl: ViewController;

    constructor(private nav: NavController, public dataHelper: DataService, viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        //debugger;
        this.sk = params.get("skill");
        // get abilities
        dataHelper.getAbilities().subscribe(
            data => { this.ab = dataHelper.filterByID(data, this.sk.abilityID) },
            error => console.error(error),
            () => { });
    }

    /**
* Used for displaying information about an Ability
* @param  {Ability}    data [Ability Object]
*/
    abilityPopup(data: Ability) {
        let modal = Modal.create(AbilityInfoModal, data);
        this.nav.present(modal);
    }

    close() {
        this.viewCtrl.dismiss();
    }
}