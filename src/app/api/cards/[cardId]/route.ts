import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } | any }
) {
  try {
    const { userId, orgId } = await auth();
    const { cardId } = await params;

    if (!cardId) return new NextResponse("Unauthorized", { status: 401 });

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: { board: { orgId } },
      },

      include: {
        list: {
          select: { title: true },
        },
      },
    });

    if (!card) return new NextResponse("Card not found", { status: 404 });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
