import {Ability} from './Ability-model';
import {Alignment} from './Alignment-model';
import {Language} from './Language-model'
import {Die} from './Die-model';


interface AbilityScore {
    id: number;
    bonus: number;
}
interface Names {
    male: Array<string>;
    female: Array<string>;
    last: Array<string>;
}
interface Traits {
    name: string;
    description: string;
}
interface Measurement {
    baseValue: number;
    modifier: Die;
}

export interface Subrace {
    id: number;
    name: string;
    description: string;
    ASI: Array<AbilityScore>;
    traits: Array<Traits>;
    height: Measurement;
    weight: Measurement;
}

enum Size { Small, Medium }

/**
 * (description)
 *
 * @export
 * @class Race
 */
export class Race {
    id: number;

    constructor(
        public name: string = "Race Name",
        public image: string,
        public description: string,
        public ASI: Array<AbilityScore>,
        public age: number,
        public ageDesc: string,
        public alignment: number,
        public size: Size,
        public speed: number,
        public traits: Array<Traits>,
        public languages: Array<number>,
        public subraces: Array<Subrace>,
        public playable: boolean
        ) { }
}
