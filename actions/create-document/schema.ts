import { z } from "zod";

export const CreateDocument = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, { message: "Title is Too short" }),
  parentDocument: z.optional(z.string()),
});
