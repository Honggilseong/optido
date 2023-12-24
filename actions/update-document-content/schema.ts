import { z } from "zod";

export const UpdateDocumentContent = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content is required",
  }),
  documentId: z.string({
    required_error: "Document id is required",
    invalid_type_error: "Document id is required",
  }),
});
