import {Ability} from './Ability-model';

export class Skill {
    id: number;


    constructor(
        public abilityID: number,
        public name: string = "Skill Name",
        public description: string
    ) { }
}