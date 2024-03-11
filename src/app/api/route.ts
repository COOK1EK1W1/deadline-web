import prisma from "@/config/prisma";
import { Deadline } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const deadlines: Deadline[] = await prisma.deadline.findMany();
  return NextResponse.json(deadlines)
}
