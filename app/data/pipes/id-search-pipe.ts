import {Pipe, PipeTransform} from '@angular/core';
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
        //console.info(items);
        //console.info(args);
        //console.info(output);

        return output;
    }
}


@Pipe({
    name: 'IDtoDataSinglePipe',
    pure: false
})

/**
 * Pass the "dictionary" data here
 */
export class IDtoDataSinglePipe implements PipeTransform {
    constructor(private dataHelper: DataService) {

    }
    transform(value: any, args: any[]): any {
        //debugger;
        //console.info(args);
        //console.info("pipe args: " + args);
        return this.dataHelper.filterByID(args[0], value)[args[1]];
    }
}
