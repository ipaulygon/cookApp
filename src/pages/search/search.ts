import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipePage } from '../recipe/recipe';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  form : FormGroup;
  form1 : FormGroup;
  search : any;
  posts: any;
  nonePosts: any;
  users: any;
  noneUsers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController,) {
    this.search = "posts";
    this.form = formBuilder.group({
        searchRecipe: ['', Validators.compose([Validators.required])],
    });
    this.form1 = formBuilder.group({
        searchUser: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchRecipe(){
    if(!this.form.valid){
      
    }else{
      let searchRecipe = this.form.value.searchRecipe;
      let data = JSON.stringify({searchRecipe});
      let link = "http://192.168.56.1/cookApp/searchRecipe.php";
      this.http.post(link,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            if(data[0].userId!=0){
              this.posts = data;
              this.nonePosts = null;
            }else{
              this.nonePosts = data;
            }
          }//end of subscribe
        );//end of post
    }//end of else
  }

  searchUser(){
    if(!this.form1.valid){
      
    }else{
      let searchUser = this.form1.value.searchUser;
      let data = JSON.stringify({searchUser});
      let link = "http://192.168.56.1/cookApp/searchUser.php";
      this.http.post(link,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            if(data[0].userId!=0){
              this.users = data;
              this.noneUsers = null;
            }else{
              this.noneUsers = data;
            }
          }//end of subscribe
        );//end of post
    }//end of else
  }

  userAction(){
    let user = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'search',
          text: 'View',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          icon: 'eye-off',
          text: 'Unfollow',
          handler: () => {
             console.log('Archive clicked');
          }
        },
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]//end of buttons
    });//end of create
    user.present();
  }

  view(id,recipe,desc,user,first,last,thumb){
    let data = JSON.stringify({id});
    let link = "http://192.168.56.1/cookApp/viewRecipe.php";
    this.http.post(link,data)
      .map(res => res.json())
        .subscribe(data => {
          //subscribe
          let recipeModal = this.modalCtrl.create(RecipePage, {id,recipe,desc,user,first,last,thumb,data});
          recipeModal.present();
        }//end of subscribe
      );//end of post
  }
}
