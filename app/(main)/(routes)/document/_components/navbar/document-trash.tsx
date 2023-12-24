"use client";
import { deleteDocument } from "@/actions/delete-document";
import { undoDocument } from "@/actions/undo-document";
import ConfirmModal from "@/components/confirm-modal";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import useTrash from "@/hooks/use-trash";
import { Document } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const DocumentTrash = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const { execute: undoDocumentExecute } = useAction(undoDocument, {
    onSuccess: (data) => {
      const dataIdsSet = new Set(data);
      queryClient.setQueryData(["trash"], (oldData: Document[]) =>
        oldData.filter((document) => !dataIdsSet.has(document.id))
      );
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
  const { execute: deleteDocumentExecute } = useAction(deleteDocument, {
    onSuccess: (data) => {
      queryClient.setQueryData(["trash"], (oldData: Document[]) =>
        oldData.filter((document) => document.id !== data.id)
      );
    },
  });

  const query = useTrash();
  const filteredDocuments = query.data?.filter((document) =>
    document.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onClick = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    undoDocumentExecute({ documentId });
  };
  const onRemove = (documentId: string) => {
    deleteDocumentExecute({ documentId });
  };
  return (
    <div className="text-sm max-h-80 overflow-y-auto">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Search for Documents in the Trash"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        {query.data ? (
          filteredDocuments?.map((document) => (
            <div
              key={document.id}
              role="button"
              onClick={() => onClick(document.id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className="truncate pl-2">{document.title}</span>
              <div className="flex items-center">
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={(e) => onRestore(e, document.id)}
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(document.id)}>
                  <div
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    role="button"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-center text-muted-foreground pb-2">
            No Documents found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentTrash;
