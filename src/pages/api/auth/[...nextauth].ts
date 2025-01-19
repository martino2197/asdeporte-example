import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Se recomienda tener un secret
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks, pages u otras opciones si deseas personalizar
  callbacks: {
    async session({ session, token }) {
      // Puedes adjuntar datos extra al session si lo necesitas.
      // Ejemplo: session.user.id = token.uid;
      return session;
    },
  },
};

export default NextAuth(authOptions);
