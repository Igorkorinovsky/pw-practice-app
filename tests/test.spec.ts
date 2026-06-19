import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
});


test('locator syntax rules', async ({ page }) => {
 //find tag by locator
  await page.locator('input').first().click()

//by id
  page.locator('#inputEmail')

//by class value
  page.locator('.shape-rectangle')

//by attribute
  page.locator('[placeholder="Email"]')

//class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combine different selectors
  page.locator('input[placeholder="Email"]')

  //by Xpath(NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail"]')

 //by partial text match
  page.locator(':text=("Using")')

  //by exact text match
  page.locator(':text= is("Using the Grid"')
});

test('user facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click() 
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()


}); 

test('locating child elements', async ({ page }) => {
await page.locator('nb-card nb-radio :text("Option 1")').click();
await page.locator('nb-card').nth(3).getByRole('button').click();

});

test('locating parent elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click();
  await page.locator('nb-card', { has: page.locator("#inputEmail1") }).getByRole('textbox', { name: 'Email' }).click();
  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: 'Email' }).click();

});  

test('reusing locators', async ({ page }) => {
const basicForm = page.locator('nb-card').filter({ has: page.locator(':text("Basic form")') });
const emailField = basicForm.getByRole('textbox', { name: 'Email' });

  await basicForm.getByRole('textbox', { name: 'Email' }).fill('test@example.com'); 
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('password123');
  await basicForm.getByRole('button').click();

  await expect(emailField).toHaveValue('test@example.com');
});

test('extracting values', async ({ page }) => {
//single test value
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

//all text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect (allRadioButtonsLabels).toContain('Option 1')

  //input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' });
  await emailField.fill('test@example.com');
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@example.com')

  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email')

//general assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicForm.locator('button').textContent();
  expect(text).toEqual('Submit')

  //Locator assertions
  await expect.soft(basicForm.locator('button')).toHaveText('Submit')

});