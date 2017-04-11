import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { SearchPage } from '../search/search';
import { CreatePage } from '../create/create';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SearchPage;
  tab2Root: any = CreatePage;
  tab3Root: any = HomePage;
  tab4Root: any = NotificationPage;
  tab5Root: any = ProfilePage;

  constructor() {

  }
}
