import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    // D'abord, récupérer l'ID de l'utilisateur à partir de son email
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email}
    `

    if (userResult.rows.length === 0) {
      // Si l'utilisateur n'existe pas, le créer
      const newUserResult = await sql`
        INSERT INTO users (email, name)
        VALUES (${session.user.email}, ${session.user.name})
        RETURNING id
      `
      userResult.rows = newUserResult.rows
    }

    const userId = userResult.rows[0].id
    const { height, weight, imc } = await request.json()

    // Maintenant, sauvegarder l'IMC avec l'ID utilisateur
    await sql`
      INSERT INTO imc_records (user_id, height, weight, imc)
      VALUES (${userId}, ${height}, ${weight}, ${imc})
    `

    return NextResponse.json({ message: "IMC saved successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error saving IMC:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

