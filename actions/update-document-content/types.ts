import { z } from "zod";
import { UpdateDocumentContent } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Document } from "@prisma/client";

export type InputType = z.infer<typeof UpdateDocumentContent>;
export type ReturnType = ActionState<InputType, Document>;
