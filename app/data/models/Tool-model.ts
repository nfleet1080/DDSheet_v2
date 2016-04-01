import {ItemCategory} from './Item-category-model';

export class Tool {
    id: number;


    /**
     * Creates an instance of Tool.
     * 
     * @param {string} [name="Tool Name"] (description)
     * @param {number} [cost=1] (description)
     * @param {number} Weight (in lbs.)
     * @param {number} categoryID (ItemCategory ID)
     */
    constructor(
        public name: string = "Tool Name",
        public cost: number = 1,
        public Weight: number,
        public categoryID: number
    ) { }
}