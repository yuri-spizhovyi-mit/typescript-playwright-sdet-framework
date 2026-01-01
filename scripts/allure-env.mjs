import fs from "node:fs";
import path from "node:path";

const outDir = process.env.ALLURE_RESULTS_DIR || "allure-results";
fs.mkdirSync(outDir, { recursive: true });

// ---------- environment.properties ----------
const envLines = [
  `project=typescript-playwright-sdet-framework`,
  `node=${process.version}`,
  `os=${process.platform}`,
  `headless=${process.env.HEADLESS ?? ""}`,
  `baseUrl=${process.env.BASE_URL ?? ""}`,
  `apiBaseUrl=${process.env.API_BASE_URL ?? process.env.JSONPLACEHOLDER_URL ?? ""}`,
  `ci=${process.env.CI ? "true" : "false"}`,
].filter((l) => !l.endsWith("="));

fs.writeFileSync(path.join(outDir, "environment.properties"), envLines.join("\n"), "utf8");

// ---------- executor.json ----------
const executor = {
  name: process.env.GITHUB_ACTIONS ? "GitHub Actions" : "Local",
  type: process.env.GITHUB_ACTIONS ? "github" : "local",
  url: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
    : undefined,
  buildOrder: process.env.GITHUB_RUN_NUMBER ? Number(process.env.GITHUB_RUN_NUMBER) : undefined,
  buildName: process.env.GITHUB_RUN_ID ?? undefined,
  buildUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : undefined,
};

fs.writeFileSync(path.join(outDir, "executor.json"), JSON.stringify(executor, null, 2), "utf8");

console.log(`wrote ${outDir}/environment.properties and executor.json`);
