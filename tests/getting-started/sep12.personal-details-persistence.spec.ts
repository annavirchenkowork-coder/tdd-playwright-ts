import { test, expect, initPages } from "../../utilities/sep-test-utilities";
import { generateTestUser } from "../../utilities/qa-data-reader";

test.describe(
  "SEP12 - Start Application - personal details persist when navigating back @sep12",
  () => {
    test("Personal details remain filled after going to Step 2 and back @sep12-1", async ({
      page,
    }) => {
      const { startApp, paymentPlan } = initPages(page);

      // Step 1: fill all personal details with a generated user
      const user = generateTestUser();

      await startApp.fillPersonalInformation({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        howDidYouHear: user.howDidYouHear,
      });

      // Go to Step 2
      await startApp.clickNextButton();

      await expect(paymentPlan.chooseAPaymentPlanText).toBeVisible();

      // Go back to Step 1
      await paymentPlan.backButton.click();

      // We should be back on Step 1
      await expect(startApp.firstNameInputBox).toBeVisible();

      // Verify values are still there
      await expect(startApp.firstNameInputBox).toHaveValue(user.firstName);
      await expect(startApp.lastNameInputBox).toHaveValue(user.lastName);
      await expect(startApp.emailInputBox).toHaveValue(user.email);
      await expect(startApp.phoneNumberInputBox).toHaveValue(user.phone);

    });
  }
);