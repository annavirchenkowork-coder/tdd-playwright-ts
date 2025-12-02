import {
  test,
  expect,
  BrowserUtility,
  goToStep2,
} from "../../utilities/sep-test-utilities";
import { qaData } from "../../utilities/qa-data-reader";

test.describe(
  "SEP18 - Payment plan summary values match qa_data.json @sep18",
  () => {
    test("Upfront summary uses correct base, discount, and subtotal @sep18-1", async ({
      page,
    }) => {
      const { paymentPlan } = await goToStep2(page);

      // Test data for upfront (one-time) plan
      const upfront = qaData.prices.find(
        (p) => p.active && p.type === "one-time"
      );
      if (!upfront) {
        throw new Error("No active one-time price found in qaData");
      }

      const expectedBase = upfront.baseAmount;
      const expectedDiscount = upfront.upfrontDiscount
        ? upfront.upfrontDiscountAmount
        : 0;
      const expectedSubtotal = expectedBase - expectedDiscount;

      // Select upfront to ensure summary is visible
      await paymentPlan.selectPaymentPlan("upfront");

      const baseText = await paymentPlan.basePriceAmountUnderUpfront.textContent();
      const discountText =
        await paymentPlan.upfrontDiscountAmountUnderUpfront.textContent();
      const subtotalText =
        await paymentPlan.subtotalAmountUnderUpfront.textContent();

      const base = BrowserUtility.moneyToNumber(baseText ?? "");
      const discount = BrowserUtility.moneyToNumber(discountText ?? "");
      const subtotal = BrowserUtility.moneyToNumber(subtotalText ?? "");

      expect(base).toBe(expectedBase);
      expect(discount).toBe(expectedDiscount);
      expect(subtotal).toBe(expectedSubtotal);
    });

    test("Installments summary uses correct base, installments, and per-month amount @sep18-2", async ({
      page,
    }) => {
      const { paymentPlan } = await goToStep2(page);

      // Test data for installments (recurring) plan
      const installments = qaData.prices.find(
        (p) => p.active && p.type === "recurring"
      );
      if (!installments || !installments.numberOfInstallments) {
        throw new Error(
          "No active recurring price with numberOfInstallments found in qaData"
        );
      }

      const expectedBase = installments.baseAmount;
      const expectedInstallments = installments.numberOfInstallments;
      const expectedPerMonth = expectedBase / expectedInstallments;

      // Select installments to ensure summary is visible
      await paymentPlan.selectPaymentPlan("installments");

      const baseText =
        await paymentPlan.basePriceAmountUnderInstallments.textContent();
      const installmentsText =
        await paymentPlan.installmentsNumberUnderInstallments.textContent();
      const perMonthText =
        await paymentPlan.pricePerInstallmentsAmountUnderInstallments.textContent();
      const firstMonthText =
        await paymentPlan.firstMonthPaymentAmountUnderInstallments.textContent();

      const base = BrowserUtility.moneyToNumber(baseText ?? "");
      const perMonth = BrowserUtility.moneyToNumber(perMonthText ?? "");
      const firstMonth = BrowserUtility.moneyToNumber(firstMonthText ?? "");

      // Base matches QA data
      expect(base).toBe(expectedBase);

      // Installments label contains the correct number (e.g. "5 Installments")
      expect((installmentsText ?? "").includes(String(expectedInstallments))).toBe(
        true
      );

      // Per-month and first-month amounts match calculated monthly price
      expect(perMonth).toBe(expectedPerMonth);
      expect(firstMonth).toBe(expectedPerMonth);
    });
  }
);