import React, { ReactNode, createContext, useContext, useState } from "react";
interface PostContextProps {
  title: string;
  summary: string;
  content: string;
  file: File | null;
  setTitle: (title: string) => void;
  setSummary: (summary: string) => void;
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
}
const CreatePostContext = createContext<PostContextProps | undefined>(
  undefined
);
export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
interface PostProviderProps {
  children: ReactNode;
}
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <CreatePostContext.Provider
      value={{
        title,
        summary,
        content,
        file,
        setTitle,
        setSummary,
        setContent,
        setFile,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
