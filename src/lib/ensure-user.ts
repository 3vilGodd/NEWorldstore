import type { Session } from "next-auth";
import { prisma } from "./prisma";

export async function ensureUser(session: Session | null) {
  if (!prisma || !session?.user?.id) return null;

  const email = session.user.email ?? `${session.user.id}@neworld.local`;

  return prisma.user.upsert({
    where: { id: session.user.id },
    update: {
      email,
      name: session.user.name ?? undefined,
      image: session.user.image ?? undefined,
    },
    create: {
      id: session.user.id,
      email,
      name: session.user.name ?? "Guest",
      image: session.user.image ?? undefined,
    },
  });
}
