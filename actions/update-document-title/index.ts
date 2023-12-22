"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateDocumentTitle } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  let document;

  try {
    document = await db.document.update({
      where: {
        userId: session?.user.id!,
        id: data.documentId,
      },
      data: {
        title: data.title || "Untitled",
      },
    });
  } catch (error) {
    return {
      error: "Failed to update document",
    };
  }
  return { data: document };
};

export const updateDocumentTitle = createSafeAction(
  UpdateDocumentTitle,
  handler
);
