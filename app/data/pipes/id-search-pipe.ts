import {Pipe, PipeTransform} from 'angular2/core';
import {DataService} from './../data-service';

@Pipe({
    name: 'IDtoDataPipe',
    pure: false
})

/**
 * Pass the "dictionary" data here
 */
export class IDtoDataPipe implements PipeTransform {
    constructor(private dataHelper: DataService) {

    }
    transform(items: any[], args: any[]): any {
      //debugger;

        //return items.filter(item => item.id.indexOf(args[0]) !== -1);
        let output: any = [];
        for (let i = 0; i < items.length; i++) {
            output.push(this.dataHelper.filterByID(args[0], items[i]));
        }
        return output;
    }
}
