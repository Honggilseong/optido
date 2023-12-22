import { fetcher } from "@/lib/fetcher";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useTrash = () => {
  const query = useQuery<Document[]>({
    queryKey: ["trash"],
    queryFn: () => fetcher("/api/documents/trash"),
  });
  return query;
};

export default useTrash;
