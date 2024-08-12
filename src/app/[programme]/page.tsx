import { Analytics } from '@vercel/analytics/react'
import "@/config/env/server";
import "@/config/env/client";
import Providers from '@/components/Providers';
import Modal from '@/components/modal/modal';
import Calendar from "@/components/calendar/calendar";
import prisma from "@/config/prisma";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';
import { getDeadlines, getDeadlinesCache } from '@/util/getDate';
import { extractDeadlines } from '@/components/deadlines/deadlines.util';


export default async function Home({params}: {params: {programme: string}}) {

  const deadlines = await getDeadlinesCache(params.programme)

  console.log(deadlines)
  console.log(extractDeadlines(deadlines))
  return (
    <Providers deadlines={deadlines}>
      <Calendar />
      <Modal />
      <Analytics />
    </Providers>
  );
}
