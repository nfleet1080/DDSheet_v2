import {Page, NavController, NavParams} from 'ionic-angular';
import {Directive} from 'angular2/core';
import {raceSelector} from './components/race-component';

 @Directive({
  selector: 'SelectRace' 
}) 
@Page({
  templateUrl: 'build/pages/generator/generator-main.html',
  directives:[raceSelector]
})

export class CharacterGenerator {

  constructor(private nav: NavController, navParams: NavParams) {

  }
}