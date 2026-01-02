import { test, expect } from "../../../src/core/fixtures/test";
import { TextBoxPage } from "../../../src/apps/demoqa/pages/textBoxPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Text Box", () => {
  test("should submit text box form and show output @smoke", async ({
    page,
  }) => {
    const textBox = new TextBoxPage(page);

    const fullName = DataGenerator.firstName();
    const email = DataGenerator.email();
    const currentAddress = DataGenerator.address();
    const permanentAddress = DataGenerator.address();

    await textBox.openPage();

    await textBox.fillForm({
      fullName,
      email,
      currentAddress,
      permanentAddress,
    });

    await textBox.submit();

    const out = await textBox.getOutput();

    expect(out.name).toContain(fullName);
    expect(out.email.toLowerCase()).toContain(email.toLowerCase());
    expect(out.currentAddress).toContain(currentAddress.split(" ")[0]);
    expect(out.permanentAddress).toContain(permanentAddress.split(" ")[0]);
  });
});
