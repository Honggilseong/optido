import React, { Suspense } from "react";
import Navbar from "./[documentId]/_components/navbar/navbar";

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-[100dvh]">
      <Suspense>
        <Navbar />
      </Suspense>
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default DocumentLayout;
