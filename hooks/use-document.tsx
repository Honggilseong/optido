import { fetcher } from "@/lib/fetcher";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useDocument = () => {
  const params = useParams();
  const query = useQuery<Document>({
    queryKey: ["document", params.documentId],
    queryFn: () => fetcher(`/api/documents/document/${params.documentId}`),
  });
  return query;
};

export default useDocument;
