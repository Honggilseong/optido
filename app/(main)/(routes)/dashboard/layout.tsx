import React from "react";
import Navbar from "./_components/navbar";
import DashboardModalProvider from "@/components/provider/dashboard-modal-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] dark:[#1f1f1f] flex">
      <DashboardModalProvider />
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
