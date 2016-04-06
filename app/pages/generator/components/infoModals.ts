import {Page, NavParams,ViewController} from 'ionic-angular';


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
    viewCtrl:ViewController;
    
    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}