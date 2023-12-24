"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteDocumentIcon } from "./schema";
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
        id: data.documentId,
      },
      data: {
        icon: null,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete",
    };
  }

  return { data: document };
};

export const deleteDocumentIcon = createSafeAction(DeleteDocumentIcon, handler);
