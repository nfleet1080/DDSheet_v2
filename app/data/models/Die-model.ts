export class Die {

    constructor(
        public min: number = 1,
        public max: number = 1,
        public count: number = 1
    ) { }

    public roll(): Array<number> {
        if (!this.count) {
            this.count = 1;
        }
        var r: Array<number> = [];
        for (var i = 0; i < this.count; i++) {
            r.push(Math.floor(Math.random() * (this.max - this.min + 1) + this.min));
        }
        return r;
    }
}