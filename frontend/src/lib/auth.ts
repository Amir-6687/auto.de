import type { NextAuthOptions } from "next-auth";
import type { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";

async function syncGoogleUser(profile: {
  email?: string | null;
  name?: string | null;
  picture?: string | null;
  sub?: string;
}) {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!profile.email || !secret) {
    return { id: "", role: "user" as string };
  }
  const res = await fetch(`${BACKEND}/api/internal/sync-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": secret,
    },
    body: JSON.stringify({
      email: profile.email,
      name: profile.name,
      image: profile.picture,
      googleId: profile.sub,
    }),
  });
  if (!res.ok) {
    console.error("sync-user failed", await res.text());
    return { id: "", role: "user" };
  }
  const data = (await res.json()) as { id: string; role: string };
  return { id: data.id, role: data.role };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (credentials?.password === "admin123") {
          return {
            id: "legacy-admin",
            email: "amirhossein.akbari.de@gmail.com",
            name: "Admin",
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials" && user) {
        token.role = "admin";
        token.uid = "legacy-admin";
        return token;
      }
      if (account?.provider === "google" && profile && "email" in profile) {
        const p = profile as {
          email?: string;
          name?: string;
          picture?: string;
          sub?: string;
        };
        const synced = await syncGoogleUser(p);
        token.role = synced.role;
        token.uid = synced.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.uid as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/admin`;
    },
  },
};
