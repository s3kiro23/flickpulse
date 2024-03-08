import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "FlickPulse",
      credentials: {
        email: { label: "Pseudo", type: "text", placeholder: "Votre Pseudo" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Votre mot de passe",
        },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        return user || null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
