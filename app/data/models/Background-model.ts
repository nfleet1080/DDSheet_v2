import {equip} from './Class-model';
import {Die} from './Die-model';
import {Currency} from './Currency-model';

export enum proficientType{
    skill,
    tool,
    itemCategory
}

interface characteristicDetail{
    name:string;
    description:string;
    table:Array<characteristicTableDef>;
}
interface characteristicTableDef{
    roll:number;
    description:string;
}
interface proficiency{
    type: proficientType;
    ids: Array<number>;
    quantity:number;
}
interface feature{
    id:number;
    name:string;
    description:string;
}
interface variant{
    use:boolean;
    name:string;
    description:string;
}

export class Background {
    public id: number;


    /**
     * Creates an instance of Background.
     * 
     * @param {string} [name="Background"] (description)
     * @param {Array<proficiency>} proficiencies (description)
     * @param {number} extraLanguages (description)
     * @param {Array<equip>} equipment (description)
     * @param {Array<feature>} features (description)
     * @param {Array<characteristicDetail>} characteristics (description)
     * @param {variant} variantOption (description)
     * @param {string} extraDetail (description)
     */
    constructor(
        public name: string = "Background",
        public proficiencies: Array<proficiency>,
        public extraLanguages: number,
        public equipment: Array<equip>,
        public money:Currency,
        public features: Array<feature>,
        public characteristics: Array<characteristicDetail>,
        public variantOption:variant,
        public extraDetail:string
    ) { }
}