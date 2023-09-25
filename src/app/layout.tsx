import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Deadline } from "@prisma/client";
import prisma from "@/config/prisma";
import { DeadlinesProvider } from '@/components/deadlines';
import "@/config/env/server";
import "@/config/env/client";
import { cookies } from "next/headers"
import  TopBar  from '@/components/topBar/TopBar'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deadline O Matic',
  description: 'The upcoming deadlines',
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
  const deadlines: Deadline[] = await prisma.deadline.findMany();

  const cookieStore = cookies()
  const dark = cookieStore.get("darkMode")

  return (
    <html lang="en" className={`${dark?.value}`}>
      <body className={`${inter.className} bg-white dark:bg-slate-800 dark:text-white`}>
        <TopBar/>
        <DeadlinesProvider deadlines={deadlines}>
          {children}
        </DeadlinesProvider>
        <Analytics />
      </body>
    </html>
  );
}
