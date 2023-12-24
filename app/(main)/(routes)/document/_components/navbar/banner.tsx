"use client";

import { deleteDocument } from "@/actions/delete-document";
import { undoDocument } from "@/actions/undo-document";
import ConfirmModal from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

interface BannerProps {
  documentId: string;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { execute: deleteDocumentExecute } = useAction(deleteDocument, {
    onSuccess: () => toast.success("note deleted!"),
    onError: () => toast.error("Failed to delete document."),
  });

  const { execute: undoExecute } = useAction(undoDocument, {
    onSuccess: () => {
      toast.success("Undo the document");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: () => toast.error("Failed to restore document."),
  });
  const onRemove = () => {
    deleteDocumentExecute({ documentId });

    router.push("/document");
  };
  const onRestore = () => {
    undoExecute({ documentId });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the trash</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
