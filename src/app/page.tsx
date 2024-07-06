import prisma from "@/config/prisma";
import { Programme } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const programmes: Programme[] = await prisma.programme.findMany();

  return (
    <div className="md:w-[400px] bg-slate-600 w-3/4 rounded-xl p-4">
      {programmes.map((programme, idx) => (
        <Link href={programme.code} key={idx}>
          <div className="p-1 m-1 border-2 border-slate-800 rounded">
            <h2>{programme.title}</h2>
          </div>
        </Link>

      ))}

    </div>
  );
}
