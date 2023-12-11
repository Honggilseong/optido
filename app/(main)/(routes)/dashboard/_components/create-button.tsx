"use client";
import { Button } from "@/components/ui/button";
import { useCreateModal } from "@/hooks/use-create-modal";
const CreateButton = () => {
  const onOpen = useCreateModal((state) => state.onOpen);
  const handleCreate = () => {
    onOpen();
  };
  return <Button onClick={handleCreate}>Create</Button>;
};

export default CreateButton;
