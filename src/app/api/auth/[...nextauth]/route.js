import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("No user found with the given email");
          }

          if (user && user.password) {
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
              throw new Error("Invalid password");
            }
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const email = profile.email;
        const googleId = profile.sub; // Google user ID
        const username = profile.name;
        const image = profile.picture;

        // Find existing user by email
        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // If user exists, ensure googleId matches
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { email },
              data: { googleId },
            });
          }
        } else {
          // If no user exists, create new user with Google profile data
          await prisma.user.create({
            data: {
              email,
              name: username,
              googleId,
              image,
              emailVerified: true, // Automatically verify email from Google
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.image;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;
