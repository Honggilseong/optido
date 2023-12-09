"use client";

import { Button } from "@/components/ui/button";

import { SendHorizontal } from "lucide-react";

import Link from "next/link";

const Heading = () => {
  const auth = true;
  return (
    <div className="max-w-3xl space-y-4 mt-36">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to Optido organize your thoughts and documents here!
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Every idea has a home here. Start organizing with Optido!
      </h3>
      {auth ? (
        <Button asChild>
          <Link href="/dashboard">
            Enter Optido
            <SendHorizontal className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      ) : (
        <Button>
          Get Optido Free
          <SendHorizontal className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default Heading;
