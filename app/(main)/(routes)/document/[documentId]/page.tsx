"use client";
import React, { useCallback, useMemo } from "react";
import DocumentIdTitle from "./_components/title";
import useDocument from "@/hooks/use-document";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateDocumentContent } from "@/actions/update-document-content";
import { useQueryClient } from "@tanstack/react-query";
import { Document } from "@prisma/client";

const DocumentIdPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import("./_components/editor"), { ssr: false }),
    []
  );
  const queryClient = useQueryClient();
  const { execute: updateContent } = useAction(updateDocumentContent, {
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
  const params = useParams();
  const query = useDocument();
  const debouncedUpdateTitle = useCallback(
    debounce((content: string) => {
      updateContent({
        content: content,
        documentId: params.documentId as string,
      });
    }, 2000),
    [params.documentId]
  );

  const onEditorChange = (value: string) => {
    debouncedUpdateTitle(value);
  };

  if (query.data === undefined) {
    return (
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1" />
          <div className="mt-32">
            <div className="space-y-4 pl-8 pt-4">
              <Skeleton className="h-[66px] w-[66px] mb-10" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[40%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
          <div className="col-span-1" />
        </div>
      </main>
    );
  }

  return (
    <div className="grid grid-cols-4 h-full pb-40">
      <div className="col-span-1" />
      <div className="col-span-2 relative">
        <DocumentIdTitle data={query.data} />
        <Editor onChange={onEditorChange} initialContent={query.data.content} />
      </div>
      <div className="col-span-1" />
    </div>
  );
};

export default DocumentIdPage;
