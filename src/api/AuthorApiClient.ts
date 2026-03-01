import { APIRequestContext, expect } from "@playwright/test";
import {
  CreateUserRequest,
  CreateUserRequestSchema,
  CreateUserResponse,
  CreateUserResponseSchema,
} from "./createUser";

export class AuthorApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
    // validate payload before sending
    CreateUserRequestSchema.parse(payload);

    const res = await this.request.post("/api/author/create_user", {
      data: payload,
    });

    // “Expect that request handled successfully”
    expect(res.ok(), await res.text()).toBeTruthy();

    const json = await res.json();
    return CreateUserResponseSchema.parse(json);
  }
}