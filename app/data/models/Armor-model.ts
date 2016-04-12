interface ArmorClass{
  ac:number;
  abilityModifierID:number;
  maxModifier:number;
}

export class Armor {
    public id: number;


    /**
     * Creates an instance of Armor.
     *
     * @param {number} typeId (equipmentType id)
     * @param {string} [name="Armor Name"] (description)
     * @param {number} [cost=1] (description)
     * @param {number} [armorClass=1] (description)
     * @param {number} armorClassModifierId (ability id)
     * @param {number} armorClassModifierMax (description)
     * @param {number} strength (description)
     * @param {boolean} [stealthDisadvantage=false] (description)
     * @param {number} weight (description)
     */
    constructor(
        public typeId: number,
        public name: string = "Armor Name",
        public cost: number = 1,
        public armorClass: ArmorClass,
        public strength: number,
        public stealthDisadvantage: boolean = false,
        public weight: number
    ) { }
}
