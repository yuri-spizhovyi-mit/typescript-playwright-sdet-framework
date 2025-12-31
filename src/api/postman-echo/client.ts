import type { APIRequestContext, APIResponse } from "@playwright/test";
import { Config } from "../../core/config/env";

export class PostmanEchoClient {
  constructor(private readonly request: APIRequestContext) {}

  async postEcho(payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(`${Config.POSTMAN_ECHO_URL}/post`, {
      data: payload,
    });
  }

  async getHeaders(): Promise<APIResponse> {
    return this.request.get(`${Config.POSTMAN_ECHO_URL}/headers`);
  }
}
