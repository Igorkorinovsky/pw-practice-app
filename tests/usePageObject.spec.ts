import { test, expect } from '@playwright/test';
import { pageManager } from './page-object/pageManager';
import {faker} from '@faker-js/faker'


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')


});

test('navigate to form page', async ({ page }) => {
  const pm = new pageManager(page);
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()

});

test('paramethrized methods', async ({ page }) => {
  const pm = new pageManager(page);
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

  await  pm.navigateTo().formLayoutsPage()
  await  pm.formLayouts().submitUsingTheGridFormWithCredentialAndSelectionOption('test@example.com', 'password123', 'Option 1');

  await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
  await pm.formLayouts().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);


});    