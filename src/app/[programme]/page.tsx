import { Analytics } from '@vercel/analytics/react'
import "@/config/env/server";
import "@/config/env/client";
import Providers from '@/components/Providers';
import Calendar from "@/components/calendar/calendar";
import { getDeadlinesCache } from '@/util/getDate';
import { redirect } from 'next/navigation';
import Filters from '@/components/filters';
import DayModal from '@/components/modal/dayModal';
import CourseModal from '@/components/modal/courseModal';


export default async function Home({params}: {params: {programme: string}}) {

  const deadlines = await getDeadlinesCache(params.programme)
  if (deadlines == null){
    redirect("not-found")

  }

  return (
    <Providers deadlines={deadlines}>
      <Filters/>
      <Calendar />
      <DayModal />
      <CourseModal/>
      <Analytics />
    </Providers>
  );
}
