"use client";

import { updateDocumentTitle } from "@/actions/update-document-title";

import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { File, MoreHorizontal, Trash } from "lucide-react";

import { debounce } from "lodash";
import { useAction } from "@/hooks/use-action";
import { Document } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { updateDocumentIcon } from "@/actions/update-document-icon";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteDocument } from "@/actions/delete-document";
import ConfirmModal from "@/components/confirm-modal";

type TitleProps = {
  data?: Document;
};

const Title = ({ data }: TitleProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, setTitle] = useState(data?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const [isIconOpened, setIsIconOpened] = useState(false);

  const { execute: deleteExecute } = useAction(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      router.push("/document");
    },
  });

  const { execute: updateTitle } = useAction(updateDocumentTitle, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["document", params.documentId],
        (oldData: Document) => ({ ...oldData, title: data.title })
      );
      queryClient.setQueryData(
        ["documents", data.parentDocument ? data.parentDocument : "root"],
        (oldData: Document[]) =>
          oldData.map((document) =>
            document.id === data.id
              ? { ...document, title: data.title }
              : document
          )
      );
    },
  });
  const { execute: updateIcon } = useAction(updateDocumentIcon, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["documents", data.parentDocument ? data.parentDocument : "root"],
        (oldData: Document[]) =>
          oldData.map((document) =>
            document.id === data.id
              ? { ...document, icon: data.icon }
              : document
          )
      );
      queryClient.setQueryData(["document", params.documentId], data);
    },
  });
  const enableInput = () => {
    setIsEditing(true);
  };
  const disableInput = () => {
    setIsEditing(false);
  };
  const debouncedUpdateTitle = useCallback(
    debounce((newTitle: string) => {
      updateTitle({ title: newTitle, documentId: params.documentId as string });
    }, 200),
    [params.documentId]
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    debouncedUpdateTitle(newTitle);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") disableInput();
  };

  const onChangeIcon = (icon: string) => {
    const pickedIcon = icon.toString();
    updateIcon({ documentId: params.documentId as string, icon: pickedIcon });
    setIsIconOpened(false);
  };

  const onDeleteConfirm = () => {
    deleteExecute({ documentId: params.documentId as string });
  };

  useEffect(() => {
    setTitle(data?.title || "Untitled");
  }, [data]);

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex items-center">
        <div className="h-6 w-6">
          {data?.icon ? (
            <span className="text-[18px]">{data.icon}</span>
          ) : (
            <File className="h-6 w-6" />
          )}
        </div>
        <Popover open={isEditing} onOpenChange={(state) => setIsEditing(state)}>
          <PopoverTrigger asChild>
            <Button
              onClick={enableInput}
              variant="ghost"
              size="sm"
              className="rounded-md hover:bg-primary/10 hover:dark:bg-accent"
            >
              <span className="truncate">{title}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2">
            <div className="flex items-center gap-x-2">
              <IconPicker
                asChild
                isOpen={isIconOpened}
                onChange={onChangeIcon}
                onOpenChange={(state) => setIsIconOpened(state)}
              >
                <Button
                  variant="ghost"
                  className="border p-1 rounded-md text-[18px]"
                  onClick={() => setIsIconOpened(true)}
                >
                  {data?.icon ? data.icon : <File className="h-6 w-6" />}
                </Button>
              </IconPicker>
              <Input
                value={title}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="h-9 px-2 focus-visible:ring-transparent flex-1"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Popover>
        <PopoverTrigger className="hover:dark:bg-accent p-1 rounded-md hover:bg-primary/10">
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent className="max-w-[200px] p-1">
          <ConfirmModal onConfirm={onDeleteConfirm}>
            <div
              className="flex items-center hover:dark:bg-accent hover:bg-primary/10 px-2 py-1 cursor-pointer rounded-md"
              role="button"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </div>
          </ConfirmModal>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return (
    <div className="w-full h-full flex items-center">
      <Skeleton className="w-[30px] h-[30px] bg-muted-foreground/20 mr-3" />
      <Skeleton className="w-[30%] h-[30px] bg-muted-foreground/20" />
    </div>
  );
};
