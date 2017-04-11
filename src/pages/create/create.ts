import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Create page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  form : FormGroup;
  form1 : FormGroup;
  form2 : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public formBuilder: FormBuilder, public toastCtrl: ToastController, public http: Http,) {
    this.form = formBuilder.group({
        ingredients: formBuilder.array([
              this.initIngredients(),
        ]),
    });
    this.form1 = formBuilder.group({
        steps: formBuilder.array([
              this.initSteps(),
        ]),
    });
    this.form2 = formBuilder.group({
      recipe: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z0-9. ]*'),Validators.required])],
      recipeDesc: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z0-9.,() ]*')])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  initIngredients(){
    return this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9.,() ]*'), Validators.required])],
        description: ['', Validators.required],
        quantity: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9/. ]*'), Validators.required])],
    });
  }

  initSteps(){
    return this.formBuilder.group({
        step: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z0-9.,() ]*'), Validators.required])],
    });
  }

  addIngredients() {
    // add ingredients to the list
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(this.initIngredients());
  }

  addSteps() {
    // add ingredients to the list
    const control = <FormArray>this.form1.controls['steps'];
    control.push(this.initSteps());
  }

  removeIngredients(i: number) {
    // remove ingredients from the list
    const control = <FormArray>this.form.controls['ingredients'];
    control.removeAt(i);
  }

  removeSteps(i: number) {
    // remove ingredients from the list
    const control = <FormArray>this.form1.controls['steps'];
    control.removeAt(i);
  }

  save(){
    if(!this.form.valid || !this.form1.valid || !this.form2.valid){
      let toast = this.toastCtrl.create({
        message: 'Please fill out all fields',
        showCloseButton: true,
        closeButtonText: "X",
        dismissOnPageChange: false,
        duration: 1000,
      });
      toast.present();
    }else{
      let user = localStorage.getItem("id").toString();
      let recipe = this.form2.value.recipe;
      let recipeDesc = this.form2.value.recipe;
      let qty:Array<string> = [];
      let desc:Array<string> = [];
      let name:Array<string> = [];
      let steps:Array<string> = [];
      for(let i of this.form.value.ingredients){
        qty.push(i.quantity);
        desc.push(i.description);
        name.push(i.name);
      }
      for(let i of this.form1.value.steps){
        steps.push(i.step);
      }
      let data = JSON.stringify({user,recipe,recipeDesc,qty,desc,name,steps});
      let link = "http://192.168.56.1/cookApp/create.php";
      this.http.post(link,data)
        .map(res => res.json())
          .subscribe(data => {
            //subscribe
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.navCtrl.parent.select(2);
            let toast = this.toastCtrl.create({
              message: data.status,
              showCloseButton: true,
              closeButtonText: "X",
              dismissOnPageChange: false,
              duration: 3000,
              position: 'middle',
            });
            toast.present();
          }//end of subscribe
        );//end of post
    }
  }

  upload(){
    let upload = this.actionSheetCtrl.create({
      title: 'Upload a photo',
      buttons: [
        {
          icon: 'camera',
          text: 'Open Camera',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          icon: 'folder',
          text: 'Archive',
          handler: () => {
             console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]//end of buttons
    });//end of create
    upload.present();
  }

}
