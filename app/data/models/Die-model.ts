export class Die {
    //public average:number = this.avg();

    constructor(
        public min: number = 1,
        public max: number = 1,
        public count: number = 1
    ) { 
        //console.info(this);
    }

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
    
    public average() : number {
        return Math.ceil(((this.max + this.min) * this.count) / 2);
    }
}