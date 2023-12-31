"use client";

import { useSearch } from "@/hooks/use-search";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File, Search } from "lucide-react";

import useSearchQuery from "@/hooks/use-search-query";

import { Input } from "./ui/input";

const SearchCommand = () => {
  const router = useRouter();
  const query = useSearchQuery();
  const [value, setValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/document/${id}`);
    onClose();
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const filteredDocuments = query.data?.filter((document) =>
    document.title.toLowerCase().includes(value.toLowerCase())
  );
  if (!isMounted) return null;
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          onChange={onChange}
          placeholder="Search for documents"
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-transparent border-none"
        />
      </div>
      <CommandList>
        <CommandEmpty>No result found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {filteredDocuments?.map((document) => (
            <CommandItem
              key={document.id}
              value={document.id}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="ml-1 mr-2 w-[18px] h-[18px]" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
