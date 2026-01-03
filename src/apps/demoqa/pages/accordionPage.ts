import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class AccordionPage extends BaseDemoQAPage {
  private readonly pageHeader: Locator;

  private readonly sectionHeaders: Record<number, Locator>;
  private readonly sectionContents: Record<number, Locator>;

  constructor(page: Page) {
    super(page);

    // Page readiness
    this.pageHeader = page.locator("h1", { hasText: "Accordian" });

    // Match Python selectors exactly
    this.sectionHeaders = {
      1: page.locator("#section1Heading"),
      2: page.locator("#section2Heading"),
      3: page.locator("#section3Heading"),
    };

    this.sectionContents = {
      1: page.locator("#section1Content"),
      2: page.locator("#section2Content"),
      3: page.locator("#section3Content"),
    };
  }

  async openPage(): Promise<void> {
    await test.step("Open Accordion page", async () => {
      await this.open("accordian");
      await expect(this.pageHeader).toBeVisible();
      await expect(this.sectionHeaders[1]).toBeVisible();
    });
  }

  async openSection(section: 1 | 2 | 3): Promise<void> {
    await test.step(`Open accordion section ${section}`, async () => {
      await this.sectionHeaders[section].click();
    });
  }

  async isSectionOpen(section: 1 | 2 | 3): Promise<boolean> {
    return await test.step(`Check section ${section} visibility`, async () => {
      return await this.sectionContents[section].isVisible();
    });
  }
}
