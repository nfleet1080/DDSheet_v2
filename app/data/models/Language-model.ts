import {Race} from './Race-model';


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
        public TypicalSpeakers: Array<number>,
        public Script: string
    ) { }
}