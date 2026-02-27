import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_EMAIL = "masendra0303@gmail.com";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow the whitelisted email
      return user.email === ALLOWED_EMAIL;
    },
    async session({ session }) {
      return session;
    },
  },
});
