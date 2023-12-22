import { z } from "zod";
import { UpdateDocumentIcon } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Document } from "@prisma/client";

export type InputType = z.infer<typeof UpdateDocumentIcon>;
export type ReturnType = ActionState<InputType, Document>;
