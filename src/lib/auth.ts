import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";

// Only use Prisma adapter if database URL is available and Prisma is initialized
const usePrismaAdapter = !!process.env.DATABASE_URL && !!prisma;

const providers = [];

// Add Google provider if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Add Email provider if configured
if (process.env.EMAIL_SERVER) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM ?? "login@neworld.store",
    })
  );
}

// Add a fallback credentials provider for development
if (providers.length === 0) {
  providers.push(
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize() {
        // Demo mode - return a mock user
        return {
          id: "demo-user",
          email: "demo@neworld.store",
          name: "Demo User",
        };
      },
    })
  );
}

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (!nextAuthSecret && process.env.NODE_ENV === "production") {
  throw new Error("NEXTAUTH_SECRET environment variable is required in production");
}

export const authOptions: NextAuthOptions = {
  ...(usePrismaAdapter && prisma && { adapter: PrismaAdapter(prisma) }),
  session: usePrismaAdapter ? { strategy: "database" } : { strategy: "jwt" },
  secret: nextAuthSecret || (process.env.NODE_ENV === "development" ? "development-secret-only" : undefined),
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (usePrismaAdapter && user) {
        if (session.user) session.user.id = user.id;
      } else if (token) {
        if (session.user) session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
