"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateDocument } from "./schema";
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
    document = await db.document.create({
      data: {
        title: data.title || "",
        userId: session?.user.id!,
        parentDocument: data.parentDocument || null,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }
  return { data: document };
};

export const createDocument = createSafeAction(CreateDocument, handler);
