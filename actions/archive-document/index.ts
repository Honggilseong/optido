"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { ArchiveDocument } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type DeleteReturnType = Omit<ReturnType, "data"> & { data?: boolean };

async function collectChildDocumentIds(documentId: string, userId: string) {
  const idsToArchive = [documentId];
  let documentsToCheck = [documentId];

  while (documentsToCheck.length) {
    const documents = await db.document.findMany({
      where: {
        parentDocument: { in: documentsToCheck },
        userId: userId,
      },
      select: { id: true },
    });

    const childIds = documents.map((doc) => doc.id);
    idsToArchive.push(...childIds);
    documentsToCheck = childIds;
  }

  return idsToArchive;
}

const handler = async (data: InputType): Promise<DeleteReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const childIds = await collectChildDocumentIds(
      data.documentId,
      session.user.id
    );
    await db.$transaction(async (prisma) => {
      await prisma.document.updateMany({
        where: {
          id: { in: childIds },
          userId: session.user.id,
        },
        data: {
          isArchived: true,
        },
      });
    });

    return { data: true };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to archive",
    };
  }
};

export const archiveDocument = createSafeAction(ArchiveDocument, handler);
