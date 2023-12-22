import { z } from "zod";

export const ArchiveDocument = z.object({
  documentId: z.string({
    required_error: "Document id is required",
    invalid_type_error: "Document id is required",
  }),
});
