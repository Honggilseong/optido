"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

const Logo = ({ width = 100, height = 60, className }: LogoProps) => {
  const { status } = useSession();

  const router = useRouter();
  return (
    <div
      className={cn("flex items-center gap-x-2 cursor-pointer", className)}
      role="button"
      onClick={() =>
        status === "authenticated"
          ? router.push("/dashboard")
          : router.push("/")
      }
    >
      <Image src="/logo.png" height={height} width={width} alt="logo" />
    </div>
  );
};

export default Logo;
