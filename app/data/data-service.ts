import {Page, NavController, NavParams} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Ability} from './models/Ability-model';
import {AdventuringGear} from './models/Adventuring-gear-model'
import {Alignment} from './models/Alignment-model';
import {Armor} from './models/Armor-model';
import {Die} from './models/Die-model';
import {Class} from './models/Class-model';
import {EquipmentPack} from './models/Equipment-pack-model';
import {EquipmentType} from './models/Equipment-type-model';
import {ItemCategory} from './models/Item-category-model';
import {Language} from './models/Language-model';
import {Skill} from './models/Skill-model'
import {Tool} from './models/Tool-model';
import {Weapon} from './models/Weapon-model';
import {Race} from './models/Race-model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()
export class DataService {
    public abilities: Array<Ability> = [];
    adventuringGear: Array<AdventuringGear> = [];
    alignments: Array<Alignment> = [];
    armor: Array<Armor> = [];
    classes: Array<Class> = [];
    equipmentPacks: Array<EquipmentPack> = [];
    equipmentType: Array<EquipmentType> = [];
    itemCategory: Array<ItemCategory> = [];
    languages: Array<Language> = [];
    races: Array<Race> = [];
    skills: Array<Skill> = [];
    tools: Array<Tool> = [];
    weapons: Array<Weapon> = [];

    constructor(private http: Http) {
        //console.info("Data Service Initialized");
        if (this.abilities.length == 0) {
            //this.loadJSONData();
        }
    }


    /**
     * pulls the data from json files into local objects
     */
    loadJSONData() {
        Observable.forkJoin(
            this.http.get('data/json/abilities.json').map((res: Response) => res.json()),
            this.http.get('data/json/adventuringGear.json').map((res: Response) => res.json()),
            this.http.get('data/json/alignments.json').map((res: Response) => res.json()),
            this.http.get('data/json/armor.json').map((res: Response) => res.json()),
            this.http.get('data/json/classes.json').map((res: Response) => res.json()),
            this.http.get('data/json/equipmentPacks.json').map((res: Response) => res.json()),
            this.http.get('data/json/equipmentType.json').map((res: Response) => res.json()),
            this.http.get('data/json/itemCategory.json').map((res: Response) => res.json()),
            this.http.get('data/json/languages.json').map((res: Response) => res.json()),
            this.http.get('data/json/races.json').map((res: Response) => <Race[]>res.json()),
            this.http.get('data/json/skills.json').map((res: Response) => res.json()),
            this.http.get('data/json/tools.json').map((res: Response) => res.json()),
            this.http.get('data/json/weapons.json').map((res: Response) => res.json())
        ).subscribe(
            data => {
                this.abilities = data[0];
                this.adventuringGear = data[1];
                this.alignments = data[2];
                this.armor = data[3];
                this.classes = data[4];
                this.equipmentPacks = data[5];
                this.equipmentType = data[6];
                this.itemCategory = data[7];
                this.languages = data[8];
                this.races = data[9];
                this.skills = data[10];
                this.tools = data[11];
                this.weapons = data[12];
                console.info(data);
            },
            err => console.error(err),
            () => console.info("loading complete?")
            );
    }
    getAbilities() {
        return this.http.get('data/json/abilities.json')
            .map(res => <Ability[]>res.json())
            //.do(data => console.log(data))
            .catch(this.handleError);
    }
    getRaces() {
        return this.http.get('data/json/races.json')
            .map(res => <Race[]>res.json())
            //.do(data => console.log(data))
            .catch(this.handleError);
    }
    filterByID(obj:Array<any>,id:number){
        return obj.filter(item => item.id === id)[0];
    }
    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
