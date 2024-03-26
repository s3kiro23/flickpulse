import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Pseudo", type: "text", placeholder: "Votre Pseudo" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Votre mot de passe",
        },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) return null;

        const csrfToken = credentials.csrfToken;

        let bodyContent = `username=${credentials?.username}&password=${credentials?.password}`;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/access-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-XSRF-Token": csrfToken,
            },
            body: bodyContent,
          },
        );

        const user = await response.json();

        return user || null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
