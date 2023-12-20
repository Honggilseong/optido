import { fetcher } from "@/lib/fetcher";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useDocuments = (id: string | null) => {
  const query = useQuery<Document[]>({
    queryKey: id ? ["documents", id] : ["documents", "root"],

    queryFn: () => fetcher(`/api/documents/${id}`),
  });
  console.log(query.data, id);
  return query;
};
