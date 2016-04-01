export class EquipmentType {
    id: number;

    constructor(
        public name: string = "Equipment Type",
        public don: string = "1 minute",
        public doff: string = "1 minute",
        public description: string
    ) { }
}