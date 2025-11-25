import {
  test,
  expect,
  initPages,
  goToStep2,
  microSettle,
} from "../../utilities/sep-test-utilities";

const GREEN = "rgb(172, 245, 138)";
const BLUE = "rgb(1, 201, 255)";

test.describe(
  "SEP16 - Payment Plan Next button & stepper behavior @sep16",
  () => {
    // =========================================================
    // AC1 - Next button activates after selecting a plan
    // =========================================================
    test("AC1 - Next button activates after selecting a plan @sep16-1", async ({
      page,
    }) => {
      const { paymentPlan } = initPages(page);

      // Go to Step 2 (Payment Plans)
      await goToStep2(page);

      // Next disabled by default
      await expect(paymentPlan.inactiveNextButton).toBeVisible();
      await expect(paymentPlan.inactiveNextButton).toBeDisabled();

      // When user selects upfront payment plan
      await paymentPlan.selectPaymentPlan("upfront");

      // Then Next becomes enabled
      await expect(paymentPlan.activeNextButton).toBeVisible();
      await expect(paymentPlan.activeNextButton).toBeEnabled();
    });

    // =========================================================
    // AC2 - Stepper colors update when proceeding to Step 3
    // =========================================================
    test("AC2 - Stepper colors update when proceeding to Step 3 @sep16-2", async ({
      page,
    }) => {
      const { startApp, paymentPlan } = initPages(page);

      await goToStep2(page);

      // On Step 2 initially:
      await expect(startApp.startApplicationStepCircle).toHaveCSS(
        "background-color",
        GREEN
      );
      await expect(startApp.paymentPlanStepCircle).toHaveCSS(
        "background-color",
        BLUE
      );

      // Select upfront and go Next
      await paymentPlan.selectPaymentPlan("upfront");
      await paymentPlan.clickNextButton();
      await microSettle(page);

      // On Step 3: Step 1 & 2 green, Step 3 blue
      await expect(startApp.startApplicationStepCircle).toHaveCSS(
        "background-color",
        GREEN
      );
      await expect(startApp.paymentPlanStepCircle).toHaveCSS(
        "background-color",
        GREEN
      );
      await expect(startApp.reviewStepCircle).toHaveCSS(
        "background-color",
        BLUE
      );
    });

    // =========================================================
    // AC3 - Price summary is shown for each plan selection
    // =========================================================
    test("AC3 - Price summary displays correctly for both plans @sep16-3", async ({
      page,
    }) => {
      const { paymentPlan } = initPages(page);

      await goToStep2(page);

      // Upfront summary
      await paymentPlan.selectPaymentPlan("upfront");
      await expect(paymentPlan.basePriceAmountUnderUpfront).toBeVisible();
      await expect(
        paymentPlan.upfrontDiscountAmountUnderUpfront
      ).toBeVisible();
      await expect(paymentPlan.subtotalAmountUnderUpfront).toBeVisible();

      // Installments summary
      await paymentPlan.selectPaymentPlan("installments");
      await expect(
        paymentPlan.basePriceAmountUnderInstallments
      ).toBeVisible();
      await expect(
        paymentPlan.installmentsNumberUnderInstallments
      ).toBeVisible();
      await expect(
        paymentPlan.pricePerInstallmentsAmountUnderInstallments
      ).toBeVisible();
      await expect(
        paymentPlan.firstMonthPaymentAmountUnderInstallments
      ).toBeVisible();
    });

    // =========================================================
    // AC4 - Back button present and navigates back to Step 1
    // =========================================================
    test("AC4 - Back button works & returns to Step 1 @sep16-4", async ({
      page,
    }) => {
      const { startApp, paymentPlan } = initPages(page);

      await goToStep2(page);

      // Back button visible and enabled
      await expect(paymentPlan.backButton).toBeVisible();
      await expect(paymentPlan.backButton).toBeEnabled();

      // Click Back
      await paymentPlan.backButton.click();
      await microSettle(page);

      // Step 1 should now be blue (active)
      await expect(startApp.startApplicationStepCircle).toHaveCSS(
        "background-color",
        BLUE
      );

      // And Step 1 fields should be visible again
      await expect(startApp.firstNameInputBox).toBeVisible();
    });
  }
);