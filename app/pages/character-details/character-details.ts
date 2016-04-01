import {Page, NavController, NavParams} from 'ionic-angular';
import {Character} from '../../data/models/Character-model';


@Page({
  templateUrl: 'build/pages/character-details/character-details.html'
})
export class CharacterDetailsPage {
  selectedCharacter: Character;


  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCharacter = navParams.get('character');
  }
}
