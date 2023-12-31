"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { createDocument } from "@/actions/create-document";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { execute: createExecute } = useAction(createDocument, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("New document created!");
      router.push(`/document/${data.id}`);
    },
    onError: (error) => {
      console.log(error);

      toast.error('"Failed to create a new document"');
    },
  });

  const onCreateDocument = () => {
    createExecute({ title: "Untitled" });
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[400px] h-[400px]">
          <Image
            src="/document.png"
            fill
            className="object-contain dark:hidden"
            alt="document-image"
          />
          <Image
            src="/document-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="document-dark-image"
          />
        </div>
        <Button
          variant="ghost"
          className="dark:bg-muted-foreground/30 max-w-[80%] dark:hover:bg-primary-foreground"
          onClick={onCreateDocument}
        >
          Create new documents
          <SendHorizontal className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentPage;
