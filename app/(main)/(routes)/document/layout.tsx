import React from "react";
import Navbar from "./_components/navbar/navbar";

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-[100dvh]">
      <Navbar />

      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default DocumentLayout;
