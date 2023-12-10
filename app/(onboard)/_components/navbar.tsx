"use client";
import Logo from "@/components/logo";

import { useScrollTop } from "@/hooks/use-scroll-top";

import { ThemeToggle } from "@/components/theme-button";

import { cn } from "@/lib/utils";
import LoginButton from "./login-button";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-5",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto flex md:justify-end items-center gap-x-2 w-full">
        <LoginButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
