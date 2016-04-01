import {Die} from './Die-model';
/*import {Ability} from './Ability-model';
import {AdventuringGear} from './Adventuring-gear-model'
import {Alignment} from './Alignment-model';
import {Armor} from './Armor-model';
import {EquipmentPack} from './Equipment-pack-model';
import {EquipmentType} from './Equipment-type-model';
import {Language} from './Language-model';
import {Skill} from './Skill-model'
import {Tool} from './Tool-model';
import {Weapon} from './Weapon-model';*/

interface Wealth {
    amount: Die; //{min,max,count}
    multiplier: number;
}
interface Skills {
    howMany: number;
    choices: Array<number>; //skill id
}
interface equip {
    Type: string;
    id: number;
    ifProficient: boolean;
    qty: number;
}

export class Class {
    public id: number;

    /**
     * Creates an instance of Class.
     * 
     * @param {string} [name="Class Name"] (description)
     * @param {string} description (description)
     * @param {Die} hitDie (description)
     * @param {Array<number>} primaryAbility (ability id)
     * @param {Array<number>} savingThrowProficiencies (ability id)
     * @param {Array<number>} equipmentTypeProficiencies (equipmentType id)
     * @param {Array<number>} armorProficiencies (armor id)
     * @param {Array<number>} weaponProficiencies (weapon id)
     * @param {Array<number>} toolProficiencies (tool id)
     * @param {Wealth} startingWealth (amount {die}, multiplier)
     * @param {(equip)[][][]} startingEquip (description)
     * @param {Skills} skills (howMany, choices [skill id])
     * @param {string} icon (description)
     * @param {string} abilitySuggestion (description)
     * @param {string} backgroundSuggestion (description)
     * @param {string} spellSuggestion (description)
     */
    constructor(
        public name: string = "Class Name",
        public description: string,
        public hitDie: Die,
        public primaryAbility: Array<number>, 
        public savingThrowProficiencies: Array<number>, 
        public equipmentTypeProficiencies: Array<number>, 
        public armorProficiencies: Array<number>, 
        public weaponProficiencies: Array<number>, 
        public toolProficiencies: Array<number>, 
        public startingWealth: Wealth,
        public startingEquip: (equip)[][][],
        public skills: Skills,
        public icon: string,
        public abilitySuggestion: string,
        public backgroundSuggestion: string,
        public spellSuggestion: string
    ) { }
}