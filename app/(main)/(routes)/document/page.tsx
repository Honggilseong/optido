import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

const DocumentPage = () => {
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
        >
          Create new documents
          <SendHorizontal className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentPage;
