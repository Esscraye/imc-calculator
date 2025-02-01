import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { sql } from "@vercel/postgres"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Créer l'utilisateur dans la base de données s'il n'existe pas déjà
      await sql`
        INSERT INTO users (id, name, email)
        VALUES (${user.id}, ${user.name}, ${user.email})
        ON CONFLICT (id) DO NOTHING;
      `
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

