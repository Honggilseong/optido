import { z } from "zod";

export const UndoDocument = z.object({
  documentId: z.string({
    required_error: "Document id is required",
    invalid_type_error: "Document id is required",
  }),
});
