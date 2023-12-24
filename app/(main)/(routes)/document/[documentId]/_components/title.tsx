"use client";
import { updateDocumentIcon } from "@/actions/update-document-icon";
import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

import { X } from "lucide-react";

import React, { useCallback, useEffect, useState } from "react";
import Toolbar from "./toolbar";
import { deleteDocumentIcon } from "@/actions/delete-document-icon";
import { useQueryClient } from "@tanstack/react-query";
import { Document } from "@prisma/client";
import { useParams } from "next/navigation";
import { updateDocumentTitle } from "@/actions/update-document-title";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type DocumentIdTitleType = {
  data?: Document;
};

const DocumentIdTitle = ({ data }: DocumentIdTitleType) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [isIconOpened, setIsIconOpened] = useState(false);

  const { execute } = useAction(updateDocumentIcon, {
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
  const { execute: deleteDocumentIconExecute } = useAction(deleteDocumentIcon, {
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
  const debouncedUpdateTitle = useCallback(
    debounce((newTitle: string) => {
      updateTitle({ title: newTitle, documentId: params.documentId as string });
    }, 500),
    [params.documentId]
  );

  const onTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setTitle(newTitle);
    debouncedUpdateTitle(newTitle);
  };

  const onIconChange = (icon: string) => {
    execute({ icon, documentId: data?.id! });
  };
  const onClickRemoveIcon = () => {
    deleteDocumentIconExecute({ documentId: params.documentId as string });
  };

  useEffect(() => {
    setTitle(data?.title || "Untitled");
  }, [data?.title]);

  return (
    <div className="w-full mb-10">
      {data?.icon ? (
        <div className="p-2 w-[70px] h-[70px] mb-10 hover:bg-primary/10 rounded-md relative group mt-32">
          <IconPicker
            asChild
            onOpenChange={(state) => setIsIconOpened(state)}
            isOpen={isIconOpened}
            onChange={onIconChange}
          >
            <Button variant="ghost" className="text-[66px] w-full h-full z-40">
              {data?.icon}
            </Button>
          </IconPicker>
          <Button
            variant="ghost"
            className="absolute top-0 -right-0 group-hover:flex hidden justify-center items-center hover:bg-primary/20 z-50 w-6 h-6"
            onClick={onClickRemoveIcon}
          >
            <X className="w-6 h-6 absolute" />
          </Button>
        </div>
      ) : (
        <Toolbar onChange={onIconChange} />
      )}
      <Textarea
        spellCheck={false}
        value={title}
        onChange={onTitleChange}
        className={cn(
          "px-2 focus-visible:ring-transparent flex-1 border-none text-[36px] resize-none",
          title === "Untitled" && "text-muted-foreground"
        )}
      />
    </div>
  );
};

export default DocumentIdTitle;
