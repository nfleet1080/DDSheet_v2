/**
 * Ability Model
 * 
 * @export
 * @class Ability
 */
export class Ability {
    public id: number;

    /**
     * Creates an instance of Ability.
     * 
     * @param {string} [name="Ability Name"] (description)
     * @param {string} description (description)
     */
    constructor(
        public name: string = "Ability Name",
        public description: string
    ) { }
}