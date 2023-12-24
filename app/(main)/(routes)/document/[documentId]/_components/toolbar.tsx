"use client";
import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";

import { Smile } from "lucide-react";
import { useState } from "react";

type ToolbarType = {
  onChange: (icon: string) => void;
};

const Toolbar = ({ onChange }: ToolbarType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex items-end mb-10 h-48 opacity-0 hover:opacity-100 duration-150 transition">
      <IconPicker
        onOpenChange={(state) => setIsOpen(state)}
        isOpen={isOpen}
        onChange={(icon) => onChange(icon)}
      >
        <Button variant="ghost" size="sm">
          <Smile className="mr-2" />
          <span>Add Emoji</span>
        </Button>
      </IconPicker>
    </div>
  );
};

export default Toolbar;
