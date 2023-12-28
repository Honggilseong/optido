"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";

import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import Link from "next/link";

const Heading = () => {
  const { status } = useSession();
  const onOpen = useAuthModal((state) => state.onOpen);

  return (
    <div className="max-w-3xl space-y-4 mt-36">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to Optido organize your thoughts and documents here!
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Every idea has a home here. Start organizing with Optido!
      </h3>
      {status === "loading" ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : status === "authenticated" ? (
        <Button asChild>
          <Link href="/dashboard">
            Enter Optido
            <SendHorizontal className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      ) : (
        <Button asChild onClick={onOpen}>
          <Link href="/login" className="flex items-center">
            Get Optido Free
            <SendHorizontal className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Heading;
