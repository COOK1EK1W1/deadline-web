import { Analytics } from '@vercel/analytics/react'
import "@/config/env/server";
import "@/config/env/client";
import Providers from '@/components/Providers';
import Modal from '@/components/modal/modal';
import Calendar from "@/components/calendar/calendar";
import prisma from "@/config/prisma";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';


export default async function Home({params}: {params: {programme: string}}) {

  const deadlines: ProgrammeDeadlines = await prisma.programme.findFirst({
    where: {code: params.programme},
    select: {
      code: true,
      title: true,
      year: true,
      courses: {include: {deadlines: true}},
      password: false,
    }
  });


  return (
    <Providers deadlines={deadlines}>
      <Calendar />
      <Modal />
      <Analytics />
    </Providers>
  );
}
