import type { Locator, Page } from "@playwright/test";

/**
 * Debug helper to print locator match count and sample contents.
 * Safe to call in CI (no throws).
 */
export async function debugLocator(
  page: Page,
  locator: Locator,
  label: string,
  options?: { maxSamples?: number }
): Promise<void> {
  const max = options?.maxSamples ?? 5;

  try {
    const count = await locator.count();

    console.log(`\n🔎 [Locator Debug] ${label}`);
    console.log(`   → Matched nodes: ${count}`);

    if (count === 0) {
      console.log("   → No elements matched");
      return;
    }

    const samples = Math.min(count, max);
    for (let i = 0; i < samples; i++) {
      const text = (await locator.nth(i).innerText()).trim();
      console.log(`   [${i}] "${text}"`);
    }

    if (count > samples) {
      console.log(`   … (${count - samples} more not shown)`);
    }
  } catch (err) {
    console.log(`⚠️ [Locator Debug Error] ${label}`, err);
  }
}
