import type { APIRequestContext, APIResponse } from "@playwright/test";


export type ApiRequestOptions = {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  data?: unknown;
  form?: Record<string, string | number | boolean>;
  multipart?: Record<string, any>;
  timeout?: number;
  failOnStatusCode?: boolean;
};

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.get(url, options as any);
  }

  async post(url: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.post(url, options as any);
  }

  async put(url: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.put(url, options as any);
  }

  async patch(url: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.patch(url, options as any);
  }

  async delete(url: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(url, options as any);
  }

  async json<T>(res: APIResponse): Promise<T> {
    if (!res.ok()) {
      const body = await res.text().catch(() => "<no body>");
      throw new Error(`API ${res.status()} ${res.statusText()} - ${body}`);
    }
    return (await res.json()) as T;
  }
}
