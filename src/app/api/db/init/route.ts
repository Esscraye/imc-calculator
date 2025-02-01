import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Créer la table users avec un ID auto-généré
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL
      );
    `

    // Créer la table imc_records avec une référence à l'ID utilisateur
    await sql`
      CREATE TABLE IF NOT EXISTS imc_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        height FLOAT,
        weight FLOAT,
        imc FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error creating tables:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
