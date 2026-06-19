import { Page } from '@playwright/test';
import { NavigationPage } from './navigationPage';
import { FormLayoutsPage } from './formLayoutsPage';



export class pageManager {

  private readonly page: Page;
  readonly navigationPage: NavigationPage
  readonly formLayoutsPage: FormLayoutsPage


  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);

  } 
  
  navigateTo() {
    return this.navigationPage
  }

  formLayouts() {
    return this.formLayoutsPage
  } 

}