import React from "react";
import Navbar from "./_components/navbar/navbar";

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <Navbar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default DocumentLayout;
