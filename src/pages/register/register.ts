import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  form : FormGroup;
  submitAttempt: boolean = false;
  submitPass: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.form = formBuilder.group({
        first: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        last: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(100), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
        date: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        user: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9.]*'), Validators.required])],
        pass: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9.]*'), Validators.required])],
        passcon: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9.]*'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  register(){
    this.submitAttempt = true;
    if(!this.form.valid){
      
    }
    else{
      let pass = this.form.value.pass;
      let passcon = this.form.value.passcon;
      if(pass!=passcon){
        this.submitPass = true;
      }else{
        this.submitPass = false;
        this.submitAttempt = false;
        let first = this.form.value.first;
        let last = this.form.value.last;
        let email = this.form.value.email;
        let date = this.form.value.date;
        let user = this.form.value.user;
        let data = JSON.stringify({first,last,email,date,user,pass});
        let link = "http://192.168.56.1/cookApp/register.php";
        this.http.post(link,data)
          .map(res => res.json())
            .subscribe(data => {
              //subscribe
              console.log(data);
              let loader = this.loadingCtrl.create({
                content: "Please wait...",
                duration: 200
              });
              loader.present();
              if(data.status==1){
                let toast = this.toastCtrl.create({
                  message: 'Email is already taken',
                  showCloseButton: true,
                  closeButtonText: "X",
                  dismissOnPageChange: false,
                  duration: 1000,
                  position: 'middle',
                });
                toast.present();
              }//end of email taken
              else if(data.status==2){
                let toast = this.toastCtrl.create({
                  message: 'Username is already taken',
                  showCloseButton: true,
                  closeButtonText: "X",
                  dismissOnPageChange: false,
                  duration: 1000,
                  position: 'middle',
                });
                toast.present();
              }//end of username taken
              else{
                this.navCtrl.setRoot(LoginPage);
                let toast = this.toastCtrl.create({
                  message: 'Successfully registered',
                  showCloseButton: true,
                  closeButtonText: "X",
                  dismissOnPageChange: false,
                  duration: 1000,
                  position: 'middle',
                });
                toast.present();
              }
            }//end of subscribe
        );//end of post
      }//end of else
    }//end of validated form
  }//end of register
}//end of class
