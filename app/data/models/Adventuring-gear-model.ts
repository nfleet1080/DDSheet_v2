import {ItemCategory} from './Item-category-model';

export class AdventuringGear {
    public id: number;


    constructor(
        public name: string = "Item Name",
        public cost: number = 1,
        public weight: number,
        public itemCategoryID: number,
        public description: string,
        public capacity: string
    ) { }
}