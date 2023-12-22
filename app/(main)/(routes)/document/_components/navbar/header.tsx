"use client";
import { ChevronsRight, MenuIcon } from "lucide-react";

import React from "react";
import Title from "./title";
import useDocument from "@/hooks/use-document";
import Banner from "./banner";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};
const Header = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const query = useDocument();
  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-2">
        {isCollapsed && (
          <div className="relative h-6 w-6 group hover:bg-primary/20 rounded-md">
            <MenuIcon className="text-muted-foreground absolute inset-0 w-full h-full group-hover:hidden" />
            <ChevronsRight
              role="button"
              onClick={onResetWidth}
              className="text-muted-foreground absolute inset-0 w-full h-full hidden group-hover:block"
            />
          </div>
        )}
        {query.data ? <Title data={query.data} /> : <Title.Skeleton />}
      </nav>
      {query.data?.isArchived && <Banner documentId={query.data.id} />}
    </>
  );
};

export default Header;
