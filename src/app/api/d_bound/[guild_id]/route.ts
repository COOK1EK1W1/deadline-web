import { discordBound, getDeadlinesCache } from "@/util/getDate"
import { NextResponse } from "next/server"


export async function GET(request: Request, {params}: {params: {guild_id: string}}) {

  const code = await discordBound(params.guild_id)
  const deadlines = await getDeadlinesCache(code)
  return NextResponse.json(deadlines)
}
