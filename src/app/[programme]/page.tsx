import { Analytics } from '@vercel/analytics/react'
import "@/config/env/server";
import "@/config/env/client";
import Providers from '@/components/Providers';
import Modal from '@/components/modal/modal';
import Calendar from "@/components/calendar/calendar";
import { getDeadlinesCache } from '@/util/getDate';
import { redirect } from 'next/navigation';
import Filters from '@/components/filters';


export default async function Home({params}: {params: {programme: string}}) {

  const deadlines = await getDeadlinesCache(params.programme)
  if (deadlines == null){
    redirect("not-found")

  }

  return (
    <Providers deadlines={deadlines}>
      <h2 className="text-xl pb-1">{deadlines.title}</h2>
      <Filters/>
      <Calendar />
      <Modal />
      <Analytics />
    </Providers>
  );
}
