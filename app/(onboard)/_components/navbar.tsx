"use client";
import Logo from "@/components/logo";

import { useAuthModal } from "@/hooks/use-auth-modal";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const scrolled = useScrollTop();

  const router = useRouter();

  const onOpen = useAuthModal((state) => state.onOpen);

  const handleLogin = () => {
    onOpen();
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-5",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto flex md:justify-end items-center gap-x-2 w-full">
        <Button variant="outline" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
