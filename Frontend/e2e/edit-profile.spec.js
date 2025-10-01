// Frontend/e2e/edit-profile.spec.js
//const { test, expect } = require("@playwright/test");
import { test, expect } from "@playwright/test";

test("Edit Profile saves GPA and Credits", async ({ page }) => {
  await page.goto("http://localhost:5713/main/home");

  // enter edit mode (prefer a data-testid you control)
  const editBtn = page.getByTestId("profile-edit");
  await editBtn.click();

  // fill fields
  await page.getByRole("textbox", { name: /firstname/i }).fill("Alice");

  // GPA & Credits may be number/text inputs — handle either
  const gpa = page
    .getByRole("spinbutton", { name: /gpa/i })
    .or(page.getByRole("textbox", { name: /gpa/i }));
  await gpa.fill("6.2");

  const credits = page
    .getByRole("spinbutton", { name: /credits/i })
    .or(page.getByRole("textbox", { name: /credits/i }));
  await credits.fill("130");

  // save
  await page.getByRole("button", { name: /save/i }).click();

  // assert visible updated values
  await expect(page.getByText(/GPA:\s*6\.2/i)).toBeVisible();
  await expect(page.getByText(/Credits:\s*130/i)).toBeVisible();
});
