import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export const dynamic = 'force-dynamic'

export async function GET(request: Request){
  const deadlines = await sql`SELECT * FROM deadlines`
  console.log("query")
  return NextResponse.json(deadlines)
}

export async function POST(request: Request){
  if (!request.body){
    return NextResponse.json({error: "Invalid request"}, {status: 500})
  }
  const data: Deadline = await JSON.parse(await request.text())
  console.log(data)
  const res = await sql`INSERT INTO deadlines
  (name, subject, start, due, mark, room, url, info)
  VALUES(${data.name}, ${data.subject}, ${data.start}, ${data.due}, ${data.mark}, ${data.room}, ${data.url}, ${data.info}) returning name;`
  return NextResponse.json({error: "Invalid request"}, {status: 500})
}