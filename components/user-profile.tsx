"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

const UserProfile = () => {
  const { data, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="rounded-full w-12 h-12 bg-muted-foreground/20" />
        <Skeleton className="mt-4 w-[40%] h-5 bg-muted-foreground/20" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src={data?.user?.image!} alt="profile-image" />
        </Avatar>
        <p className="truncate text-sm mt-4">{data?.user?.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-3" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
