import { getDeadlinesCache } from "@/util/getDate";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {programme: string}}) {

  const deadlines = await getDeadlinesCache(params.programme)
  return NextResponse.json(deadlines)
}
