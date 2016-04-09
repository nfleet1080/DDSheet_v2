import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {Character} from '../../../data/models/Character-model';
import {Class} from '../../../data/models/class-model';
import {ClassReviewPage} from './class-review-page';

@Page({
  template: `
  <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>Select Class</ion-title>
</ion-navbar>
<ion-content padding class="cards-bg">
<ion-card>
  <ion-list>
  <button ion-item *ngFor="#class of classes" (click)="selectClass(class)">
    {{class.name}}
  </button>
</ion-list>
</ion-card>
</ion-content>
  `,
  providers: [DataService]
})
export class ClassPage {
classes:Array<Class> = [];
tmpChr: Character;

  constructor(private dataHelper: DataService, private nav: NavController, navParams: NavParams) {
      this.tmpChr = navParams.get('tempCharacter');

      this.getData();
  }

  getData(){
    this.dataHelper.getClasses().subscribe(
        data => {
            this.classes = data;
        },
        error => console.error(error)
        //, () => console.log('')
        );
  }
  selectClass(selClass:Class){
    this.tmpChr.Classes = [];
    this.tmpChr.Classes.push(selClass.id);
    this.nav.push(ClassReviewPage, {
      selClass: selClass,
      tempCharacter: this.tmpChr
    });
  }
}
