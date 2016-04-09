export class Currency {
    constructor(public copper: number = 1) {

    }
/**
 * Purely for displaying a more readable breakdown of copper
 * @param  {number} copperAmount [description]
 * @return {[type]}              [description]
 */
    public formatMoney (copperAmount:number):string {
        /*
        Coin            cp      sp      ep      gp      pp
        Copper (cp)     1       1/10    1/50    1/100   1/1,000
        Silver (sp)     10      1       1/5     1/10    1/100
        Electrum (ep)   50      5       1       1/2     1/20
        Gold (gp)       100     10      2       1       1/10
        Platinum (pp)   1,000   100     20      10      1
        */

        // excluding uncommon/unusual coin (pp and ep)
        if (!isNaN(copperAmount)) {
            // determine the Gold amount
            let equ:number = copperAmount / 100;
            let gp:number = Math.floor(equ);
            let remainder:number = Math.round((equ % 1) * 100);

            //console.log("equ=" + equ);
            //console.log("current remainder : " + remainder);

            // determine the Silver & Copper amount
            equ = remainder / 10;
            let sp = Math.floor(equ);
            let cp = Math.round((equ % 1) * 10);

            return (gp > 0 ? gp + " gp " : "") + (sp > 0 ? sp + " sp " : "") + (cp > 0 ? cp + " cp " : "").trim();
        }
    }
}
