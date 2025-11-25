import {
  test as base,
  expect,
  Page,
  Locator,
  TestInfo,
} from "@playwright/test";
import path from "path";
import fs from "fs";

import { StartApplicationPage } from "../pages/StartApplicationPage";
import { PaymentPlanPage } from "../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage";
import { LeftMainPage } from "../pages/LeftMainPage";
import { defaultEnrollmentData } from "./qa-data-reader";

/**
 * Extends the base test with custom UI setup for SEP application.
 *
 * - Adds Basic Auth header using SEP_USERNAME / SEP_PASSWORD
 * - Navigates to SEP_QA_URL
 * - Verifies page title
 * - Takes a screenshot on failure
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const username = process.env.SEP_USERNAME ?? "";
    const password = process.env.SEP_PASSWORD ?? "";
    const authToken = Buffer.from(`${username}:${password}`).toString("base64");

    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });

    await page.goto(process.env.SEP_QA_URL ?? "");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("Checkout | Cydeo");

    await use(page);

    await takeScreenshotIfFailed(page, testInfo);
  },
});

/**
 * Initializes all main page objects for a given Playwright Page.
 */
export function initPages(page: Page) {
  return {
    startApp: new StartApplicationPage(page),
    paymentPlan: new PaymentPlanPage(page),
    review: new ReviewPaymentPage(page),
    leftMain: new LeftMainPage(page),
  };
}

/**
 * Navigates through Step 1 (Start Application) and lands on Step 2 (Payment Plan).
 */
export async function goToStep2(page: Page) {
  const { startApp, paymentPlan } = initPages(page);
  const d = defaultEnrollmentData;

  await startApp.enterFirstName(d.firstName);
  await startApp.enterLastName(d.lastName);
  await startApp.enterEmail(d.email);
  await startApp.enterPhoneNumber(d.phone);
  await startApp.selectHowDidYouHearAboutUs(d.howDidYouHear);

  await startApp.clickNextButton();
  await microSettle(page);

  await expect(paymentPlan.chooseAPaymentPlanText).toBeVisible();

  return { startApp, paymentPlan };
}

/**
 * Navigates through Step 1 & 2 and lands on Step 3 (Review Payment).
 */
export async function goToStep3(page: Page): Promise<ReviewPaymentPage> {
  const { paymentPlan } = await goToStep2(page);

  await paymentPlan.selectPaymentPlan("upfront");
  await microSettle(page);
  await paymentPlan.clickNextButton();

  await microSettle(page);
  return new ReviewPaymentPage(page);
}

// convenient re-exports for tests
export { expect, test as describe };

/**
 * High-level UI flows that chain Page Objects together.
 */
export class CommonUI {
  static startAppPage: StartApplicationPage;
  static paymentPlanPage: PaymentPlanPage;
  static reviewPaymentPage: ReviewPaymentPage;

  /**
   * Completes the start application form.
   */
  static async completeStartApplicationForm(
    page: Page,
    firstName = "John",
    lastName = "Doe",
    email = "John.Doe@example.com",
    phoneNumber = "123456790"
  ): Promise<void> {
    this.startAppPage = new StartApplicationPage(page);
    await this.startAppPage.enterFirstName(firstName);
    await this.startAppPage.enterLastName(lastName);
    await this.startAppPage.enterEmail(email);
    await this.startAppPage.enterPhoneNumber(phoneNumber);
    await this.startAppPage.selectHowDidYouHearAboutUs("Email");
    await this.startAppPage.clickNextButton();
  }

  /**
   * Selects the payment plan after completing the start application step.
   */
  static async completeSelectingPaymentPlan(
    page: Page,
    paymentPlanType = "upfront"
  ): Promise<void> {
    this.paymentPlanPage = new PaymentPlanPage(page);
    await this.paymentPlanPage.selectPaymentPlan(paymentPlanType);
    await this.paymentPlanPage.clickNextButton();
  }

  /**
   * Fills in credit card information on the review payment page.
   */
  static async completeEnteringCardInformation(
    page: Page,
    cardNumber: string = process.env.CARD_NUMBER ?? "",
    expirationDate: string = process.env.CARD_EXPIRATION_DATE ?? "",
    cvc: string = process.env.CARD_SECURITY_CODE ?? "",
    zipCode: string = process.env.ZIP_CODE ?? ""
  ): Promise<void> {
    this.reviewPaymentPage = new ReviewPaymentPage(page);
    await this.reviewPaymentPage.enterCardNumber(cardNumber);
    await this.reviewPaymentPage.enterExpiryDate(expirationDate);
    await this.reviewPaymentPage.enterCVC(cvc);
    await this.reviewPaymentPage.enterZipCode(zipCode);
  }
}

/**
 * A collection of lower-level browser / control helpers.
 * Ported from the BDD framework and adapted for TDD usage.
 */
export class BrowserUtility {
  /**
   * Returns a LeftMainPage instance for the given Page.
   */
  static getLeftMain(page: Page): LeftMainPage {
    return new LeftMainPage(page);
  }

  /**
   * Cleans text content by trimming and collapsing whitespace.
   */
  static async cleanText(locator: Locator): Promise<string> {
    const raw = (await locator.textContent()) ?? "";
    return raw.replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
  }

  /**
   * Converts a formatted money string like "$400" or "$1,200.50"
   * into a numeric value.
   */
  static moneyToNumber(text: string): number {
    const n = Number(String(text).replace(/[^\d.]/g, ""));
    if (Number.isNaN(n)) {
      throw new Error(`Cannot parse money from: ${text}`);
    }
    return n;
  }

  /**
   * Returns native validity when available, otherwise falls back
   * to common Angular / Mat markers on the element or its field container.
   */
  static async controlIsValid(locator: Locator): Promise<boolean> {
    return await locator.evaluate((el: HTMLElement) => {
      const anyEl = el as any;

      if (typeof anyEl.checkValidity === "function") {
        return anyEl.checkValidity();
      }

      const field =
        el.closest(".mat-mdc-form-field") || el.closest("mat-form-field");
      const take = (n: unknown) => n === true || n === "true";

      if (el.hasAttribute("aria-invalid"))
        return !take(el.getAttribute("aria-invalid"));
      if (field && field.hasAttribute("aria-invalid"))
        return !take(field.getAttribute("aria-invalid"));

      const cl = (node: Element | null) =>
        (node && (node as HTMLElement).classList) || {
          contains: () => false,
        };

      if (cl(el).contains("ng-invalid") || cl(field).contains("ng-invalid"))
        return false;
      if (cl(el).contains("ng-valid") || cl(field).contains("ng-valid"))
        return true;

      return true; // safest default
    });
  }

  /**
   * Angular form-level validity helper.
   */
  static async ngFormValid(page: Page): Promise<boolean> {
    const formEl = await page.$("form");
    if (!formEl) return true;

    return await formEl.evaluate((f: HTMLFormElement) => {
      if (f.hasAttribute("aria-invalid")) {
        const v = f.getAttribute("aria-invalid");
        if (v === "true") return false;
        if (v === "false") return true;
      }
      const cl = f.classList || { contains: () => false };
      if (cl.contains("ng-invalid")) return false;
      if (cl.contains("ng-valid")) return true;
      return typeof f.checkValidity === "function" ? f.checkValidity() : true;
    });
  }

  /**
   * Type value into a field, blur it, and wait briefly for validators.
   */
  static async typeAndBlur(locator: Locator, value: string): Promise<void> {
    await locator.fill("");
    if (value) await locator.type(value);
    await locator.blur();
    await locator.page().waitForTimeout(120);
  }

  /**
   * Poll-based assertion for control validity.
   */
  static async expectControlValidity(
    locator: Locator,
    expected: boolean
  ): Promise<void> {
    await expect
      .poll(async () => await BrowserUtility.controlIsValid(locator), {
        timeout: 4000,
        intervals: [120, 200, 300, 500, 900, 1200],
      })
      .toBe(expected);
  }

  /**
   * Checks if an input element has the "required" attribute.
   */
  static async isRequired(locator: Locator): Promise<boolean> {
    return await locator.evaluate((el: HTMLInputElement) => !!el.required);
  }

  /**
   * Returns header and summary locators for a payment plan name.
   * Handles "upfront" and "installments" cases.
   */
  static panelFor(
    name: string,
    paymentPlanPage: PaymentPlanPage
  ): { header: Locator; summaryProbe: Locator } {
    const k = name.toLowerCase();
    if (k.includes("upfront")) {
      return {
        header: paymentPlanPage.upfrontPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderUpfront,
      };
    }
    if (k.includes("installments")) {
      return {
        header: paymentPlanPage.installmentsPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderInstallments,
      };
    }
    throw new Error(`Unknown plan: ${name}`);
  }

  /**
   * Normalizes a plan name and returns its lowercase key.
   * "Installments" → "installments", everything else → "upfront".
   */
  static normalizePlan(name: string): "upfront" | "installments" {
    return name.toLowerCase().includes("install") ? "installments" : "upfront";
  }

  /**
   * Returns the primary locators for a payment plan type.
   */
  static planLocators(
    planKey: "upfront" | "installments",
    paymentPlanPage: PaymentPlanPage
  ): { frame: Locator; option: Locator; amount: Locator } {
    if (planKey === "upfront") {
      return {
        frame: paymentPlanPage.upfrontPaymentFrame,
        option: paymentPlanPage.upfrontPaymentOption,
        amount: paymentPlanPage.upfrontPaymentAmount,
      };
    }
    if (planKey === "installments") {
      return {
        frame: paymentPlanPage.installmentsPaymentFrame,
        option: paymentPlanPage.installmentsPaymentOption,
        amount: paymentPlanPage.installmentsPaymentAmount,
      };
    }
    throw new Error(`Unknown plan: ${planKey}`);
  }

  /**
   * Fills a Stripe iframe input field (card number, expiry, etc.)
   */
  static async fillStripeInput(
    locator: Locator,
    value: string
  ): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill("");
    await locator.type(value);
  }

  /** Checks a checkbox and verifies it is checked. */
  static async check(locator: Locator): Promise<void> {
    await locator.check();
    await expect(locator).toBeChecked();
  }

  /** Unchecks a checkbox and verifies it is unchecked. */
  static async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
    await expect(locator).not.toBeChecked();
  }

  /** Verifies page title. */
  static async verify_title(page: Page, expected: string): Promise<void> {
    // either is fine:
    // const actual = await page.title();
    // expect(actual).toBe(expected);
    await expect(page).toHaveTitle(expected);
  }

  /** Fill an input if visible, else throw. */
  static async enter_input(locator: Locator, input: string): Promise<void> {
    if (await locator.isVisible()) {
      await locator.fill(input);
    } else {
      throw new Error(`Element is not visible: ${locator}`);
    }
  }
}

/**
 * Waits a short time for UI/DOM transitions to settle.
 * Useful after expanding accordions, switching plans, etc.
 */
export async function microSettle(page: Page, ms = 250): Promise<void> {
  await page.waitForTimeout(ms);
}

/**
 * Takes a screenshot of the page if the test has failed.
 */
async function takeScreenshotIfFailed(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  if (testInfo.status !== "failed") return;

  const screenshotDir = path.join(process.cwd(), "screenshots");
  fs.mkdirSync(screenshotDir, { recursive: true });

  const currentDateTime = new Date()
    .toISOString()
    .replace(/[:T.]/g, "_")
    .slice(0, -5);

  const screenshotFileName = `${testInfo.title.replace(
    /\s+/g,
    "_"
  )}_failed_${currentDateTime}.png`;

  const screenshotPath = path.join(screenshotDir, screenshotFileName);

  await page.screenshot({ path: screenshotPath, fullPage: true });
}