import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Deadline } from "@prisma/client";
import prisma from "@/config/prisma";
import { DeadlinesProvider } from '@/components/deadlines';
import "@/config/env/server";
import "@/config/env/client";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deadline O Matic',
  description: 'The upcoming deadlines',
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
  const deadlines: Deadline[] = await prisma.deadline.findMany();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-800 dark:text-white`}>
        <DeadlinesProvider deadlines={deadlines}>
          {children}
        </DeadlinesProvider>
        <Analytics />
      </body>
    </html>
  );
}
