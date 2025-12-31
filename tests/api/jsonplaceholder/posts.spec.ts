import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import postSchema from "../../../src/api/jsonplaceholder/schemas/post.schema.json";
import { validateSchema } from "../../../src/core/api/schemaValidator";

test.describe("JSONPlaceholder API", () => {
  test("should fetch posts and validate schema", async ({ jsonPlaceholder }) => {
    const response = await jsonPlaceholder.getPosts();

    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();

    validateSchema(postSchema as unknown as object, posts[0], "post.schema.json");
  });
});
