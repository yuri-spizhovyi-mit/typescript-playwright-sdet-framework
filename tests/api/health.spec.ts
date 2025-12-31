import { test, expect } from "../../src/core/fixtures/apiFixtures";
import { Logger } from "../../src/core/utils/logger";

const log = new Logger({ scope: "api:health" });

test("API project runs (smoke)", async ({ jsonPlaceholder }) => {
  log.info("Calling GET /posts");
  const res = await jsonPlaceholder.getPosts();
  log.info("Response received", { status: res.status() });

  expect(res.status()).toBe(200);
});
