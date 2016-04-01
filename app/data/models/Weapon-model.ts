import {EquipmentType} from './Equipment-type-model';
import {WeaponProperty} from './Weapon-property-model';
import {Die} from './Die-model';

enum DamageType {
    "bludgeoning",
    "piercing",
    "slashing"
}

interface Damage {
    damage: Die;
    type: DamageType;
}

export class Weapon {
    public id: number;


    /**
     * Creates an instance of Weapon.
     * 
     * @param {Array<number>} type (EquipmentType id)
     * @param {string} [name="Item Name"] (description)
     * @param {number} [cost=1] (description)
     * @param {Damage} damage (damage {die}, type{damageType})
     * @param {number} weight (description)
     * @param {Array<number>} properties (WeaponProperty id)
     * @param {Die} versatileDamage (description)
     * @param {number} normalRange (description)
     * @param {number} longRange (description)
     */
    constructor(
        public type: Array<number>,
        public name: string = "Item Name",
        public cost: number = 1,
        public damage: Damage,
        public weight: number,
        public properties: Array<number>,
        public versatileDamage: Die,
        public normalRange: number,
        public longRange: number
    ) { }
}