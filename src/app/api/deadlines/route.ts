import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { revalidatePath, revalidateTag } from "next/cache"

export const dynamic = 'force-dynamic'

export async function GET(request: Request){
  try{
    const deadlines = await sql`SELECT * FROM deadlines`
    console.log("query")
    return NextResponse.json(deadlines)
  }catch(error){
    return NextResponse.json({error: error, status: 500});
  }
  
}

export async function POST(request: Request){
  try{
    if (!request.body){
      return NextResponse.json({error: "Invalid request"}, {status: 500})
    }
    let data: Deadline = await JSON.parse(await request.text())
    console.log(data)

    const res = await sql`INSERT INTO deadlines
    (name, subject, start, due, mark, room, url, info)
    VALUES(${data.name}, ${data.subject}, ${data.start || null}, ${data.due || null}, ${data.mark}, ${data.room}, ${data.url}, ${data.info}) returning name;`
    console.log("query")
    revalidatePath("/")
    revalidateTag("deadlines");
    return NextResponse.json({status: 200})

  }catch(err){
    return NextResponse.json({error: err}, {status: 500})
  }
  
}

export async function DELETE(request: Request){
  try{
    const data = await JSON.parse(await request.text())
    console.log("query")
    const res = await sql`DELETE FROM deadlines WHERE name = ${data.name} AND subject = ${data.subject}`
    revalidateTag("deadlines");
    console.log(data)
    return NextResponse.json({status: 200})

  }catch(err){
    return NextResponse.json({error: err}, {status: 500})

  }
}

export async function PUT(request: Request){
  try{
    const data = await JSON.parse(await request.text())
    const name = data.oldName
    const subject = data.oldSubject

    console.log("query")
    const res = await sql`UPDATE deadlines SET name = ${data.name}, subject = ${data.subject}, start=${data.start||null}, due=${data.due||null}, mark=${data.mark}, room=${data.room}, url=${data.url}, info=${data.info} WHERE name = ${name} AND subject = ${subject}`
    revalidateTag("deadlines");
    console.log(data)
    return NextResponse.json({status: 200})

  }catch(err){
    return NextResponse.json({error: err}, {status: 500})

  }
}