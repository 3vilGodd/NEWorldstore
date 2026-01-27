import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Only create PrismaClient if DATABASE_URL is set
let prismaInstance: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  try {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
  } catch (error) {
    console.warn("Prisma initialization failed:", error);
    prismaInstance = null;
  }
}

export const prisma = prismaInstance;
