import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feeds : any;
  noneFeeds : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    let userId = localStorage.getItem("id");
    setInterval(() =>{
      let link = "http://192.168.56.1/cookApp/home.php";
      let data = JSON.stringify({userId});
      this.http.post(link,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            if(data[0].userId!=0){
              this.feeds = data;
            }else{
              this.noneFeeds = data;
            }
          }//end of subscribe
        );//end of post
    },500)
  }

  view(id,recipe,desc,user,first,last,thumb){
    let data = JSON.stringify({id});
    let link = "http://192.168.56.1/cookApp/viewRecipe.php";
    this.http.post(link,data)
      .map(res => res.json())
        .subscribe(data => {
          //subscribe
          console.log(data);
          console.log(recipe);
          let recipeModal = this.modalCtrl.create(RecipePage, {id,recipe,desc,user,first,last,thumb,data});
          recipeModal.present();
        }//end of subscribe
      );//end of post
  }

}
