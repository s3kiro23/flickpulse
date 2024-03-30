import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/access-token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"X-XSRF-Token": csrfToken,
					},
					body: bodyContent,
				});

				const { access_token } = await response.json();
				console.log("access_token:", access_token);

				// Retournez le token d'accès ici
				return { accessToken: access_token };
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
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // Expire après 24 heures
	},
	callbacks: {
		async jwt(token, user) {
			if (user) {
				token.accessToken = user.accessToken;
			}
      console.log("token:", token);
			return token;
		},
		async session(session, token) {
			// Ajoutez le token d'accès à la session
			if (token) {
				// Ajoutez le token d'accès à la session
				session.accessToken = token.accessToken;
			}
			console.log("session:", session);

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
