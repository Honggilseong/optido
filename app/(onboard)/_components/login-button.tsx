"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { Spinner } from "@/components/spinner";
const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const onOpen = useAuthModal((state) => state.onOpen);

  const handleLogin = () => {
    onOpen();
    router.push("/login");
  };
  const handleLogout = () => {
    signOut();
  };

  if (status === "loading") {
    return (
      <div className="w-10 flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  return status === "authenticated" ? (
    <Button onClick={handleLogout}>Logout</Button>
  ) : (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default LoginButton;
