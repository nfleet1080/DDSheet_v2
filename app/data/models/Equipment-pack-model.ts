import {AdventuringGear} from './Adventuring-gear-model';
import {Tool} from './Tool-model';

interface GearItem {
    itemID: AdventuringGear;
    qty: number;
};
interface ToolItem {
    toolID: Tool;
    qty: number;
};

export class EquipmentPack {
    id: number;

    constructor(
        public name: string = "Pack Name",
        public cost: number = 1,
        public contents: (GearItem | ToolItem)[]
    ) { }
}