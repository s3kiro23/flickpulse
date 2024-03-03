import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "FlickPulse",
      credentials: {
        pseudo: { label: "Pseudo", type: "text", placeholder: "Votre pseudo" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Votre mot de passe",
        },
      },
      async authorize(credentials, request) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            pseudo: credentials?.pseudo,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.pseudo = user.pseudo;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
