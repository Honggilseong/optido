import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DocumentTrash from "./document-trash";
import { Trash } from "lucide-react";

type TrashItemProps = {
  isMobile: boolean;
};

const TrashItem = ({ isMobile }: TrashItemProps) => {
  return (
    <Popover>
      <div className="flex items-end">
        <PopoverTrigger className="w-full hover:bg-primary/20">
          <div className="flex items-center px-4 py-2">
            <Trash className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Trash</span>
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
        <DocumentTrash />
      </PopoverContent>
    </Popover>
  );
};

export default TrashItem;
