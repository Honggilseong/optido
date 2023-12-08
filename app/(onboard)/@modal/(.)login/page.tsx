"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GoogleLogo from "@/public/google-logo.png";
import Image from "next/image";

const LoginPage = () => {
  const isOpen = useAuthModal((state) => state.isOpen);
  const onClose = useAuthModal((state) => state.onClose);

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const onOpenChange = () => {
    router.back();
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader className="flex items-center flex-col">
          <DialogTitle className="text-2xl md:text-[30px]">Login</DialogTitle>
          <DialogDescription>
            Login and create your own Optido!
          </DialogDescription>
        </DialogHeader>
        <div style={{ marginTop: 30 }} />
        <div className="flex items-center cursor-pointer border py-2 px-4">
          <div
            className="flex items-center justify-center"
            style={{ width: 320 }}
          >
            <Image
              src={GoogleLogo}
              alt="google-logo"
              height={30}
              width={30}
              style={{ marginRight: 10 }}
            />
            <p className="font-bold">Google Login</p>
          </div>
        </div>
        <div style={{ marginTop: 30 }} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
