export class Character {
    public id: number;


    constructor(
        public name: string = "Character Name",
        public Class: string = "Fighter",
        public level: number = 1,
        public image: string = "img/robe.svg",
        public lastDate: Date = new Date(),
        public RaceID: number,
        public SubraceID: number
    ) { }
}