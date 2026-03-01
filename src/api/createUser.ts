import { z } from "zod";

/**
 * Request payload schema for POST /api/author/create_user
 * NOTE: exact fields can vary by school setup; keep it strict where you know, permissive where you don't.
 */
export const CreateUserRequestSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(6),

  // optional fields (add/remove based on what your backend accepts)
  role: z.string().optional(),          // e.g. "learner"
  username: z.string().optional(),
  send_welcome_email: z.boolean().optional(),
}).strict();

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

/**
 * Response schema: keep flexible if you don't know exact shape yet.
 * Many systems return { success: true, user: {...}} or { user: {...}}.
 */
export const CreateUserResponseSchema = z.object({
  success: z.boolean().optional(),
  user: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
      email: z.string().email().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
    })
    .passthrough()
    .optional(),
}).passthrough();

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;