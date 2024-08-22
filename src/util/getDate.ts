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


export async function getBound(guild_id: string): Promise<{code: string}>{
  const deadlines: Promise<{code: string}> = prisma.programme.findFirst({
    where: {D_guild_id: guild_id},
    select: {
      code: true,
    }
  });
  return deadlines
}


export async function discordBound(guild_id: string){

  const getGuildCache = unstable_cache(async (guild_id) => getBound(guild_id), [],{tags: ["d-bound-cache"]})
  const id = await getGuildCache(guild_id)
  return id.code

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


