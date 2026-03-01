import { APIRequestContext, expect } from "@playwright/test";
import { CreateUserPayload } from "./CreateUserPayload";

export class ApiClient {
  constructor(private readonly req: APIRequestContext) {}

  async createUser(payload: CreateUserPayload) {
    const res = await this.req.post("/api/author/create_user", { data: payload });
    return await res.json();
  }
}