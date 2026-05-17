import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensure-user";
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

    const user = await ensureUser(session);
    if (!user) {
      return NextResponse.json({ error: "Unable to resolve user" }, { status: 500 });
    }

    const json = await req.json();
    const { productId } = addItemSchema.parse(json);

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id },
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
    let productId = searchParams.get("productId");

    if (!productId) {
      try {
        const json = await req.json();
        productId = json?.productId ?? null;
      } catch {
        // no body
      }
    }

    if (itemId) {
      await prisma.wishlistItem.delete({ where: { id: itemId } });
    } else if (productId) {
      const wishlist = await prisma.wishlist.findUnique({
        where: { userId: session.user.id },
      });
      if (wishlist) {
        await prisma.wishlistItem.deleteMany({
          where: { wishlistId: wishlist.id, productId },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist DELETE error", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 400 });
  }
}
