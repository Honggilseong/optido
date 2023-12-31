import { useSearch } from "@/hooks/use-search";
import { Search } from "lucide-react";

const SearchItem = () => {
  const onOpen = useSearch((state) => state.onOpen);
  return (
    <div
      className="flex items-end cursor-pointer"
      role="button"
      onClick={onOpen}
    >
      <div className="w-full hover:bg-primary/20">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <Search className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Search</span>
          </div>
          <span className="text-muted-foreground text-xs">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
