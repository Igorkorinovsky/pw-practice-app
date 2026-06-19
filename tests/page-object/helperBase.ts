import { Page } from '@playwright/test';
//import { NavigationPage } from './navigationPage';
//import { FormLayoutsPage } from './formLayoutsPage';



export class HelperBase {

  readonly page: Page;
 


  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
   await this.page.waitForTimeout(timeInSeconds * 1000)
  }
}