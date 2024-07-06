import { Analytics } from '@vercel/analytics/react'
import "@/config/env/server";
import "@/config/env/client";
import Providers from '@/components/Providers';
import Modal from '@/components/modal/modal';
import Calendar from "@/components/calendar/calendar";
import prisma from "@/config/prisma";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';


export default async function Home({params}: {params: {slug: string}}) {
  console.log(params.slug)

  const deadlines: ProgrammeDeadlines = await prisma.programme.findFirst({
    where: {code: params.slug},
    include: {courses: {
      include: {deadlines: true}
    }}
  });

  return (
    <Providers deadlines={deadlines}>
      <Calendar />
      <Modal />
      <Analytics />
    </Providers>
  );
}
