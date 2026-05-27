// @ts-check
import { test, expect } from '@playwright/test';

/** @param {import('@playwright/test').Page} page */

async function addMatchaToCart(page) {

  await page.goto('/');
  await page.getByRole('button', { name: 'Matcha Latte' }).click();
  await page.getByRole('button', { name: 'Add 1 to Cart' }).click();
}


test("Add Item to Cart", async ({ page }) => {
  await addMatchaToCart(page)
  await expect(page.getByText('Added Matcha Latte to cart')).toBeVisible();
})


test('Test Stripe Checkout', async ({ page }) => {
  await addMatchaToCart(page);
  await page.getByRole('button', { name: '🛒 Cart'}).click();
  await page.getByRole('button', { name: 'Checkout'}).click();
  await page.waitForURL(/checkout.stripe.com/)
});
