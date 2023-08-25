import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export const dynamic = 'force-dynamic'

export async function GET(request: Request){
  const deadlines = await sql`SELECT * FROM deadlines`
  return NextResponse.json(deadlines)
}