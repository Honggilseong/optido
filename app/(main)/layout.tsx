import { QueryProvider } from "@/components/provider/query-provider";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh]">
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
};

export default MainLayout;
