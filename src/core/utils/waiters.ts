import { expect } from "@playwright/test";

export async function waitForNumberAtLeast(
  getter: () => Promise<number>,
  target: number,
  timeoutMs = 20_000
): Promise<void> {
  await expect
    .poll(async () => await getter(), { timeout: timeoutMs })
    .toBeGreaterThanOrEqual(target);
}
