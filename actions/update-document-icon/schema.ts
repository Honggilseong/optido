import { z } from "zod";

export const UpdateDocumentIcon = z.object({
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon is required",
  }),
  documentId: z.string({
    required_error: "Document id is required",
    invalid_type_error: "Document id is required",
  }),
});
