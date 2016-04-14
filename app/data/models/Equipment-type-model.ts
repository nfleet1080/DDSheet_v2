import {Component} from 'angular2/core';
import {Page, NavParams, ViewController} from 'ionic-angular';

export class EquipmentType {
    id: number;

    constructor(
        public name: string = "Equipment Type",
        public don: string = null,
        public doff: string = null,
        public description: string = null
    ) { }
}


@Page({
    template: `
    <ion-toolbar>
  <ion-title>{{et.name}}</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
        <ion-card-content [innerHTML]="et.description">
        </ion-card-content>
    </ion-card>
    <ion-card *ngIf="et.don">
    <ion-item>
    <h2>Don</h2>
    </ion-item>
        <ion-card-content [innerHTML]="et.don">
        </ion-card-content>
    </ion-card>
    <ion-card *ngIf="et.doff">
    <ion-item>
    <h2>Doff</h2>
    </ion-item>
        <ion-card-content [innerHTML]="et.doff">
        </ion-card-content>
    </ion-card>
  </ion-content>`
})
export class EquipmentTypeInfoModal {
    et: EquipmentType = new EquipmentType();
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController, params: NavParams) {
        this.viewCtrl = viewCtrl;
        //debugger;
        this.et = params.data;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
