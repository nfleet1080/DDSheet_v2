/* Exchange Rates
Coin            cp      sp      ep      gp      pp
Copper (cp)     1       1/10    1/50    1/100   1/1,000
Silver (sp)     10      1       1/5     1/10    1/100
Electrum (ep)   50      5       1       1/2     1/20
Gold (gp)       100     10      2       1       1/10
Platinum (pp)   1,000   100     20      10      1
*/

export class Currency {
    constructor(public copper: number = 1) {

    }
    /**
     * Purely for displaying a more readable breakdown of copper
     * @param  {number} copperAmount [description]
     * @return {string}              [description]
     */
    public formatMoney(): string {
        // excluding uncommon/unusual coin (pp and ep)
        if (!isNaN(this.copper)) {
            // determine the Gold amount
            let equ: number = this.copper / 100;
            let gp: number = Math.floor(equ);
            let remainder: number = Math.round((equ % 1) * 100);

            //console.log("equ=" + equ);
            //console.log("current remainder : " + remainder);

            // determine the Silver & Copper amount
            equ = remainder / 10;
            let sp = Math.floor(equ);
            let cp = Math.round((equ % 1) * 10);

            return (gp > 0 ? gp + " gp " : "") + (sp > 0 ? sp + " sp " : "") + (cp > 0 ? cp + " cp " : "").trim();
        }
    }

    /**
     * (adds the supplied wealth to the current copper amount)
     * 
     * @param {number} pp (description)
     * @param {number} gp (description)
     * @param {number} ep (description)
     * @param {number} sp (description)
     * @param {number} cp (description)
     */
    public addWealth(pp: number = 0, gp: number = 0, ep: number = 0, sp: number = 0, cp: number = 0):void {
        let runningTotal: number = 0;
        // start with pp and work down
        runningTotal = pp * 1000;
        runningTotal += gp * 100;
        runningTotal += ep * 50;
        runningTotal += sp * 10;
        runningTotal += cp;
        
        this.copper += runningTotal;
    }
}
