import {Page, NavController, NavParams, IONIC_DIRECTIVES,Modal, ViewController} from 'ionic-angular';
import {DataService} from '../../../data/data-service';
import {Class, equip, Skills} from '../../../data/models/class-model';
import {AbilityScorePage} from './abilityScores';
import {GenericModal} from './../components/infoModals';
import {IDtoDataPipe,IDtoDataSinglePipe} from '../../../data/pipes/id-search-pipe';

import {Die} from '../../../data/models/Die-model';
import {Character} from '../../../data/models/Character-model';
import {Ability, AbilityInfoModal} from '../../../data/models/Ability-model';
import {Armor} from  '../../../data/models/Armor-model';
import {Weapon} from '../../../data/models/Weapon-model';
import {Tool} from '../../../data/models/Tool-model';
import {Skill,SkillInfoModal} from '../../../data/models/Skill-model';
import {AdventuringGear} from '../../../data/models/Adventuring-gear-model';
import {EquipmentPack} from '../../../data/models/Equipment-pack-model';
import {EquipmentType} from '../../../data/models/Equipment-type-model';
import {ItemCategory} from '../../../data/models/Item-category-model';



@Page({
    template: `
  <ion-navbar *navbar>
<button menuToggle *ngIf="!selectedCharacter">
  <ion-icon name="menu"></ion-icon>
</button>
<ion-title>{{selectedClass?.name}} Features</ion-title>
<ion-buttons end>
    <button secondary (click)="next()">
    Next
  <ion-icon name="arrow-forward"></ion-icon>
</button>
</ion-buttons>
</ion-navbar>
<ion-content padding class="cards-bg" *ngIf="selectedClass">
<ion-card>
<ion-card-content>{{selectedClass.description}}</ion-card-content>
</ion-card>
<ion-card>
<ion-item>
    <h2>Hit Points</h2>
</ion-item>
<ion-list>
<ion-item-divider light>Hit Dice</ion-item-divider>
<ion-item>{{selectedClass.hitDie.count}}d{{selectedClass.hitDie.max}} per {{selectedClass.name}} level</ion-item>
<ion-item-divider light>Hit Points at 1st Level</ion-item-divider>
<ion-item>
  {{selectedClass.hitDie.max}} + your Constitution modifier
</ion-item>
<ion-item-divider light>Hit Points at Higher Levels</ion-item-divider>
<ion-item class="wrap">
    {{selectedClass.hitDie.count}}d{{selectedClass.hitDie.max}} (or {{average(selectedClass?.hitDie)}}) + your Constitution modifier per {{selectedClass.name}} level after 1st
</ion-item>
</ion-list>
</ion-card>
<ion-card>
<ion-item>
    <h2>Proficiencies</h2>
    </ion-item>
<ion-list>
    <ion-item-divider light>Equipment</ion-item-divider>
    <!--ion-item *ngIf="selectedClass.equipmentTypeProficiencies.length == 0">None</ion-item-->
    <template [ngIf]="selectedClass?.equipmentTypeProficiencies.length > 0">
        <ion-item *ngFor="#item of selectedClass.equipmentTypeProficiencies | IDtoDataPipe: equipmentTypeRef">
            {{item.name}}
        </ion-item>
    </template>
    <!--ion-item *ngIf="selectedClass.armorProficiencies.length == 0">None</ion-item-->
    <template [ngIf]="selectedClass.armorProficiencies.length > 0">
        <ion-item *ngFor="#item of selectedClass.armorProficiencies | IDtoDataPipe: armorRef">
            {{item.name}}
        </ion-item>
    </template>
    <!--ion-item *ngIf="selectedClass.weaponProficiencies.length == 0">None</ion-item-->
    <template [ngIf]="selectedClass.weaponProficiencies.length > 0">
        <ion-item *ngFor="#item of selectedClass.weaponProficiencies | IDtoDataPipe: weaponRef">
            {{item.name}}
        </ion-item>
    </template>
    <!--ion-item *ngIf="selectedClass.toolProficiencies.length == 0">None</ion-item-->
    <template [ngIf]="selectedClass.toolProficiencies.length > 0">
        <ion-item *ngFor="#item of selectedClass.toolProficiencies | IDtoDataPipe: toolRef">
            {{item.name}}
        </ion-item>
    </template>
    <ion-item-divider light>Saving Throws</ion-item-divider>
    <button (click)="abilityPopup(item)" ion-item *ngFor="#item of selectedClass.savingThrowProficiencies | IDtoDataPipe: abilitiesRef">
        {{item.name}}
    </button>
    <ion-item-divider light>Skills</ion-item-divider>
    <ion-item class="wrap">
      You will be given a choice of <ion-badge light>{{selectedClass.skills.howMany}}</ion-badge> from
    </ion-item>
    <button (click)="skillPopup(item)" ion-item *ngFor="#item of selectedClass.skills.choices | IDtoDataPipe: skillRef">
      {{item.name}}
    </button>
    </ion-list>
</ion-card>

<ion-card>
<ion-item>
    <h2>Equipment</h2>
    </ion-item>
    <ion-item-divider class="wrap">
    You start with the following equipment, in addition to
    the equipment granted by your background:
    </ion-item-divider>
    <ion-list>
      <ion-item *ngFor="#options of selectedClass.startingEquip" class="wrap">
        <div *ngFor="#orOptions of options;#i = index;">
            <template [ngIf]="i > 0"><br> or </template>({{alphaIndex[i]}})
            <template [ngIf]="orOptions.length > 1 && index > 0"> or</template>
            <span *ngFor="#andOptions of orOptions;#index = index; #last = last">
                <template [ngIf]="index > 0"> and</template>
                <template [ngIf]='andOptions.Type == "Weapon"'>{{andOptions.id | IDtoDataSinglePipe: weaponRef: "name"}}<template [ngIf]="andOptions.ifProficient"> (if proficient)</template></template>
                <template [ngIf]='andOptions.Type == "Armor"'>{{andOptions.id | IDtoDataSinglePipe: armorRef: "name"}}<template [ngIf]="andOptions.ifProficient"> (if proficient)</template></template>
                <template [ngIf]='andOptions.Type == "Gear"'>{{andOptions.id | IDtoDataSinglePipe: gearRef: "name"}}</template>
                <template [ngIf]='andOptions.Type == "Equipment"'>{{andOptions.id | IDtoDataSinglePipe: equipmentTypeRef: "name"}} (any one of)</template>
                <template [ngIf]='andOptions.Type == "Pack"'>{{andOptions.id | IDtoDataSinglePipe: equipmentPackRef: "name"}}</template>
                <template [ngIf]='andOptions.Type == "Category"'>{{andOptions.id | IDtoDataSinglePipe: itemCategoryRef: "name"}}</template>
            </span>
        </div>
      </ion-item>
    </ion-list>
</ion-card>
</ion-content>
  `,
    providers: [DataService],
    pipes: [IDtoDataPipe,IDtoDataSinglePipe]
})
export class ClassReviewPage {
    tmpChr: Character;
    selectedClass: Class;
    abilitiesRef: Array<Ability>;
    armorRef: Array<Armor>;
    weaponRef: Array<Weapon>;
    toolRef: Array<Tool>;
    classRef: Array<Class>;
    skillRef: Array<Skill>;
    gearRef: Array<AdventuringGear>;
    itemCategoryRef: Array<ItemCategory>;
    equipmentPackRef: Array<EquipmentPack>;
    equipmentTypeRef: Array<EquipmentType>;
    alphaIndex:Array<string> = ["a","b","c","d","e","f"];

    constructor(private dataHelper: DataService, private nav: NavController, private navParams: NavParams) {
        this.getData();
        this.tmpChr = navParams.get('tempCharacter');
    }

    getData() {
        // load ability data
        this.dataHelper.loadJSONData().subscribe(
            data => {
                this.abilitiesRef = data[0];
                this.gearRef = data[1];
                this.armorRef = data[3];
                this.classRef = data[4];
                this.equipmentPackRef = data[5];
                this.equipmentTypeRef = data[6];
                this.itemCategoryRef = data[7];
                this.skillRef = data[10];
                this.toolRef = data[11];
                this.weaponRef = data[12];
            },
            error => console.error(error)
            , () => {
                // set the main class object once all data is available
                this.selectedClass = this.navParams.get('selClass');
                //console.info(this.selectedClass.equipmentTypeProficiencies);
            }
            );
    }
    average(hitDie: Die) {
        return Math.ceil((hitDie.max + hitDie.count) / 2);
    }

    genericPopup(title:string, desc:string){
      let modal = Modal.create(GenericModal,{title:title,description:desc});
      this.nav.present(modal);
    }

    /**
     * Used for displaying information about an Ability
     * @param  {Ability}    data [Ability Object]
     */
  abilityPopup(data: Ability) {
        let modal = Modal.create(AbilityInfoModal, data);
        this.nav.present(modal);
    }
      skillPopup(data: Skill) {
        let modal = Modal.create(SkillInfoModal, data);
        this.nav.present(modal);
    }

    next() {
        this.nav.push(AbilityScorePage, { tempCharacter: this.tmpChr });
    }
}
