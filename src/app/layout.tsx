import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "@/config/env/server";
import "@/config/env/client";
import TopBar from '@/components/topBar/TopBar';
import ThemeProviders from '@/components/topBar/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deadline O Matic',
  description: 'The upcoming deadlines',
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <ThemeProviders>
      <body className={`${inter.className} bg-white dark:bg-slate-800 dark:text-white`}>
      <TopBar />
        <main className="flex flex-col items-center">
          <h1 className="pt-2 pb-6 text-4xl dark:text-white">Deadline o matic</h1>
          {children}
        </main>
      </body>
        </ThemeProviders>
    </html>
  );
}
