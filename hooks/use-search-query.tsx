import { fetcher } from "@/lib/fetcher";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useSearchQuery = () => {
  const query = useQuery<Document[]>({
    queryKey: ["search"],
    queryFn: () => fetcher("/api/documents/search"),
  });
  return query;
};

export default useSearchQuery;
