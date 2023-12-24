import { z } from "zod";
import { DeleteDocumentIcon } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Document } from "@prisma/client";

export type InputType = z.infer<typeof DeleteDocumentIcon>;
export type ReturnType = ActionState<InputType, Document>;
