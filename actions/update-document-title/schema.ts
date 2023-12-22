import { z } from "zod";

export const UpdateDocumentTitle = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
  documentId: z.string({
    required_error: "Document id is required",
    invalid_type_error: "Document id is required",
  }),
});
