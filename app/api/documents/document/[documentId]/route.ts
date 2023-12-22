import type { NextApiRequest } from "next";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await db.document.findUnique({
      where: {
        userId: session.user.id,
        id: params.documentId,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
