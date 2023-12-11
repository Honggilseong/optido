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

const UserProfile = () => {
  const { data } = useSession();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
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
