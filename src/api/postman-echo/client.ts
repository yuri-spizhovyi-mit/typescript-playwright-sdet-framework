import { APIRequestContext } from '@playwright/test';
import { Config } from '../../core/config/env';

export class PostmanEchoClient {
  constructor(private readonly request: APIRequestContext) {}

  async postEcho(payload: Record<string, unknown>) {
    return await this.request.post(${Config.POSTMAN_ECHO_URL}/post, {
      data: payload,
    });
  }

  async getHeaders() {
    return await this.request.get(${Config.POSTMAN_ECHO_URL}/headers);
  }
}
