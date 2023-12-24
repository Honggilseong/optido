"use client";

import UserProfile from "@/components/user-profile";
import DocumentListItem from "./document-list-item";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, Trash } from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { createDocument } from "@/actions/create-document";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DocumentTrash from "./document-trash";
import { useParams, useRouter } from "next/navigation";
import Header from "./header";

const Navbar = () => {
  const params = useParams();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { execute } = useAction(createDocument, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["documents", data.parentDocument ? data.parentDocument : "root"],
        (oldData: Document[]) => [...oldData, data]
      );
      router.push(`/document/${data.id}`);
    },
    onError: (error) => console.log(error),
  });
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const [isResetting, setIsResetting] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
    }
  };
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(false);
      sidebarRef.current.style.width = "240px";
      navbarRef.current.style.setProperty("width", "calc(100%-240px");
      navbarRef.current.style.setProperty("left", "240px");
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(true);
      sidebarRef.current.style.width = "0px";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };
  const handleCreate = () => {
    execute({ title: "Untitled" });
  };

  useEffect(() => {
    const sidebarWidth = window.getComputedStyle(sidebarRef.current!).width;

    setIsCollapsed(isMobile || sidebarWidth === "0px");
  }, [isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[40] rounded-r-md",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="mt-16" />
        <UserProfile />

        <Button className="my-6" onClick={handleCreate}>
          Create
          <Plus className="ml-1 w-5 h-5" />
        </Button>
        <DocumentListItem />

        <Popover>
          <div className="flex items-end">
            <PopoverTrigger className="w-full hover:bg-primary/20">
              <div className="flex items-center px-4 py-3">
                <Trash className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Trash</span>
              </div>
            </PopoverTrigger>
          </div>
          <PopoverContent
            side={isMobile ? "bottom" : "right"}
            className="p-0 w-72"
          >
            <DocumentTrash />
          </PopoverContent>
        </Popover>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[50] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Header isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navbar;
