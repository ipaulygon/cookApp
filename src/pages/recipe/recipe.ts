import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/*
  Generated class for the Recipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage {
  recipe: any;
  desc: any;
  user: any;
  first: any;
  last: any;
  thumb: any;
  data: any;
  ingredients: any;
  steps: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = navParams.get('recipe');
    this.desc = navParams.get('desc');
    this.user = navParams.get('user');
    this.first = navParams.get('first');
    this.last = navParams.get('last');
    this.thumb = navParams.get('thumb');
    this.data = navParams.get('data');
    this.ingredients = this.data.ingredients;
    this.steps = this.data.steps;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  back(){
    this.navCtrl.pop();
  }

}
