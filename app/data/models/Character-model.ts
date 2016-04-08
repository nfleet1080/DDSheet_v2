export class Character {
    public id: number;


    constructor(
        public name: string = "Character Name",
        public Classes: Array<number> = [1],
        public level: number = 1,
        public image: string = "img/robe.svg",
        public lastDate: Date = new Date(),
        public RaceID: number = 1,
        public SubraceID: number = 1
    ) { }
}
