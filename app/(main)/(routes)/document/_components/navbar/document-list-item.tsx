"use client";
import DocumentItem from "./document-item";
import { FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDocuments } from "@/hooks/use-documents";

type DocumentListItem = {
  parentDocumentId?: string;
  depth?: number;
};

const DocumentListItem = ({
  parentDocumentId,
  depth = 0,
}: DocumentListItem) => {
  const params = useParams();
  const router = useRouter();

  const query = useDocuments(parentDocumentId ? parentDocumentId : "root");

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [documentId]: !prevState[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  if (query.isLoading)
    return (
      <div className="h-full">
        <DocumentItem.Skeleton />
      </div>
    );

  return (
    <>
      {query.data?.length !== 0 ? (
        <div className="h-full overflow-y-auto">
          {query.data?.map((document) => (
            <div key={document.id}>
              <DocumentItem
                id={document.id}
                onClick={() => onRedirect(document.id)}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon || ""}
                active={params.documentId === document.id}
                depth={depth}
                onExpand={() => onExpand(document.id)}
                expanded={expanded[document.id]}
              />
              {expanded[document.id] && (
                <DocumentListItem
                  parentDocumentId={document.id}
                  depth={depth + 1}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{ paddingLeft: depth ? `${depth * 12 + 25}px` : undefined }}
          className={cn(
            "text-sm font-medium text-muted-foreground",
            depth === 0 && "hidden"
          )}
        >
          No pages
        </p>
      )}
    </>
  );
};

export default DocumentListItem;
