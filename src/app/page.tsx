
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import HeaderCarousel from "./_components/headerCarousel";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Dashboard from "./_components/dashboard";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="">
        <Dashboard/>
      </main>
    </HydrateClient>
  );
}

