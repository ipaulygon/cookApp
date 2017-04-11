import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  form : FormGroup;
  submitAttempt: boolean = false;
  submitPass: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.form = formBuilder.group({
        user: ['', Validators.compose([Validators.required])],
        pass: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }

  login(){
    this.submitAttempt = true;
    if(!this.form.valid){
      
    }else{
      this.submitAttempt = false;
      this.submitPass = false;
      let user = this.form.value.user;
      let pass = this.form.value.pass;
      let data = JSON.stringify({user,pass});
      let link = "http://192.168.56.1/cookApp/login.php";
      this.http.post(link,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            console.log(data);
            if(data[0].status=="0"){
              this.submitPass = true;
            }else{
              localStorage.setItem("id", data[0].id);
              localStorage.setItem("user", data[0].user);
              localStorage.setItem("first", data[0].first);
              localStorage.setItem("last", data[0].last);
              localStorage.setItem("email", data[0].email);
              localStorage.setItem("private", data[0].private);
              localStorage.setItem("bio", data[0].bio);
              localStorage.setItem("birth", data[0].birth);
              localStorage.setItem("create", data[0].create);
              this.navCtrl.setRoot(TabsPage);
            }
          }//end of subscribe
        );//end of post
    }//end of else
  }

}
