import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "passord",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password required");
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("Email does not exist");
				}

				const isCorrectPassword = await compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isCorrectPassword) {
					throw new Error("Incorrect password");
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: "/auth",
	},
	debug: process.env.NODE_ENV === "development",
	adapter: PrismaAdapter(prismadb),
	session: { strategy: "jwt" },
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ account, profile }) {
			if (profile) {
				if (
					account?.provider === "google" ||
					account?.provider === "github"
				) {
					let existingUser = await prismadb.user.findUnique({
						where: {
							email: profile.email,
						},
					});
					// Create user if non-existent
					if (!existingUser) {
						existingUser = await prismadb.user.create({
							data: {
								name: profile.name || "Anonymous",
								email: profile.email,
							},
						});
					}
					// Safely access account properties
					const providerAccountId = account?.providerAccountId;
					const accessToken = account?.access_token;
					const refreshToken = account?.refresh_token;
					const expiresAt = account?.expires_at;

					if (providerAccountId) {
						// Link the account to the user
						await prismadb.account.upsert({
							where: {
								provider_providerAccountId: {
									provider: account.provider,
									providerAccountId: providerAccountId,
								},
							},
							update: {
								access_token: accessToken,
								refresh_token: refreshToken,
								expires_at: expiresAt,
							},
							create: {
								userId: existingUser.id,
								type: account.type,
								provider: account.provider,
								providerAccountId: providerAccountId,
								access_token: accessToken,
								refresh_token: refreshToken,
								expires_at: expiresAt,
							},
						});
					}
				}
				return true;
			}
			return true;
		},
	},
};

export default NextAuth(authOptions);
