import {NavController, NavParams} from 'ionic-angular';
import {Directive, Component} from '@angular/core';
import {raceSelector} from './pages/race-page';

 @Directive({
  selector: 'SelectRace' 
}) 
@Component({
  templateUrl: 'build/pages/generator/generator-main.html',
  directives:[raceSelector]
})

export class CharacterGenerator {

  constructor(private nav: NavController, navParams: NavParams) {

  }
  chooseRace() {
    this.nav.push(raceSelector);
  }
}
