import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//home
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
//tabs
import { SearchPage } from '../pages/search/search';
import { CreatePage } from '../pages/create/create';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
//sides
import { RecipePage } from '../pages/recipe/recipe';
//main
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SearchPage,
    CreatePage,
    NotificationPage,
    ProfilePage,
    RecipePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SearchPage,
    CreatePage,
    NotificationPage,
    ProfilePage,
    RecipePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
