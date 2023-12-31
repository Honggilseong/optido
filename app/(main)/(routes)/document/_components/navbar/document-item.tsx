"use client";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { createDocument } from "@/actions/create-document";
import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { archiveDocument } from "@/actions/archive-document";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

type DocumentItemProps = {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  depth?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
};
const DocumentItem = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  depth = 0,
  expanded,
  onExpand,
  id,
}: DocumentItemProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { execute: createExecute } = useAction(createDocument, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("New document created!");
      onExpand?.();
      router.push(`/document/${data.id}`);
    },
    onError: (error) => {
      console.log(error);

      toast.error('"Failed to create a new document"');
    },
  });
  const { execute: archiveExecute } = useAction(archiveDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => console.log(error),
  });
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };
  const handleCreateDocument = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    toast.loading("Creating a new document");
    createExecute({
      title: "Untitled",
      parentDocument: id,
    });
  };
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    toast.loading("Moving to trash...");
    try {
      archiveExecute({ documentId: id });
      toast.success("Document moved to trash!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to archive document.");
    }
  };
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: depth ? `${depth * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 px-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex max-w-[75%]">
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
            onClick={handleExpand}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>
          {documentIcon ? (
            <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
          ) : (
            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
          )}
          <span className="truncate">{label}</span>
        </div>
        <div className="flex gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            className="h-full opacity-0 group-hover:opacity-100 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={handleCreateDocument}
          >
            <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;

DocumentItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 2 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4 bg-muted-foreground/20" />
      <Skeleton className="h-4 w-[40%] bg-muted-foreground/20" />
    </div>
  );
};
