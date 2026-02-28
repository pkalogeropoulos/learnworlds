import { expect, Locator, Page } from "@playwright/test";

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


  // ======= Auth Area (Login / Sign up / Forgot) =======
  readonly loginSectionHeading: Locator;
  readonly signupSectionHeading: Locator;

  // Login form
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  // Signup form (a lot of fields exist; keep core ones + extend as needed)
  readonly signupFirstNameInput: Locator;
  readonly signupLastNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;

  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;

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

  async setCoupon(code: string): Promise<void> {
    await expect(this.couponInput).toBeVisible();
    await this.couponInput.fill(code);
  }

  async clickRedeemCoupon(code: string): Promise<void> {
    await this.setCoupon(code);
    await this.applyCouponButton.click();
  }

  async clickBuy(): Promise<void> {
    await expect(this.buyButton).toBeVisible();
    await this.buyButton.click();
  }
}