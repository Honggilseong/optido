"use client";
import CreateModal from "@/app/(main)/(routes)/dashboard/_components/create-modal";
import { useEffect, useState } from "react";

const DashboardModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CreateModal />
    </>
  );
};

export default DashboardModalProvider;
