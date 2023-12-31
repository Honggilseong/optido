import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type SettingItemProps = {
  isMobile: boolean;
};

const SettingItem = ({ isMobile }: SettingItemProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);
  return (
    <Popover open={isOpen} onOpenChange={(status) => setIsOpen(status)}>
      <PopoverTrigger>
        <div className="flex items-end cursor-pointer" role="button">
          <div className="w-full hover:bg-primary/20">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center">
                <Settings className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Settings</span>
              </div>
              <span className="text-muted-foreground text-xs">Ctrl + S</span>
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent side={isMobile ? "bottom" : "right"}>
        <div className="flex items-center">
          <Settings className="mr-2" />
          <h3 className="font-bold">Settings</h3>
          <PopoverClose className="h-6 w-6" />
        </div>
        <div className="w-full border-b border-muted-foreground my-3" />
        {resolvedTheme === "dark" ? (
          <Button
            className="flex justify-start items-center w-full"
            variant="outline"
            onClick={() => setTheme("light")}
          >
            <Sun className="w-5 h-5 mr-3" />
            Light mode
          </Button>
        ) : (
          <Button
            className="flex justify-start items-center w-full"
            variant="outline"
            onClick={() => setTheme("dark")}
          >
            <Moon className="w-5 h-5 mr-3" />
            Dark mode
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SettingItem;
