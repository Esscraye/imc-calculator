import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    // Récupérer l'historique des IMC pour l'utilisateur connecté
    const { rows } = await sql`
      SELECT r.height, r.weight, r.imc, r.created_at
      FROM imc_records r
      JOIN users u ON r.user_id = u.id
      WHERE u.email = ${session.user.email}
      ORDER BY r.created_at DESC
    `

    return NextResponse.json(rows, { status: 200 })
  } catch (error) {
    console.error("Error fetching history:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

