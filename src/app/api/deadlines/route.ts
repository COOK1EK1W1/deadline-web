import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { revalidateTag } from "next/cache"

export const dynamic = 'force-dynamic'

export async function GET(request: Request){
  const deadlines = await sql`SELECT * FROM deadlines`
  console.log("query")
  return NextResponse.json(deadlines)
}

export async function POST(request: Request){
  try{
    if (!request.body){
      return NextResponse.json({error: "Invalid request"}, {status: 500})
    }
    const data: Deadline = await JSON.parse(await request.text())
    console.log(data)

    const res = await sql`INSERT INTO deadlines
    (name, subject, start, due, mark, room, url, info)
    VALUES(${data.name}, ${data.subject}, ${data.start}, ${data.due}, ${data.mark}, ${data.room}, ${data.url}, ${data.info}) returning name;`
    revalidateTag("deadlines");
    return NextResponse.json({error: "Invalid request"}, {status: 400})

  }catch(err){
    return NextResponse.json({error: "internal server error"}, {status: 500})
  }
  
}

export async function DELETE(request: Request){
  const data = await JSON.parse(await request.text())
  const res = await sql`DELETE FROM deadlines WHERE name = ${data.name} AND subject = ${data.subject}`
  revalidateTag("deadlines");
  console.log(data)
  return NextResponse.json({error: "Invalid request"}, {status: 400})
}