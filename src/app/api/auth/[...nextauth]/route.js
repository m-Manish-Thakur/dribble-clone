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
        const name = profile.name;
        const image = profile.picture;

        const username = email.split("@")[0];

        // Find existing user by email
        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // If user exists, ensure googleId matches
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { email },
              data: { googleId, emailVerified: true },
            });
          }
        } else {
          // If no user exists, create a new user with Google profile data
          existingUser = await prisma.user.create({
            data: {
              email,
              name,
              username,
              googleId,
              image,
              emailVerified: true, // Automatically verify email from Google
            },
          });
        }

        // Return the user for the jwt callback
        user.id = existingUser?.id;
        user.image = existingUser?.image;
        user.name = existingUser?.name;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // Ensure token contains Prisma user ID
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;
