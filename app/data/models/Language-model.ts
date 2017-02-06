import {Race} from './Race-model';
import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';


export class Language {
  id: number;

  /**
   * Creates an instance of Language.
   *
   * @param {string} [name="Language Name"]
   * @param {Array<number>} TypicalSpeakers (Race ID)
   * @param {string} Script (description)
   */
  constructor(
    public name: string = "Language Name",
    public TypicalSpeakers: Array<string> = [],
    public Script: string = "Common"
  ) { }
}

@Component({
  template: `
    <ion-toolbar>
  <ion-title>{{lg.name}}</ion-title>
  <ion-buttons end>
      <button danger (click)="close()">
    <ion-icon name="close-circle"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
  <ion-content padding class="cards-bg">
    <ion-card>
    <ion-item>
      <h2>Typical Speakers</h2>
  </ion-item>
    <ion-list>
      <ion-item *ngFor="let ts of lg.TypicalSpeakers">
        {{ts}}
      </ion-item>
      </ion-list>
    </ion-card>
    <ion-card>
    <ion-item>
      <h2>Script</h2>
  </ion-item>
  <ion-list>
    <ion-item>
            {{lg.Script}}
            </ion-item>
          </ion-list>
    </ion-card>
  </ion-content>`
})
export class LanguageInfoModal {
  lg: Language = new Language();
  viewCtrl: ViewController;

  constructor(viewCtrl: ViewController, params: NavParams) {
    this.viewCtrl = viewCtrl;
    //debugger;
    this.lg.id = params.get('id');
    this.lg.name = params.get('name');
    this.lg.TypicalSpeakers = params.get('TypicalSpeakers');
    this.lg.Script = params.get('Script');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
