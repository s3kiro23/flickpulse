import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Pseudo",
          type: "text",
          placeholder: "Votre Pseudo",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Votre mot de passe",
        },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) return null;

        const { csrfToken, username, password } = credentials;
        const bodyContent = new URLSearchParams({ username, password });

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

        if (response.ok) {
          const data = await response.json();
          const decodedToken = jwt.decode(data.access_token);
          return {
            id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email,
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    jwt: true, // Activer l'utilisation de JWT pour stocker la session
  },
  callbacks: {
    async jwt(token, user) {
      // Stocker l'ID de l'utilisateur dans le jeton JWT
      console.log("user:", user);
      console.log("token:", token);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      console.log("session:", session);
      console.log("token:", token.token);
      // Ajouter l'ID de l'utilisateur à la session
      session.user.id = token.token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
