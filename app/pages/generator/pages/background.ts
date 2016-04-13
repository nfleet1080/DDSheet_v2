import {Page, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from 'angular2/core';

@Page({
    template: `
    <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>Select Background</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">

</ion-content>
`
})

export class BackgroundSelection {

    constructor() { }

    ngOnInit() { }
}