"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  lightDefaultTheme,
  useBlockNote,
  Theme,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEdgeStore } from "@/lib/edgestore";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string | null;
  editable?: boolean;
  ref?: React.MutableRefObject<null>;
};

const Editor = ({ onChange, initialContent, editable, ref }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  const darkTheme = {
    ...darkDefaultTheme,
    colors: {
      ...darkDefaultTheme.colors,
      editor: {
        text: "#fff",
        background: "#0a0a0a",
      },
    },
  } satisfies Theme;

  const theme = {
    dark: darkTheme,
    light: lightDefaultTheme,
  };

  return (
    <>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? theme.dark : theme.light}
      />
    </>
  );
};

export default Editor;
