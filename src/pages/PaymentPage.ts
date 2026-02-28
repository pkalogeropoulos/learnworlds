import { expect, Locator, Page } from "@playwright/test";
import {User} from "@config";

/**
 * LearnWorlds School Payment Page
 * URL: https://{schoolName}.learnworlds.com/payment
 *
 * Notes:
 * - Logged-out view shows Sign in / Sign up + forms (confirmed on this school page).
 * - After selecting a paid product, payment fields may include card number/expiry/CVC and possibly Stripe/PayPal methods.
 *   Those fields are often inside iframes (Stripe Elements).
 */
export class PaymentPage {
  readonly page: Page;

  // Signup form (a lot of fields exist; keep core ones + extend as needed)
  readonly signupFirstNameInput: Locator;
  readonly signupLastNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;

  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;

  readonly totalAmount: Locator;

  readonly buyButton: Locator; 

  constructor(page: Page) {
    this.page = page;

    //user input locators
    this.signupFirstNameInput = page.getByTestId('first_name');
    this.signupLastNameInput = page.getByTestId('last_name');
    this.signupEmailInput = page.getByTestId('email');
    this.signupPasswordInput = page.getByTestId('password');
    
    //coupon locators
    this.couponInput = page.getByRole('textbox', { name: 'Enter code' });
    this.applyCouponButton = page.getByRole('button', { name: 'Redeem' });

    this.totalAmount = page.locator("#component_1745875797532_344 > div > div.order-summary.mt-2rem > div.flex.a-i-c.j-c-sb > div:nth-child(2) > strong");
    this.buyButton = page.getByRole('button', { name: 'Buy' });
  }

  async setFirstName(firstName: string): Promise<void> {
    await expect(this.signupFirstNameInput).toBeVisible();
    await this.signupFirstNameInput.fill(firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.signupLastNameInput.fill(lastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.signupEmailInput.fill(email);
  }

  async setPassword(password: string): Promise<void> {
    await this.signupPasswordInput.fill(password);
  }

  async setUserData(user: User): Promise<void> {
    await this.setFirstName(user.name);
    await this.setLastName(user.surname);
    await this.setEmail(user.email);
    await this.setPassword(user.password);
  }

  async setCoupon(code: string): Promise<void> {
    await this.couponInput.fill(code);
  }

  async clickRedeemCoupon(): Promise<void> {
    await this.applyCouponButton.click();
  }

  async applyCoupon(code: string):Promise<void> {
    await this.setCoupon(code);
    await this.clickRedeemCoupon();
  }

  async clickBuy(): Promise<void> {
    await expect(this.buyButton).toBeVisible();
    await this.buyButton.click();
  }
}