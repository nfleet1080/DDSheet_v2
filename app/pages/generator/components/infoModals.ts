import {Page, NavParams, ViewController} from 'ionic-angular';



@Page({
    template: `
    <ion-toolbar>
  <ion-title>{{title}}</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
            <p>{{description}}</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class GenericModal {
    viewCtrl: ViewController;
    title:string = "";
    description:string="";

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        this.title = params.get('title');
        this.description = params.get('description');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>Size</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
            <p>Characters of most races are Medium, a size category
                                    including creatures that are roughly 4 to 8 feet tall.
                                    Members of a few races are Small (between 2 and 4 feet
                                    tall), which means that certain rules of the game affect
                                    them differently.</p><p>The most important of these rules
                                    is that Small characters have trouble wielding heavy
                                    weapons.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class SizeInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>Speed</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
            <p>Your speed determines how far you can move when traveling and fighting.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class SpeedInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>Languages</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
            <p>By virtue of your race, your character can speak, read, and write certain languages.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class LanguagesInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

@Page({
    template: `
    <ion-toolbar>
  <ion-title>Ability Score Increase</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content>
            <p>Every race increases one or more of a character’s ability scores.</p>
            <p>Much of what your character does in the game depends on his or her six abilities: <strong>Strength</strong>, <strong>Dexterity</strong>, <strong>Constitution</strong>, <strong>Intelligence</strong>, <strong>Wisdom</strong>, and <strong>Charisma</strong>. Each ability has a score, which is a number you record on your character sheet.</p>
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class asiInfoModal {
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
