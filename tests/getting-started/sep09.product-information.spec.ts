import {
  test,
  expect,
  BrowserUtility,
  initPages,
} from "../../utilities/sep-test-utilities";
import { qaData } from "../../utilities/qa-data-reader";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

test.describe("SEP09 - Display product information @sep09", () => {
  // =========================================================
  // AC1 – Product name visible on info card
  // =========================================================
  test("AC1 - Product name visible on information card @sep09-1", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programNameOnInfoCard).toBeVisible();
  });

  // =========================================================
  // AC2 – Product name matches left header / expected value
  // =========================================================
  test("AC2 - Product name matches left header @sep09-2", async ({ page }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programNameOnInfoCard).toHaveText(
      new RegExp(`^\\s*${qaData.productName}\\s*$`, "i")
    );
  });

  // =========================================================
  // AC3 – Discounted/original price relationship
  // =========================================================
  test("AC3 - Discounted/original price display is correct @sep09-3", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    // Discounted price visible
    await expect(startApp.discountedPrice).toBeVisible();

    // Original price has strikethrough (<s> tag)
    const tag = await startApp.originalPrice.evaluate((el) => el.tagName);
    expect(tag).toBe("S");

    // Compare values with qaData
    const oneTime = qaData.prices.find(
      (p) => p.active && p.type === "one-time"
    );

    if (!oneTime) {
      throw new Error("No active one-time price found in qaData");
    }

    const expectedOriginal = oneTime.baseAmount;
    const expectedDiscounted = oneTime.upfrontDiscount
      ? oneTime.baseAmount - oneTime.upfrontDiscountAmount
      : oneTime.baseAmount;

    const originalText =
      (await startApp.originalPrice.textContent()) ?? "";
    const discountedText =
      (await startApp.discountedPrice.textContent()) ?? "";

    const original = BrowserUtility.moneyToNumber(originalText);
    const discounted = BrowserUtility.moneyToNumber(discountedText);

    expect(original).toBe(expectedOriginal);
    expect(discounted).toBe(expectedDiscounted);
  });

  // =========================================================
  // AC4 – Flexible payments text
  // =========================================================
  test("AC4 - Flexible payments plan text visible @sep09-4", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.flexiblePaymentsPlanAvailableText).toBeVisible();
    await expect(startApp.flexiblePaymentsPlanAvailableText).toHaveText(
      /flexible payments plan available/i
    );
  });

  // =========================================================
  // AC5 – Program start date visible & matches qaData
  // =========================================================
  test("AC5 - Program start date visible & matches test data @sep09-5", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programStartDate).toBeVisible();

    const dateEscaped = qaData.startDate.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    await expect(startApp.programStartDate).toHaveText(
      new RegExp(dateEscaped, "i")
    );
  });

  // =========================================================
  // AC6 – Refund policy / date visible
  // =========================================================
  test("AC6 - Refund policy text & date visible @sep09-6", async ({ page }) => {
    const { startApp } = initPages(page);

    await expect(startApp.refundEndDate).toBeVisible();

    const refundEscaped = qaData.refundDate.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    await expect(startApp.refundEndDate).toHaveText(
      new RegExp(refundEscaped, "i")
    );
  });
});