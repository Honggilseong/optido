import React, { ReactNode } from "react";

type OnboardLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const OnboardLayout = ({ children, modal }: OnboardLayoutProps) => {
  return (
    <div className="h-[100dvh] dark:bg-[#1f1f1f]">
      {children}
      {modal}
    </div>
  );
};

export default OnboardLayout;
