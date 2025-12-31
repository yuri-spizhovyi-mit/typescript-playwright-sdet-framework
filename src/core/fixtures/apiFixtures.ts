import { test as base } from "@playwright/test";
import { JsonPlaceholderClient } from "../../api/jsonplaceholder/client";
import { PostmanEchoClient } from "../../api/postman-echo/client";

type ApiFixtures = {
  jsonPlaceholder: JsonPlaceholderClient;
  postmanEcho: PostmanEchoClient;
};

export const test = base.extend<ApiFixtures>({
  jsonPlaceholder: async ({ request }, use) => {
    await use(new JsonPlaceholderClient(request));
  },
  postmanEcho: async ({ request }, use) => {
    await use(new PostmanEchoClient(request));
  },
});

export { expect } from "@playwright/test";
