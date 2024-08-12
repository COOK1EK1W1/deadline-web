// @ts-nocheck
"use server"

import prisma from "@/config/prisma";
import { ProgrammeDeadlines } from "@/types/programmeDeadline";
import { unstable_cache } from "next/cache";
import {parseISO } from "date-fns"

export async function getDeadlines(programme: string): Promise<ProgrammeDeadlines>{
  const deadlines: Promise<ProgrammeDeadlines> = prisma.programme.findFirst({
    where: {code: programme},
    select: {
      code: true,
      title: true,
      year: true,
      courses: {include: {deadlines: true}},
      password: false,
    }
  });

  return deadlines
}


export async function getDeadlinesCache(programme: string){

  const getDeadlinesCache = unstable_cache(async (programme) => getDeadlines(programme), [],{tags: ["deadline-cache"]})
  
  let deadlines = await getDeadlinesCache(programme)

  if (deadlines?.year){
    deadlines.year = parseISO(deadlines.year)
    deadlines.courses = deadlines.courses.map((x) => {
      x.deadlines.map((y) => {
        if (typeof y.start == "string"){
          y.start = parseISO(y.start)

        }
        if (typeof y.due == "string"){
          y.due = parseISO(y.due)
        }

        return y

      })
      return x

    })

  }
  return deadlines
}


