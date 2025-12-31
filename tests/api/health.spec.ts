import { test, expect } from "../../src/core/fixtures/apiFixtures";

test("API project runs (smoke)", async ({ jsonPlaceholder }) => {
  const res = await jsonPlaceholder.getPosts();
  expect(res.status()).toBe(200);
});
