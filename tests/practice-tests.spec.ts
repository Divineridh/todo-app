import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/')

    await expect(page).toHaveTitle(/Todo App/)
})

test('logs in', async ({ page }) => {
    await page.goto('http://localhost:5173/')

    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveTitle(/Todo App/)
})