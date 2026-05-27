// @ts-check
import { test, expect } from '@playwright/test';

/** @param {import('@playwright/test').Page} page */

async function addMatchaToCart(page) {

  await page.goto('/');
  await page.getByRole('button', { name: 'Matcha Latte' }).click();
  await page.getByRole('button', { name: 'Add 1 to Cart' }).click();
}

async function checkoutStripe (page) {
  await page.getByRole('button', { name: '🛒 Cart'}).click();
  await page.getByRole('button', { name: 'Checkout'}).click();
  await page.waitForURL(/checkout.stripe.com/)

}


test("Add Item to Cart", async ({ page }) => {
  await addMatchaToCart(page)
  await expect(page.getByText('Added Matcha Latte to cart')).toBeVisible();
})


test('Stripe Checkout Created', async ({ page }) => {
  await addMatchaToCart(page);
  await checkoutStripe(page);
});

test('Full Stripe Checkout', async ({page}) => {
  await addMatchaToCart(page);
  await checkoutStripe(page);
  await page.locator("#email").fill("test@email.com");
  await page.locator("#one-time-code").fill("000000");
  await page.locator(".SubmitButton-IconContainer").click();
  await page.waitForURL(/localhost:5173\/success/, { timeout: 15000 });
  await expect(page.getByText('Payment was Successful!')).toBeVisible();
})
