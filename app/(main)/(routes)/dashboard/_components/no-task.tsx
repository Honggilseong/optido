"use client";
import { Button } from "@/components/ui/button";
import { useCreateModal } from "@/hooks/use-create-modal";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";

const NoTask = () => {
  const onOpen = useCreateModal((state) => state.onOpen);

  return (
    <div className="flex items-center flex-col justify-center w-full h-full">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <Image
          src="/documents.png"
          fill
          className="object-contain dark:hidden"
          alt="logo-image"
        />
        <Image
          src="/documents-dark.png"
          fill
          className="object-contain hidden dark:block"
          alt="logo-image"
        />
      </div>
      <h2 className="mb-5">There is no tasks here!</h2>

      <Button onClick={onOpen}>
        Create your Optido!
        <SendHorizontal className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default NoTask;
