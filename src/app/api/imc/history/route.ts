import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    // Récupérer l'historique des IMC pour l'utilisateur connecté
    const { rows } = await sql`
      SELECT r.height, r.weight, r.imc, r.created_at
      FROM imc_records r
      JOIN users u ON r.user_id = u.id
      WHERE u.email = ${session.user?.email}
      ORDER BY r.created_at DESC
    `

    return NextResponse.json(rows, { status: 200 })
  } catch (error) {
    console.error("Error fetching history:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

