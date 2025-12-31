import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import headersSchema from "../../../src/api/postman-echo/schemas/headers.schema.json";
import { validateSchema } from "../../../src/core/api/schemaValidator";

test.describe("Postman Echo API", () => {
  test("GET /headers returns expected structure", async ({ postmanEcho }) => {
    const res = await postmanEcho.getHeaders();
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    validateSchema(headersSchema as unknown as object, body, "headers.schema.json");

    expect(body.headers).toBeTruthy();
  });
});
