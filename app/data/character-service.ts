import {Injectable} from '@angular/core';
import {Character} from './models/Character-model';

/**
 * used to hold temporary character information during generation
 * 
 * @export
 * @class CharacterService
 */
@Injectable()
export class CharacterService {
    private _myCharacter: Character;

    constructor() { }

    /**
     * saves temporary character
     * you should getCharacter before making changes
     * 
     * @param tmpChar (description)
     */
    saveCharacter(tmpChar) {
        this._myCharacter = tmpChar;
    }

    /**
     * Gets previously set character information
     * 
     * @returns {Character} (description)
     */
    getCharacter(): Character {
        //debugger;
        if (!this._myCharacter) {
            return new Character();
        } else {
            return this._myCharacter;
        }
    }

}