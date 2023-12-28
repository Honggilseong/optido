import React from "react";
import Navbar from "./_components/navbar/navbar";
import SearchCommand from "@/components/search-command";

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <Navbar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default DocumentLayout;
