import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: any;
  first: any;
  last: any;
  profile: any;
  selfPosts: any;
  noneSelfPosts: any;
  following: any;
  noneFollowing: any;
  follower: any;
  noneFollower: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController,) {
    this.profile = "posts";
    this.user = localStorage.getItem("user");
    this.first = localStorage.getItem("first");
    this.last = localStorage.getItem("last");
    let userId = localStorage.getItem("id");
    setInterval(() => {
      let link1 = "http://192.168.56.1/cookApp/selfPost.php";
      let link2 = "http://192.168.56.1/cookApp/following.php";
      let link3 = "http://192.168.56.1/cookApp/follower.php";
      let data = JSON.stringify({userId});
      this.http.post(link1,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            if(data[0].userId!=0){
              this.selfPosts = data;
              this.noneSelfPosts = null;
            }else{
              this.noneSelfPosts = data;
            }
          }//end of subscribe
        );//end of post
      this.http.post(link2,data)
      .map(res => res.json())
        .subscribe(data => {
          //subscribe
          if(data[0].userId!=0){
            this.following = data;
            this.noneFollowing = null;
          }else{
            this.noneFollowing = data;
          }
        }//end of subscribe
      );//end of post
      this.http.post(link3,data)
      .map(res => res.json())
        .subscribe(data => {
          //subscribe
          if(data[0].userId!=0){
            this.follower = data;
            this.noneFollower = null;
          }else{
            this.noneFollower = data;
          }
        }//end of subscribe
      );//end of post
    },500)
  }

  followingAction(){
    let following = this.actionSheetCtrl.create({
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
    following.present();
  }

  followerAction(){
    let follower = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'search',
          text: 'View',
          handler: () => {
            console.log('Destructive clicked');
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
    follower.present();
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
