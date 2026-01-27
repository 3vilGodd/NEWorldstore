import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const addItemSchema = z.object({
  productId: z.string(),
});

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ items: [] });
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ items: wishlist?.items ?? [] });
  } catch (error) {
    console.error("Wishlist GET error", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const { productId } = addItemSchema.parse(json);

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: session.user.id },
      });
    }

    const existing = await prisma.wishlistItem.findFirst({
      where: { wishlistId: wishlist.id, productId },
    });

    if (existing) {
      return NextResponse.json({ message: "Already in wishlist" });
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    const updated = await prisma.wishlist.findUnique({
      where: { id: wishlist.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ items: updated?.items ?? [] });
  } catch (error) {
    console.error("Wishlist POST error", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (itemId) {
      await prisma.wishlistItem.delete({ where: { id: itemId } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist DELETE error", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 400 });
  }
}
