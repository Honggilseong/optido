import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useCreateModal } from "@/hooks/use-create-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BookText, ListTodo } from "lucide-react";

import Link from "next/link";

const CreateModal = () => {
  const isOpen = useCreateModal((state) => state.isOpen);
  const onClose = useCreateModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="flex items-center flex-col">
        <DialogHeader className="flex flex-col items-center mb-10">
          <DialogTitle className="text-xl md:text-2xl font-bold">
            Create your Optido!
          </DialogTitle>
          <DialogDescription className="text-center">
            Boost efficiency by creating a document or todo list for your tasks
            and ideas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 h-52 w-full gap-x-6">
          <Link
            href="/document"
            className="hover:bg-black rounded-md border cursor-pointer flex items-center justify-center flex-col"
          >
            <BookText className="w-20 h-20" />
            <p className="font-bold text-xl mt-4">Create a document</p>
          </Link>
          <Link
            href="/todo"
            className="hover:bg-black rounded-md border cursor-pointer flex items-center justify-center flex-col"
          >
            <ListTodo className="w-20 h-20" />
            <p className="font-bold text-xl mt-4">Create a Todo list</p>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
