import { z } from "zod";
import { ArchiveDocument } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Document } from "@prisma/client";

export type InputType = z.infer<typeof ArchiveDocument>;
export type ReturnType = ActionState<InputType, Document>;
